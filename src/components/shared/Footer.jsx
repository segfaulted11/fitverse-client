export default function Footer() {
  return (
    <footer className="footer footer-center bg-neutral text-neutral-content p-10">
      <aside>
        <p className="text-lg font-semibold">
          FitVerse
        </p>

        <p>
          Transform Your Fitness Journey 💪
        </p>

        <p>
          © {new Date().getFullYear()} FitVerse
        </p>
      </aside>
    </footer>
  );
}