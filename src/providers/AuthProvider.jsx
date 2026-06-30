"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

const getCurrentUser = async () => {
  try {
    const res = await axiosInstance.get("/api/auth/me");
    setUser(res.data.user);
    return res.data.user;
  } catch {
    setUser(null);
    return null;
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  const init = async () => {
    await getCurrentUser();
  };

  init();
}, []);
const logout = async () => {
  try {
    await axiosInstance.post("/api/auth/logout");
  } finally {
    setUser(null);
  }
};
const value = {
  user,
  loading,
  setUser,
  getCurrentUser,
  logout,
};

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}