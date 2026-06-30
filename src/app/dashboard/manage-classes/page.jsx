"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";

export default function ManageClassesPage() {
  const [classes, setClasses] = useState([]);

  const loadClasses = async () => {
    const res = await axiosInstance.get("/api/classes");
    setClasses(res.data.classes);
  };

  useEffect(() => {
    loadClasses();
  }, []);

  const removeClass = async (id) => {
    await axiosInstance.delete(`/api/classes/${id}`);

    toast.success("Class deleted");

    loadClasses();
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Manage Classes
      </h1>

      <table className="table">
        <thead>
          <tr>
            <th>Class</th>
            <th>Trainer</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {classes.map((item) => (
            <tr key={item._id}>
              <td>{item.title}</td>
              <td>{item.trainer}</td>

              <td>
                <button
                  className="btn btn-error btn-xs"
                  onClick={() => removeClass(item._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}