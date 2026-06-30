"use client";

import { useEffect, useState } from "react";
import { getTrainers } from "@/services/home.service";

export default function FeaturedTrainers() {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    const loadTrainers = async () => {
      try {
        const data = await getTrainers();
        setTrainers(data.slice(0, 3));
      } catch (error) {
        console.error(error);
      }
    };

    loadTrainers();
  }, []);

  return (
    <section className="bg-base-200 py-20">
      <h2 className="mb-10 text-center text-4xl font-bold">
        Featured Trainers
      </h2>

      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
        {trainers.map((trainer) => (
          <div key={trainer._id} className="card bg-base-100 shadow">
            <figure>
              <img
                src={trainer.image}
                alt={trainer.name}
                className="h-56 w-full object-cover"
              />
            </figure>

            <div className="card-body">
              <h2 className="card-title">{trainer.name}</h2>

              <p>{trainer.specialization}</p>

              <p>{trainer.experience}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}