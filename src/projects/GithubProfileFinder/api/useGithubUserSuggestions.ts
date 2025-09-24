import { useQuery } from "@tanstack/react-query";

type SuggestionUser = {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  [key: string]: any;
};

const fetchUserSuggestions = async (
  query: string
): Promise<SuggestionUser[]> => {
  const res = await fetch(
    `https://api.github.com/search/users?q=${encodeURIComponent(
      query
    )}&per_page=5`
  );
  if (!res.ok) throw new Error("Failed to fetch suggestions");
  const data = await res.json();
  return data.items ?? [];
};

export const useGithubUserSuggestions = (query: string) => {
  return useQuery<SuggestionUser[], Error>({
    queryKey: ["githubUserSuggestions", query],
    queryFn: () => fetchUserSuggestions(query),
    enabled: !!query && query.length > 1,
    placeholderData: (prev) => prev,
  });
};
