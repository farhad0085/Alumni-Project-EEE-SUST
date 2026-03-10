import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold text-[#003366] mb-4">404</h1>
      <h2 className="text-xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-gray-500 mb-6">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="bg-[#003366] text-white px-6 py-2.5 rounded-lg text-sm font-medium no-underline hover:bg-[#002244] transition-colors"
      >
        Go back to Home
      </Link>
    </div>
  );
}
