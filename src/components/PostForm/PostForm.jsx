import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, InputField, RTE, Select } from "../index";
import { DbService } from "../../appwrite/db";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "from the beginning",
            slug: post?.$id || "from-the-beginning",
            content: post?.content || "hello world",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.authSlice.userData);

    const submit = async (data) => {
        console.log('data...', data)
        if (post) {
            const file = data.image[0] ? await DbService.uploadFile(data.image[0]) : null;

            if (file) {
                // DbService.deleteFile(post.featuredImage);
            }

            // const dbPost = await DbService.updatePost(post.$id, {
            //     ...data,
            //     featuredImage: file ? file.$id : undefined,
            // });

            // if (dbPost) {
            //     navigate(`/post/${dbPost.$id}`);
            // }
        } else {
            const file = await DbService.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await DbService.createPost({ ...data, userId: userData.$id });

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
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <InputField
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <InputField
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <InputField
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button
                    // onClick={submit}
                    btnText={post ? "Update" : "Submit"}
                    // type="submit"
                    bgColor={post ? "bg-green-500" : undefined}
                    className="w-full">

                </Button>
            </div>
        </form>
    );
}