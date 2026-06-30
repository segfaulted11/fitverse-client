"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import axiosInstance from "@/lib/axios";
import { useAuth } from "@/providers/AuthProvider";

export default function LoginPage() {
  const router = useRouter();
 const { setUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axiosInstance.post("/api/auth/login", data);

if (res.data.success) {

setUser(res.data.user);

toast.success("Welcome back! 💪");

router.replace("/");
router.refresh();

}
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };
const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(
      auth,
      googleProvider
    );

    const googleUser = result.user;

    const res = await axiosInstance.post(
      "/api/auth/google",
      {
        name: googleUser.displayName,
        email: googleUser.email,
        image: googleUser.photoURL,
      }
    );

    if (res.data.success) {
      setUser(res.data.user);

      toast.success("Welcome! 🎉");

      router.replace("/");
      router.refresh();
    }
  } catch (error) {
    console.error(error);

    toast.error("Google login failed.");
  }
};
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl">
        <div className="card-body">
          <h1 className="mb-6 text-center text-3xl font-bold">
            Welcome Back 👋
          </h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <div>
              <label className="label">
                <span className="label-text">Email</span>
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full"
                {...register("email", {
                  required: "Email is required",
                })}
              />

              {errors.email && (
                <p className="mt-1 text-sm text-error">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="label">
                <span className="label-text">Password</span>
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered w-full"
                {...register("password", {
                  required: "Password is required",
                })}
              />

              {errors.password && (
                <p className="mt-1 text-sm text-error">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              disabled={isSubmitting}
              className="btn btn-primary w-full"
            >
              {isSubmitting ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <div className="divider">OR</div>

<button
  onClick={handleGoogleLogin}
  className="btn btn-outline w-full"
>
  Continue with Google
</button>

          <p className="mt-3 text-center text-sm">
            Don't have an account?
            <Link
              href="/register"
              className="link link-primary font-semibold"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}