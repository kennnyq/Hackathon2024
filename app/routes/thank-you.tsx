// app/routes/thank-you.tsx
import { Link } from "@remix-run/react";

export default function ThankYou() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
        <p className="mb-6">
          Your message has been successfully sent. We will get back to you shortly.
        </p>
        <Link
          to="/"
          className="text-blue-600 hover:underline"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
