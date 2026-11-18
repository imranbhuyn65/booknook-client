import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-7xl font-extrabold text-primary mb-3">404</h1>
      <h2 className="text-2xl font-bold mb-2">Page Not Found</h2>
      <p className="opacity-75 mb-6 max-w-md">
        The book or page you are looking for does not exist or has been moved to another shelf.
      </p>
      <Link href="/" className="btn btn-primary">
        Back to Home
      </Link>
    </div>
  );
}
