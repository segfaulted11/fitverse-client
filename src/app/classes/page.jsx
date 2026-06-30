"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axiosInstance from "@/lib/axios";

export default function ClassesPage() {
  const [classes, setClasses] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  useEffect(() => {
    const loadClasses = async () => {
      const res = await axiosInstance.get("/api/classes");
      setClasses(res.data.classes);
    };

    loadClasses();
  }, []);

  const filteredClasses = classes.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(search.toLowerCase());

const matchesCategory =
  category === "All" ||
  item.category?.toLowerCase() === category.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="mb-8 text-4xl font-bold">
        All Classes
      </h1>

      {/* Search + Filter */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row">
        <input
          type="text"
          placeholder="Search classes..."
          className="input input-bordered w-full md:w-80"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="select select-bordered w-full md:w-60"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>All</option>
          <option>Yoga</option>
          <option>Hiit</option>
          <option>Strength Training</option>
          <option>Pilates</option>
          <option>CrossFit</option>
        </select>
        </div>

      {/* Classes */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredClasses.map((item) => (
          <div
            key={item._id}
            className="card bg-base-100 shadow-lg"
          >
            <figure>
              <img
                src={item.image}
                alt={item.title}
                className="h-56 w-full object-cover"
              />
            </figure>

            <div className="card-body">
              <h2 className="card-title">
                {item.title}
              </h2>

              <p>{item.description}</p>

              <p>
                <strong>Category:</strong> {item.category}
              </p>

              <p>
                <strong>Trainer:</strong> {item.trainer}
              </p>

              <div className="card-actions justify-end">
                <Link
                  href={`/classes/${item._id}`}
                  className="btn btn-primary"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredClasses.length === 0 && (
        <div className="mt-10 text-center text-lg text-gray-500">
          No classes found.
        </div>
      )}
    </div>
  );
}