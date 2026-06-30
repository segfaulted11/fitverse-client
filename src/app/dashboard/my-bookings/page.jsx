"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const loadBookings = async () => {
      const res = await axiosInstance.get("/api/bookings/my");

      setBookings(res.data.bookings);
    };

    loadBookings();
  }, []);

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        My Bookings
      </h1>

      <table className="table">
        <thead>
          <tr>
            <th>Class</th>
            <th>Trainer</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.className}</td>
              <td>{booking.trainer}</td>
              <td>{booking.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}