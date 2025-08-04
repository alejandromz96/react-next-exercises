import Alert from "@/components/Alert";

export default function ToDoListPage() {
  return (
    <>
      <h1 className="mb-6 text-3xl font-bold">Alert</h1>
      <div className="flex w-fit flex-col gap-2">
        <Alert type="success">This is a success message</Alert>
        <Alert type="info">This is a info message</Alert>
        <Alert type="error">This is a error message</Alert>
      </div>
    </>
  );
}
