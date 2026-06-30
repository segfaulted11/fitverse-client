export default function Newsletter() {
  return (
    <section className="py-20 bg-base-200">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="text-4xl font-bold">
          Stay Updated
        </h2>

        <div className="mt-6 flex gap-3">
          <input
            className="input input-bordered flex-1"
            placeholder="Enter your email"
          />

          <button className="btn btn-primary">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
}