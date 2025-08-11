"use client";
import useEventBus from "@/hooks/useEventBus";
import { useEffect, useState } from "react";

type User = { name: string; surname: string };

const LoginListener = () => {
  const { on, off } = useEventBus();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const handleOnLogin = (loggedUser: User) => {
      setUser(loggedUser);
    };

    on("login", handleOnLogin);

    return () => off("login", handleOnLogin);
  }, [on, off]);

  return (
    <div className="flex h-[80vh] w-full flex-col items-center justify-center rounded-xl border border-zinc-600 bg-gradient-to-tl from-zinc-900 to-zinc-800 p-2">
      {!user ? (
        <span>User not logged in</span>
      ) : (
        <span>
          Welcome user {user.name} {user.surname}
        </span>
      )}
    </div>
  );
};

export default LoginListener;
