"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";

export default function FavoriteClassesPage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadFavorites = async () => {
    try {
      const [favoriteRes, classRes] = await Promise.all([
        axiosInstance.get("/api/favorites"),
        axiosInstance.get("/api/classes"),
      ]);

      const favoriteIds = favoriteRes.data.favorites.map(
        (fav) => fav.classId
      );

      const favoriteClasses = classRes.data.classes.filter(
        (item) => favoriteIds.includes(item._id)
      );

      setFavorites(favoriteClasses);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load favorites.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const handleRemove = async (classId) => {
    try {
      await axiosInstance.delete(`/api/favorites/${classId}`);

      setFavorites((prev) =>
        prev.filter((item) => item._id !== classId)
      );

      toast.success("Removed from favorites.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove favorite.");
    }
  };

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
        Favorite Classes
      </h1>

      {favorites.length === 0 ? (
        <p>No favorite classes yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {favorites.map((item) => (
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
                  <strong>Trainer:</strong>{" "}
                  {item.trainer}
                </p>

                <div className="card-actions justify-between mt-4">
                  <Link
                    href={`/classes/${item._id}`}
                    className="btn btn-primary"
                  >
                    View Details
                  </Link>

                  <button
                    onClick={() =>
                      handleRemove(item._id)
                    }
                    className="btn btn-error"
                  >
                    Remove
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