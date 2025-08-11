"use client";

import { Loader2 } from "lucide-react";

import useFetch from "@/hooks/useFetch";
import type { PostType } from "@/types/commons";

const BASE_URL = "https://jsonplaceholder.typicode.com/posts";

type FetchedPostProps = {
  id: string;
};

const FetchedPost = ({ id }: FetchedPostProps) => {
  const { data, error, loading } = useFetch<PostType>({ url: `${BASE_URL}/${id}` });

  if (error) return <span className="text-red-500">{error}</span>;

  if (loading)
    return (
      <div className="flex items-center gap-2 p-4 font-bold text-zinc-300">
        <Loader2 className="animate-spin" size={24} />
        Loading
      </div>
    );

  if (!data) return <span>No posts found</span>;

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-xl font-bold">{data.title}</h3>
      <p className="text-zinc-300">{data.body}</p>
    </div>
  );
};

export default FetchedPost;
