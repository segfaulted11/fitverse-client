"use client";

import { useForm } from "react-hook-form";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";

export default function AddClassPage() {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await axiosInstance.post("/api/classes", data);

      toast.success(
        "Class submitted successfully! Waiting for admin approval."
      );

      reset();
    } catch (error) {
      console.error(error);

      toast.error("Failed to add class.");
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-8 text-3xl font-bold">
        Add New Class
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-5 md:grid-cols-2"
      >
        <input
          {...register("title", { required: true })}
          placeholder="Class Name"
          className="input input-bordered w-full"
        />

        <input
          {...register("trainer", { required: true })}
          placeholder="Trainer Name"
          className="input input-bordered w-full"
        />

        <input
          {...register("image", { required: true })}
          placeholder="Image URL"
          className="input input-bordered w-full md:col-span-2"
        />

        <input
          {...register("category", { required: true })}
          placeholder="Category (Yoga, Cardio...)"
          className="input input-bordered w-full"
        />

        <input
          {...register("difficulty", {
            required: true,
          })}
          placeholder="Difficulty (Beginner / Intermediate / Advanced)"
          className="input input-bordered w-full"
        />

        <input
          {...register("duration", {
            required: true,
          })}
          placeholder="Duration (60 mins)"
          className="input input-bordered w-full"
        />

        <input
          {...register("schedule", {
            required: true,
          })}
          placeholder="Schedule (Mon, Wed - 6 PM)"
          className="input input-bordered w-full"
        />

        <input
          type="number"
          {...register("price", {
            required: true,
          })}
          placeholder="Price"
          className="input input-bordered w-full"
        />

        <input
          type="number"
          {...register("slots", {
            required: true,
          })}
          placeholder="Available Slots"
          className="input input-bordered w-full"
        />

        <textarea
          {...register("description", {
            required: true,
          })}
          placeholder="Description"
          className="textarea textarea-bordered md:col-span-2 h-36"
        />

        <button className="btn btn-primary md:col-span-2">
          Submit Class
        </button>
      </form>
    </div>
  );
}