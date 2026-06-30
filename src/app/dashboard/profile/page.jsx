"use client";

import { useAuth } from "@/providers/AuthProvider";

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="max-w-xl space-y-4">
      <h1 className="text-3xl font-bold">
        My Profile
      </h1>

      <img
        src={user.image || "https://i.pravatar.cc/200"}
        alt={user.name}
        className="h-36 w-36 rounded-full"
      />

      <p>
        <strong>Name:</strong> {user.name}
      </p>

      <p>
        <strong>Email:</strong> {user.email}
      </p>

      <p>
        <strong>Role:</strong> {user.role}
      </p>
    </div>
  );
}