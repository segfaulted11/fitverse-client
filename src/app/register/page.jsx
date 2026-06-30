"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axiosInstance.post("/api/auth/register", data);

      if (res.data.success) {
        toast.success(res.data.message);
        router.push("/");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-4 rounded-xl border p-8 shadow"
      >
        <h1 className="text-center text-3xl font-bold">Register</h1>

        {/* Name */}
        <div>
          <input
            {...register("name", {
              required: "Name is required.",
            })}
            placeholder="Name"
            className="input input-bordered w-full"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <input
            {...register("email", {
              required: "Email is required.",
            })}
            placeholder="Email"
            type="email"
            className="input input-bordered w-full"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <input
            {...register("password", {
              required: "Password is required.",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long.",
              },
              validate: {
                hasUppercase: (value) =>
                  /[A-Z]/.test(value) ||
                  "Password must contain at least one uppercase letter.",
                hasLowercase: (value) =>
                  /[a-z]/.test(value) ||
                  "Password must contain at least one lowercase letter.",
              },
            })}
            placeholder="Password"
            type="password"
            className="input input-bordered w-full"
          />

          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Image URL */}
        <div>
          <input
            {...register("image")}
            placeholder="Image URL (optional)"
            className="input input-bordered w-full"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary w-full"
        >
          {isSubmitting ? "Creating Account..." : "Register"}
        </button>

        <p className="text-center">
          Already have an account?{" "}
          <Link href="/login" className="link">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}