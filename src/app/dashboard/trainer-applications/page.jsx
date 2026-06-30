"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";

export default function TrainerApplicationsPage() {
  const [applications, setApplications] = useState([]);

  const loadApplications = async () => {
    const res = await axiosInstance.get("/api/trainers/applications");
    setApplications(res.data.applications);
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const approve = async (id) => {
    await axiosInstance.patch(`/api/trainers/applications/${id}/approve`);
    toast.success("Trainer approved");
    loadApplications();
  };

  const reject = async (id) => {
    await axiosInstance.patch(`/api/trainers/applications/${id}/reject`);
    toast.success("Application rejected");
    loadApplications();
  };

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        Trainer Applications
      </h1>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Specialization</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {applications.map((app) => (
            <tr key={app._id}>
              <td>{app.name}</td>
              <td>{app.email}</td>
              <td>{app.specialization}</td>
              <td>{app.status}</td>

              <td className="space-x-2">
                {app.status === "pending" && (
                  <>
                    <button
                      onClick={() => approve(app._id)}
                      className="btn btn-success btn-xs"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => reject(app._id)}
                      className="btn btn-error btn-xs"
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}