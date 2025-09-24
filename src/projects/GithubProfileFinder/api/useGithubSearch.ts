// src/hooks/useGithubSearch.ts
import { useQuery } from "@tanstack/react-query";

type GithubUser = {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name?: string | null;
  bio?: string | null;
  public_repos?: number;
  followers?: number;
  following?: number;
  [key: string]: any;
};

const fetchUser = async (username: string): Promise<GithubUser> => {
  const res = await fetch(`https://api.github.com/users/${username}`);
  if (!res.ok) throw new Error("User not found");
  return res.json();
};

export const useGithubSearch = (username: string) => {
  return useQuery<GithubUser, Error>({
    queryKey: ["githubUser", username],
    queryFn: () => fetchUser(username),
    enabled: !!username,
  });
};
