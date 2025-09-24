import React, { useEffect, useRef, useState } from "react";
import { useGithubSearch } from "./api/useGithubSearch";
import { useGithubUserSuggestions } from "./api/useGithubUserSuggestions";

const GithubProfileFinder: React.FC = () => {
  const [username, setUsername] = useState("");
  const [search, setSearch] = useState("");
  const [debouncedUsername, setDebouncedUsername] = useState(username);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setDebouncedUsername(username), 100);
    return () => clearTimeout(id);
  }, [username]);

  const { data, isLoading, error } = useGithubSearch(search);

  const { data: suggestions = [] } =
    useGithubUserSuggestions(debouncedUsername);

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    setIsDropdownOpen(suggestions.length > 0);
  }, [suggestions.length]);

  const onSelectSuggestion = (login: string) => {
    setUsername(login);
    setSearch(login);
    setIsDropdownOpen(false);
  };

  const onSubmitSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!username) return;
    setSearch(username);
    setIsDropdownOpen(false);
  };

  return (
    <main className="flex flex-col items-center">
      <div className="max-w-md w-full relative" ref={wrapperRef}>
        <h1 className="text-3xl font-bold mb-6">🔎 GitHub Profile Finder</h1>

        <form onSubmit={onSubmitSearch} className="mb-2">
          <div className="border border-loadmore-card rounded-full flex items-center mb-0 relative">
            <input
              type="text"
              placeholder="Enter GitHub username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="px-4 py-2 rounded-l-full w-full focus:outline-0"
              onFocus={() => setIsDropdownOpen(suggestions.length > 0)}
              aria-label="GitHub username"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-secondary rounded-r-full !hover:bg-blue-700 cursor-pointer"
              onClick={() => {}}
            >
              Search
            </button>
          </div>
        </form>

        {/* Autocomplete Dropdown */}
        {isDropdownOpen && suggestions.length > 0 && (
          <ul className="absolute bg-loadmore-card border border-loadmore-card rounded-md mt-1 shadow-lg w-full max-h-48 overflow-y-auto z-10">
            {suggestions.map((user) => (
              <li
                key={user.id}
                onClick={() => onSelectSuggestion(user.login)}
                className="px-4 py-2 cursor-pointer hover:bg-gray-500/10 flex items-center space-x-2"
              >
                <img
                  src={user.avatar_url}
                  alt={user.login}
                  className="w-6 h-6 rounded-full"
                />
                <span>{user.login}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Results */}
        <div className="flex justify-center mt-6">
          {isLoading && <p className="loader" />}
          {error instanceof Error && (
            <p className="text-red-400">{error.message}</p>
          )}
          {data && (
            <div className="bg-loadmore-card p-6 rounded-xl shadow-lg w-full text-center">
              <img
                src={data.avatar_url}
                alt={data.login}
                className="w-24 h-24 rounded-full shadow-xl mx-auto mb-4"
              />
              <h2 className="text-xl font-bold">{data.name || data.login}</h2>
              <p className="text-gray-400">{data.bio}</p>
              <div className="flex justify-around mt-4 text-sm">
                <span>Repos: {data.public_repos}</span>
                <span>Followers: {data.followers}</span>
                <span>Following: {data.following}</span>
              </div>
              <a
                href={data.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-4 text-blue-400 hover:underline"
              >
                View Profile →
              </a>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default GithubProfileFinder;
