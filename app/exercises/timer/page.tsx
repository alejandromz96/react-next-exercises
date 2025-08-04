"use client"
import Timer from "@/components/Timer";

export default function ToDoListPage() {
  return (
    <>
      <h1 className="mb-6 text-3xl font-bold">Timer</h1>
      <Timer render={(seconds) => <div>Time elapsed: {seconds}s</div>} />
    </>
  );
}
