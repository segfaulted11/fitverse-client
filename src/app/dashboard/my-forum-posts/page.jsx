"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { useAuth } from "@/providers/AuthProvider";
import { toast } from "sonner";
import Image from "next/image";

export default function MyForumPostsPage() {
  const { user } = useAuth();
// console.log("Logged in user:", user);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPosts = async () => {
    try {
      const res = await axiosInstance.get("/api/forum");
// console.log("All posts:", res.data.posts);
      const myPosts = res.data.posts.filter(
        (post) => post.author === user?.email
      );
// console.log("Filtered posts:", myPosts);
      setPosts(myPosts);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadPosts();
    }
  }, [user]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this forum post?"
    );

    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/api/forum/${id}`);

      toast.success("Post deleted.");

      loadPosts();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete post."
      );
    }
  };

  if (loading) {
    return (
      <div className="py-10 text-center">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        My Forum Posts
      </h1>

      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <div className="grid gap-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="card bg-base-200 shadow"
            >
              <div className="card-body">
                <Image src={post.image} alt="img" width={200} height={200} />
                <h2 className="card-title">
                  {post.title}
                </h2>

                <p>
                  {post.content ||
                    post.description}
                </p>

                <div className="card-actions justify-end">
                  <button
                    className="btn btn-error btn-sm"
                    onClick={() =>
                      handleDelete(post._id)
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}