import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center w-full h-[calc(100vh-5rem)]">
      <div className="text-center space-y-3 border-2 border-red-500  p-10 rounded">
        <h2 className="text-xl font-semibold text-red-600">Page Not Found</h2>
        <p>Could not find requested resource</p>
        <div>
          <Link
            className="bg-green-500 px-3 py-2 rounded text-white mt-5"
            href="/"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
