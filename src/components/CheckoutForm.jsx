"use client";

import { useEffect, useState } from "react";
import {
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";

export default function CheckoutForm({ classData }) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!classData?.price) return;

    const createPaymentIntent = async () => {
      try {
        console.log(classData);
console.log(classData.price);
        const res = await axiosInstance.post(
          "/api/payments/create-payment-intent",
          {
            price: classData.price,
          }
        );

        setClientSecret(res.data.clientSecret);
      } catch (error) {
        console.error(error);
        toast.error("Couldn't initialize payment.");
      }
    };

    createPaymentIntent();
  }, [classData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);

    if (!card) return;

    setProcessing(true);

    const { error: paymentMethodError } =
      await stripe.createPaymentMethod({
        type: "card",
        card,
      });

    if (paymentMethodError) {
      toast.error(paymentMethodError.message);
      setProcessing(false);
      return;
    }

    const { paymentIntent, error } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
        },
      });

    if (error) {
      toast.error(error.message);
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      try {
        await axiosInstance.post("/api/bookings", {
          classId: classData._id,
          className: classData.title,
          trainer: classData.trainer,
          price: classData.price,
          paymentIntentId: paymentIntent.id,
paidAt: new Date(),
paymentStatus: "paid",
        });

        toast.success("Payment Successful!");

        router.push("/dashboard/my-bookings");
      } catch (err) {
        console.error(err);
        toast.error("Booking failed.");
      }
    }

    setProcessing(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 space-y-6"
    >
      <div className="rounded-lg border p-4">
        <CardElement
          options={{
            hidePostalCode: true,
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
            },
          }}
        />
      </div>

      <button
        type="submit"
        disabled={
          !stripe ||
          !clientSecret ||
          processing
        }
        className="btn btn-primary w-full"
      >
        {processing
          ? "Processing..."
          : `Pay $${classData.price}`}
      </button>
    </form>
  );
}