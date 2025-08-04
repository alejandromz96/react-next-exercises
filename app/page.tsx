import Link from "next/link";

export default function HomePage() {
  const exercises = [
    { name: "Alert", path: "exercises/alert" },
    { name: "Timer", path: "exercises/timer" },
    { name: "Tabs", path: "exercises/tabs" },
    { name: "To Do List", path: "exercises/todo-list" },
    { name: "Signup Form", path: "exercises/signup-form" },
    { name: "Local Storage", path: "exercises/local-storage" },
  ];

  return (
    <main className="min-h-screen p-8">
      <h1 className="mb-6 text-4xl font-bold">Exercises</h1>
      <ul className="space-y-4">
        {exercises.map(({ name, path }) => (
          <li key={path}>
            <Link
              href={path}
              className="text-lg text-blue-500 hover:underline"
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

