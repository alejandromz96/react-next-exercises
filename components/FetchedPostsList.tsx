"use client";

import { ArrowRight, Loader2, Search } from "lucide-react";
import Link from "next/link";
import { useState, type FormEvent } from "react";

import useFetch from "@/hooks/useFetch";
import type { PostType } from "@/types/commons";

const BASE_URL = "https://jsonplaceholder.typicode.com/posts";

const FetchedPostsList = () => {
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState<number | undefined>(10);
  const { data, error, loading, refetch } = useFetch<PostType[]>({ url: BASE_URL, limit });

  if (error) return <span className="text-red-500">{error}</span>;

  if (loading)
    return (
      <div className="flex items-center gap-2 p-4 font-bold text-zinc-300">
        <Loader2 className="animate-spin" size={24} />
        Loading
      </div>
    );

  const filteredData = (
    !search
      ? data
      : data?.filter(({ title }) => title.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
  )?.slice(0, limit);

  if (!filteredData?.length) return <span>No posts match your search.</span>;
  return (
    <div>
      <div className="mb-5">
        <form onSubmit={(e) => e.preventDefault()} className="flex items-end gap-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="search" className="text-sm text-zinc-300">
              Search
            </label>
            <input
              id="search"
              type="text"
              className="rounded-md border border-zinc-400"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="limit" className="text-sm text-zinc-300">
              Limit
            </label>
            <input
              id="limit"
              type="number"
              min={1}
              className="rounded-md border border-zinc-400"
              value={limit}
              onChange={(e) => {
                const parsedValue = parseInt(e.target.value);
                setLimit(isNaN(parsedValue) ? undefined : Math.max(1, parsedValue));
              }}
            />
          </div>
          <button
            type="button"
            onKeyDown={(e) => {
              if (e.key === "Enter") refetch();
            }}
            onClick={refetch}
            className="ml-3 flex h-fit items-center gap-3 rounded-2xl border border-zinc-400 bg-zinc-800 px-2 py-1 text-zinc-300 hover:bg-zinc-700"
          >
            Refetch <Search size={12} />
          </button>
        </form>
      </div>
      <div className="flex flex-col gap-2">
        {filteredData.map(({ id, title }) => (
          <div key={id}>
            <Link
              href={`/exercises/fetched-posts/${id}`}
              className="flex w-fit items-center gap-2 text-blue-500 hover:text-blue-400 hover:underline"
            >
              <ArrowRight size={16} /> {title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FetchedPostsList;
