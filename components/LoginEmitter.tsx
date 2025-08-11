"use client";
import useEventBus from "@/hooks/useEventBus";
import { type FormEvent, useState } from "react";

const LoginEmitter = () => {
  const { emit } = useEventBus();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!!name && !!surname) {
      emit("login", { name, surname });
      setName("");
      setSurname("");
    }
  };

  return (
    <div className="flex h-[80vh] w-full items-center justify-center rounded-xl border border-zinc-600 bg-gradient-to-br from-zinc-900 to-zinc-800 p-2">
      <form className="flex flex-col items-center gap-5" onSubmit={handleSubmit}>
        <div className="flex w-full gap-2">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md border border-zinc-400 px-1"
          />
        </div>
        <div className="flex w-full gap-2">
          <label htmlFor="surname">Surname</label>
          <input
            id="surname"
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            className="w-full rounded-md border border-zinc-400 px-1"
          />
        </div>
        <button
          type="submit"
          className="rounded-xl border border-zinc-400 px-4 py-0.5 transition-colors duration-300 hover:bg-zinc-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginEmitter;
