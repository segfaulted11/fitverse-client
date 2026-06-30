"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import StripeProvider from "@/components/StripeProvider";
import CheckoutForm from "@/components/CheckoutForm";
import PrivateRoute from "@/components/PrivateRoute";
export default function PaymentPage() {
  const { id } = useParams();

  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadClass = async () => {
      try {
        const res = await axiosInstance.get("/api/classes");

        const found = res.data.classes.find((item) => item._id === id);

        setClassData(found);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadClass();
  }, [id]);

  if (loading) {
    return <div className="py-20 text-center">Loading...</div>;
  }

  return (
    <PrivateRoute>
    <div className="mx-auto max-w-2xl px-6 py-12">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-3xl">Payment</h2>

          <div className="divider"></div>

          <p>
            <strong>Class:</strong> {classData.title}
          </p>

          <p>
            <strong>Trainer:</strong> {classData.trainer}
          </p>

          <p>
            <strong>Duration:</strong> {classData.duration}
          </p>

          <p>
            <strong>Category:</strong> {classData.category}
          </p>
          <p className="text-xl font-bold">Price: ${classData.price}</p>

          <StripeProvider>
            <CheckoutForm classData={classData} />
          </StripeProvider>
        </div>
      </div>
    </div>
    </PrivateRoute>
  );
}
