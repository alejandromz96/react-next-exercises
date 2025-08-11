import LoginEmitter from "@/components/LoginEmitter";
import LoginListener from "@/components/LoginListener";

const EventBusPage = () => {
  return (
    <div className="h-full">
      <h1 className="mb-6 text-4xl font-bold">Event Bus</h1>
      <div className="flex gap-4">
      <LoginEmitter />
      <LoginListener />
      </div>
    </div>
  );
};

export default EventBusPage;
