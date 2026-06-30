"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";

export default function TransactionsPage() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPayments = async () => {
      try {
        const res = await axiosInstance.get(
          "/api/payments/history"
        );

        setPayments(res.data.payments);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load transactions.");
      } finally {
        setLoading(false);
      }
    };

    loadPayments();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        Transactions
      </h1>

      <div className="overflow-x-auto rounded-xl border">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>User Email</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Transaction ID</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment._id}>
                <td>{index + 1}</td>

                <td>{payment.email}</td>

                <td>${payment.amount}</td>

                <td>
                  {new Date(payment.date).toLocaleString()}
                </td>

                <td className="max-w-xs truncate">
                  {payment.transactionId}
                </td>
              </tr>
            ))}

            {payments.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="py-8 text-center"
                >
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}