"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import Image from "next/image";

export default function LatestForumPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
      const res = await axiosInstance.get("/api/forum/latest");
      setPosts(res.data.posts);
    };

    loadPosts();
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <h2 className="mb-8 text-center text-4xl font-bold">
        Latest Forum Posts
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {posts.map((post) => (
          <div
            key={post._id}
            className="card bg-base-200 shadow-lg"
          >
            <div className="card-body">
                              <Image src={post.image} alt="img" width={200} height={200} />
              <h3 className="card-title">
                {post.title}
              </h3>

              <p className="line-clamp-3">
                {post.content}
              </p>

              <div className="mt-4 text-sm opacity-70">
                {post.author}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}