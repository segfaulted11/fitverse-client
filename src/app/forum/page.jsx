"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axiosInstance from "@/lib/axios";

export default function ForumPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const res = await axiosInstance.get("/api/forum");
        setPosts(res.data.posts);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="mb-8 text-4xl font-bold">
        Community Forum
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div
            key={post._id}
            className="card bg-base-100 shadow-lg"
          >
            <figure>
              <img
                src={post.image}
                alt={post.title}
                className="h-56 w-full object-cover"
              />
            </figure>

            <div className="card-body">
              <h2 className="card-title">
                {post.title}
              </h2>

              <p className="text-sm text-gray-500">
                By {post.author}
              </p>

              <p>
{post.content?.length > 120
  ? post.content.slice(0, 120) + "..."
  : post.content}
              </p>

              <div className="card-actions justify-end mt-4">
                <Link
                  href={`/forum/${post._id}`}
                  className="btn btn-primary"
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}