"use client";

import Link from "next/link";
import Logo from "./Logo";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";

export default function Navbar() {

const { user, logout } = useAuth();
const router = useRouter();
  return (
    <div className="navbar border-b bg-base-100 px-6 shadow-sm">
      <div className="navbar-start">
        <Logo />
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2 px-1">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/classes">Classes</Link></li>
          <li><Link href="/trainers">Trainers</Link></li>
          <li><Link href="/forum">Community Forum</Link></li>
        </ul>
      </div>

      <div className="navbar-end gap-2">
        {user ? (
<>
  <span className="font-medium">{user.name}</span>
<Image src={user.image} width={40} height={40} alt="" />

  <Link
    href="/dashboard"
    className="btn btn-primary btn-sm"
  >
    Dashboard
  </Link>

  <button
    className="btn btn-error btn-sm"
onClick={async () => {
  await logout();
  toast.success("Logged out successfully!");
  router.push("/");
}}
  >
    Logout
  </button>
</>
        ) : (
          <>
            <Link
              href="/login"
              className="btn btn-ghost btn-sm"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="btn btn-primary btn-sm"
            >
              Join Now
            </Link>
          </>
        )}
      </div>
    </div>
  );
}