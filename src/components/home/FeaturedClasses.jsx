"use client";

import { useEffect, useState } from "react";
import { getClasses } from "@/services/home.service";
import Link from "next/link";

export default function FeaturedClasses() {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const loadClasses = async () => {
      try {
        const data = await getClasses();
        setClasses(data.slice(0, 6));
      } catch (error) {
        console.error(error);
      }
    };

    loadClasses();
  }, []);

  return (
    <section className="py-7">
      <h2 className="mb-10 text-center text-4xl font-bold">
        Featured Classes
      </h2>

      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
        {classes.map((item) => (
          <div key={item._id} className="card bg-base-100 shadow-xl">
            <figure>
              <img
                src={item.image}
                alt={item.title}
                className="h-52 w-full object-cover"
              />
            </figure>

            <div className="card-body">
              <h2 className="card-title">{item.title}</h2>

              <p>{item.description}</p>

              <button className="btn btn-primary btn-sm">
                <Link href={`/classes/${item._id}`}>Details</Link>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}