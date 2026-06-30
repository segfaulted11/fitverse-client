"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { useAuth } from "@/providers/AuthProvider";

export default function DashboardPage() {
  const { user } = useAuth();

  const [stats, setStats] = useState({
    bookings: 0,
    favorites: 0,
    users: 0,
    classes: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        // USER
        if (user?.role === "user") {
          const [bookingRes, favoriteRes] = await Promise.all([
            axiosInstance.get("/api/bookings/my"),
            axiosInstance.get("/api/favorites"),
          ]);

          setStats({
            bookings: bookingRes.data.bookings.length,
            favorites: favoriteRes.data.favorites.length,
          });
        }

        // ADMIN
        else if (user?.role === "admin") {
          const [userRes, classRes, bookingRes] =
            await Promise.all([
              axiosInstance.get("/api/users"),
              axiosInstance.get("/api/classes"),
              axiosInstance.get("/api/bookings"),
            ]);

          setStats({
            users: userRes.data.users.length,
            classes: classRes.data.classes.length,
            bookings: bookingRes.data.bookings.length,
          });
        }

        // TRAINER
        else if (user?.role === "trainer") {
          const classRes = await axiosInstance.get(
            "/api/classes"
          );

          const myClasses = classRes.data.classes.filter(
            (item) => item.trainer === user.name
          );

          const totalStudents = myClasses.reduce(
            (sum, item) => sum + (item.bookingCount || 0),
            0
          );

          setStats({
            classes: myClasses.length,
            bookings: totalStudents,
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (user) {
      loadStats();
    }
  }, [user]);

  if (!user) return null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">
          Welcome, {user.name} 👋
        </h1>

        <p className="text-gray-500">
          Here's your dashboard overview.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-6 md:grid-cols-3">
        {user.role === "user" && (
          <>
            <div className="card bg-primary text-primary-content shadow-xl">
              <div className="card-body">
                <h2 className="text-xl font-semibold">
                  Total Bookings
                </h2>

                <p className="text-5xl font-bold">
                  {stats.bookings}
                </p>
              </div>
            </div>

            <div className="card bg-secondary text-secondary-content shadow-xl">
              <div className="card-body">
                <h2 className="text-xl font-semibold">
                  Favorites
                </h2>

                <p className="text-5xl font-bold">
                  {stats.favorites}
                </p>
              </div>
            </div>
          </>
        )}

        {user.role === "trainer" && (
          <>
            <div className="card bg-primary text-primary-content shadow-xl">
              <div className="card-body">
                <h2 className="text-xl font-semibold">
                  My Classes
                </h2>

                <p className="text-5xl font-bold">
                  {stats.classes}
                </p>
              </div>
            </div>

            <div className="card bg-secondary text-secondary-content shadow-xl">
              <div className="card-body">
                <h2 className="text-xl font-semibold">
                  Students
                </h2>

                <p className="text-5xl font-bold">
                  {stats.bookings}
                </p>
              </div>
            </div>
          </>
        )}

        {user.role === "admin" && (
          <>
            <div className="card bg-primary text-primary-content shadow-xl">
              <div className="card-body">
                <h2 className="text-xl font-semibold">
                  Users
                </h2>

                <p className="text-5xl font-bold">
                  {stats.users}
                </p>
              </div>
            </div>

            <div className="card bg-secondary text-secondary-content shadow-xl">
              <div className="card-body">
                <h2 className="text-xl font-semibold">
                  Classes
                </h2>

                <p className="text-5xl font-bold">
                  {stats.classes}
                </p>
              </div>
            </div>

            <div className="card bg-accent text-accent-content shadow-xl">
              <div className="card-body">
                <h2 className="text-xl font-semibold">
                  Bookings
                </h2>

                <p className="text-5xl font-bold">
                  {stats.bookings}
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Profile */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex items-center gap-6">
            <img
              src={
                user.image ||
                "https://i.pravatar.cc/150"
              }
              alt={user.name}
              className="h-24 w-24 rounded-full object-cover"
            />

            <div className="space-y-2">
              <h2 className="text-2xl font-bold">
                {user.name}
              </h2>

              <p>{user.email}</p>

              <div className="badge badge-primary badge-lg capitalize">
                {user.role}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}