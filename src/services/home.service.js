import axiosInstance from "@/lib/axios";

export const getClasses = async () => {
  const res = await axiosInstance.get("/api/classes");
  return res.data.classes;
};

export const getTrainers = async () => {
  const res = await axiosInstance.get("/api/trainers");
  return res.data.trainers;
};