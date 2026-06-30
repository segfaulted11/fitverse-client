"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";

export default function TrainersPage() {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    const load = async () => {
      const res = await axiosInstance.get("/api/trainers");
      setTrainers(res.data.trainers);
    };

    load();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="mb-8 text-4xl font-bold">
        Our Trainers
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {trainers.map((trainer) => (
          <div
            key={trainer._id}
            className="card bg-base-100 shadow-lg"
          >
            <figure>
              <img
                src={trainer.image}
                alt={trainer.name}
                className="h-64 w-full object-cover"
              />
            </figure>

            <div className="card-body">
              <h2 className="card-title">
                {trainer.name}
              </h2>

              <p>{trainer.email}</p>

              <span className="badge badge-success">
                Trainer
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}