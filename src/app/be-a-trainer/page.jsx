"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import axiosInstance from "@/lib/axios";

export default function BeATrainerPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axiosInstance.post("/api/trainers/apply", data);

      toast.success(res.data.message);
      reset();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-base-200 p-6">
      <div className="card w-full max-w-2xl bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="text-center text-3xl font-bold">
            Become a Trainer
          </h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <input
              {...register("name")}
              className="input input-bordered w-full"
              placeholder="Your Name"
            />

            <input
              type="number"
              {...register("age")}
              className="input input-bordered w-full"
              placeholder="Age"
            />

            <input
              {...register("experience")}
              className="input input-bordered w-full"
              placeholder="Experience"
            />

            <input
              {...register("specialization")}
              className="input input-bordered w-full"
              placeholder="Specialization"
            />

            <textarea
              {...register("bio")}
              className="textarea textarea-bordered w-full"
              placeholder="Tell us about yourself"
            />

            <button
              className="btn btn-primary w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}