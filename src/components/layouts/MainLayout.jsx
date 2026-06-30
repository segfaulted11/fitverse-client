import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";

export default function MainLayout({ children }) {
  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        {children}
      </main>

      <Footer />
    </>
  );
}