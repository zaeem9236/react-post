import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, InputField, RTE, Select } from "../index";
import { dbService } from "../../appwrite/db";
import { useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues, formState: {errors} } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });


    const navigate = useNavigate();
    const userData = useSelector((state) => state.authSlice.userData);

    const submit = async (data) => {

        if (post) {
            const file = data.image[0] ? await dbService.uploadFile(data.image[0]) : null;

            if (file) {
                dbService.deleteFile(post.featuredImage);
            }

            const dbPost = await dbService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = data.image[0] ? await dbService.uploadFile(data.image[0]) : null;

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await dbService.createPost({ ...data, userId: userData.$id });
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex sm: justify-center flex-wrap">
            <div className="w-10/12 lg:w-2/5 px-2">
                <InputField
                    label="Title :"
                    placeholder="Title"
                    {...register("title", { 
                        required: { value: true, message: 'Invalid Title' },
                        minLength: { value: 5, message: 'Title must be at least 5 characters long' },
                        maxLength: { value: 50, message: 'Title cannot exceed 50 characters' },
                     })}
                    className="mb-4"
                />
                {errors?.title?.message && <p className="text-red-600 pb-1 text-center">{errors.title.message}</p>}

                <InputField
                    label="Slug :"
                    placeholder="Slug"
                    {...register("slug", { 
                        required: { value: true, message: 'Invalid Slug' },
                        minLength: { value: 5, message: 'Slug must be at least 5 characters long' },
                        maxLength: { value: 50, message: 'Slug cannot exceed 50 characters' },
                     })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                    className="mb-4"
                />
                {errors?.slug?.message && <p className="text-red-600 pb-1 text-center">{errors.slug.message}</p>}

            </div>
            <div className="w-10/12 lg:w-2/5 px-2">
                <InputField
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { 
                        required: { value: !post,  message: 'No Image Uploaded' } })}
                />
                {errors?.image?.message && <p className="text-red-600 pb-1 text-center">{errors.image.message}</p>}
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={dbService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4 dark:bg-gray-700  text-white border-gray-600"
                    {...register("status", { required: true })}
                />
                <Button
                    // onClick={submit}
                    type="submit"
                    btnText={post ? "Update" : "Submit"}
                    bgColor={post ? "bg-green-500" : undefined}
                    className="w-full">

                </Button>

            </div>
            <div className="p-8">
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
        </form>
    );
}