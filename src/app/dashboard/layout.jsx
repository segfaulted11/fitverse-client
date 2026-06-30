"use client";

import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";

export default function DashboardLayout({ children }) {
  const { user } = useAuth();
  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content p-6">
        {children}
      </div>

      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

<ul className="menu min-h-full w-72 bg-base-200 p-4">

  <li>
    <Link href="/dashboard">
      Dashboard Home
    </Link>
  </li>

  <li>
    <Link href="/dashboard/profile">
      Profile
    </Link>
  </li>

  {/* USER */}
  {user?.role === "user" && (
    <>
      <li>
        <Link href="/dashboard/my-bookings">
          My Bookings
        </Link>
      </li>

      <li>
        <Link href="/dashboard/favorite-classes">
          Favorite Classes
        </Link>
      </li>

      <li>
        <Link href="/dashboard/apply-trainer">
          Apply as Trainer
        </Link>
      </li>
    </>
  )}

  {/* TRAINER */}
  {user?.role === "trainer" && (
    <>
      <li>
        <Link href="/dashboard/add-class">
          Add Class
        </Link>
      </li>

      <li>
        <Link href="/dashboard/manage-classes">
          My Classes
        </Link>
      </li>

      <li>
        <Link href="/forum/create">
          Add Forum Post
        </Link>
      </li>

      <li>
        <Link href="/dashboard/my-forum-posts">
          My Forum Posts
        </Link>
      </li>
    </>
  )}

  {/* ADMIN */}
  {user?.role === "admin" && (
    <>
      <div className="divider"></div>

      <li>
        <Link href="/dashboard/manage-users">
          Manage Users
        </Link>
      </li>

      <li>
        <Link href="/dashboard/trainer-applications">
          Trainer Applications
        </Link>
      </li>

      <li>
        <Link href="/dashboard/manage-classes">
          Manage Classes
        </Link>
      </li>

      <li>
        <Link href="/dashboard/add-class">
          Add Class
        </Link>
      </li>

      <li>
        <Link href="/dashboard/transactions">
          Transactions
        </Link>
      </li>
    </>
  )}
{(user?.role === "trainer" || user?.role === "admin") && (
  <li>
    <Link href="/dashboard/my-forum-posts">
      My Forum Posts
    </Link>
  </li>
)}
</ul>
      </div>
    </div>
  );
}