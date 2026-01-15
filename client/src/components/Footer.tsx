export function Footer() {
  return (
    <footer className="py-8 bg-zinc-950 border-t border-white/5">
      <div className="container mx-auto px-4 text-center">
        <p className="text-zinc-500 text-sm font-mono">
          © {new Date().getFullYear()} Built with React, Tailwind & Framer Motion.
        </p>
      </div>
    </footer>
  );
}
