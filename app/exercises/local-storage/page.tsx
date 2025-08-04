"use client";

import useLocalStorage from "@/hooks/useLocalStorage";
import { useState } from "react";

type User = { name: string; age: number };

const isUser = (value: unknown): value is User => {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as any).name === "string" &&
    typeof (value as any).age === "number"
  );
};

const LocalStoragePage = () => {
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState("");

  const [value, setValue] = useLocalStorage<User>("user", { name: "John", age: 30 }, isUser);

  const handleChangeUser = () => {
    const parsedNewAge = parseInt(newAge);
    if (!!newName && Number.isInteger(parsedNewAge)) {
      setValue({ name: newName, age: parsedNewAge });
      setNewName("");
      setNewAge("");
    }
  };

  return (
    <>
      <h1 className="mb-6 text-3xl font-bold">Local Storage</h1>
      <div className="flex w-fit flex-col gap-2 rounded-md border border-zinc-600 bg-zinc-900 px-4 py-2">
        {value ? (
          <>
            <h3 className="un font-bold">User</h3>
            <h4>Name: {value.name}</h4>
            <h4>Age: {value.age}</h4>
          </>
        ) : (
          <h4>No user saved</h4>
        )}
      </div>
      <div className="mt-5 flex w-fit flex-col items-center gap-2">
        <div className="flex w-full justify-between gap-3">
          <label htmlFor="newName">New name</label>
          <input
            id="newName"
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            aria-checked={!!newName}
            className="rounded-xl border border-amber-400 bg-zinc-700 px-3 aria-checked:border-zinc-400"
          />
        </div>
        <div className="flex w-full justify-between gap-3">
          <label htmlFor="newAge">New age</label>
          <input
            id="newAge"
            type="number"
            value={newAge}
            onChange={(e) => setNewAge(e.target.value)}
            aria-checked={!!newAge}
            className="rounded-xl border border-amber-400 bg-zinc-700 px-3 aria-checked:border-zinc-400"
          />
        </div>
        <button
          onClick={handleChangeUser}
          onKeyDown={(e) => e.key === "Enter" && handleChangeUser()}
          className="w-fit cursor-pointer rounded-xl border border-zinc-400 bg-zinc-700 px-4"
        >
          Set user
        </button>
      </div>
    </>
  );
};

export default LocalStoragePage;
