"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";

export default function ManageUsersPage() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await axiosInstance.get("/api/users");
    setUsers(res.data.users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const makeTrainer = async (id) => {
    await axiosInstance.patch(`/api/users/${id}/role`, {
      role: "trainer",
    });

    toast.success("User promoted to trainer.");
    fetchUsers();
  };

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Manage Users</h1>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>

              <td>
                {user.role === "user" && (
                  <button
                    onClick={() => makeTrainer(user._id)}
                    className="btn btn-primary btn-xs"
                  >
                    Make Trainer
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}