// app/routes/error.tsx
import { useSearchParams } from '@remix-run/react';

export default function ErrorPage() {
  const [searchParams] = useSearchParams();
  const message = searchParams.get('message') || 'An unexpected error occurred.';

  return (
    <div className="max-w-md mx-auto p-4 text-center">
      <h2 className="text-2xl font-bold mb-4">Oops!</h2>
      <p>{message}</p>
    </div>
  );
}
