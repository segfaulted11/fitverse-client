import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero min-h-[70vh] bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-xl">
          <h1 className="text-5xl font-bold">
            Transform Your Body 💪
          </h1>

          <p className="py-6">
            Join FitVerse and train with professional trainers.
          </p>

          <button className="btn btn-primary">
           <Link href={'/classes'}>Explore Classes</Link>
          </button>
        </div>
      </div>
    </section>
  );
}