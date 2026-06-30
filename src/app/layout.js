import "./globals.css";

import { Toaster } from "sonner";

import AuthProvider from "@/providers/AuthProvider";
import MainLayout from "@/components/layouts/MainLayout";

export const metadata = {
  title: "FitVerse",
  description: "Fitness & Trainer Booking Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <MainLayout>
            {children}
          </MainLayout>

          <Toaster
            richColors
            position="top-center"
          />
        </AuthProvider>
      </body>
    </html>
  );
}