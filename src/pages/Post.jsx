import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { authService } from "../appwrite/auth";
import { dbService } from "../appwrite/db";
import { Button } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { login as authSlice } from "../redux/slices/authSlice";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.authSlice.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            dbService.getPost(slug).then((post) => {
                if (post) setPost(post);
                /*else navigate("/");*/
            });
         } /*else navigate("/");*/
    }, [slug, navigate]);

    const deletePost = () => {
        dbService.deletePost(post.$id).then((status) => {
            if (status) {
                dbService.deleteFile(post.featuredImage);
                navigate("/all-posts");
            }
        });
    };

    return post ? (
        <div className="py-8 h-2/4">
                <div className=" h-full w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={dbService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button 
                                btnText='Edit'
                                bgColor="bg-green-500"
                                className="mr-3" />
                            </Link>
                            <Button 
                             btnText='Delete'
                            bgColor="bg-red-500"
                            onClick={deletePost} />
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold pl-5">{post.title}</h1>
                </div>
                <div className="browser-css px-20">
                    {parse(post.content)}
                </div>
        </div>
    ) : null;
}