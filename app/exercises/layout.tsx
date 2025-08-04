import Link from "next/link";
import { PropsWithChildren } from "react";

export default function ExercisesLayout({ children }: PropsWithChildren) {
  return (
    <main className="min-h-screen p-8">
      <div className="mb-6">
        <Link
          href="/"
          className="inline-block text-blue-500 hover:underline"
        >
          ← Back to Home
        </Link>
      </div>
      {children}
    </main>
  );
}
