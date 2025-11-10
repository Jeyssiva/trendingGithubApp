import axios from "axios";
import type { RepoType } from "../repoType";

const BASE = "https://api.github.com/search/repositories";

const getLast10DaysDate = (): string => {
  const date = new Date();
  date.setDate(date.getDate() - 10);
  return date.toISOString().split("T")[0]; // YYYY-MM-DD
};

export const fetchTrendingRepos = async (page = 1, per_page = 10, token?: string) => {
  const q = `created:>${getLast10DaysDate()}`;
  const url = `${BASE}?q=${encodeURIComponent(
    q
  )}&sort=stars&order=desc&page=${page}&per_page=${per_page}`;

  const headers: Record<string, string> = {};
  if (token) headers["Authorization"] = `token ${token}`;

  const res = await axios.get(url, { headers });
  return {
    items: res.data.items as RepoType[],
    total_count: res.data.total_count as number,
  };
};
