"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";

import { useAuth } from "@/providers/AuthProvider";
import PrivateRoute from "@/components/PrivateRoute";

export default function ClassDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const { user, loading: authLoading } = useAuth();

  const [classData, setClassData] = useState(null);
  const [booked, setBooked] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading || !user) return;

    const loadData = async () => {
      try {
        const classRes = await axiosInstance.get("/api/classes");

        const found = classRes.data.classes.find(
          (item) => item._id === id
        );

        if (!found) {
          setLoading(false);
          return;
        }

        setClassData(found);

        const [bookingRes, favoriteRes] = await Promise.all([
          axiosInstance.get(`/api/bookings/check/${id}`),
          axiosInstance.get(`/api/favorites/${id}`),
        ]);

        setBooked(bookingRes.data.booked);
        setFavorite(favoriteRes.data.isFavorite);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id, user, authLoading]);

  const handleFavorite = async () => {
    try {
      if (favorite) {
        await axiosInstance.delete(`/api/favorites/${id}`);
        toast.success("Removed from favorites.");
        setFavorite(false);
      } else {
        await axiosInstance.post("/api/favorites", {
          classId: id,
        });

        toast.success("Added to favorites.");
        setFavorite(true);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    }
  };

  if (authLoading) {
    return (
      <div className="py-20 text-center">
        Loading...
      </div>
    );
  }

  return (
    <PrivateRoute>
      {loading ? (
        <div className="py-20 text-center">
          Loading...
        </div>
      ) : !classData ? (
        <div className="py-20 text-center">
          Class not found.
        </div>
      ) : (
        <div className="mx-auto max-w-5xl px-6 py-10">
          <img
            src={classData.image}
            alt={classData.title}
            className="mb-8 h-96 w-full rounded-xl object-cover"
          />

          <h1 className="mb-4 text-4xl font-bold">
            {classData.title}
          </h1>

          <div className="mb-6 space-y-2">
            <p>
              <strong>Trainer:</strong> {classData.trainer}
            </p>

            <p>
              <strong>Category:</strong> {classData.category}
            </p>

            <p>
              <strong>Duration:</strong> {classData.duration}
            </p>

            {classData.schedule && (
              <p>
                <strong>Schedule:</strong> {classData.schedule}
              </p>
            )}

            {classData.difficulty && (
              <p>
                <strong>Difficulty:</strong>{" "}
                {classData.difficulty}
              </p>
            )}

            <p className="text-xl font-bold">
              Price: ${classData.price}
            </p>
          </div>

          <p className="mb-8 leading-8">
            {classData.description}
          </p>

          <div className="flex gap-4">
            <button
              className="btn btn-primary"
              disabled={booked}
              onClick={() =>
                router.push(`/payment/${classData._id}`)
              }
            >
              {booked ? "Already Booked" : "Book Now"}
            </button>

            <button
              className={`btn ${
                favorite ? "btn-error" : "btn-outline"
              }`}
              onClick={handleFavorite}
            >
              {favorite
                ? "Remove Favorite"
                : "Add to Favorites"}
            </button>
          </div>
        </div>
      )}
    </PrivateRoute>
  );
}