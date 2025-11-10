import React, { useEffect, useState, useRef, type CSSProperties } from "react";
import type { RepoType } from "../repoType";
import RepoItem from "./repoItem";
import { fetchTrendingRepos } from "../actions/repoAction";
import { ClipLoader } from "react-spinners";

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "black",
  };

const RepoMain: React.FC = () => {
  const [repos, setRepos] = useState<RepoType[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const loader = useRef<HTMLDivElement | null>(null);

  const loadRepos = async (pageNum: number) => {
    setLoading(true);
    const newRepos = await fetchTrendingRepos(pageNum);
    setRepos((prev) => [...prev, ...newRepos.items]);
    setLoading(false);
  };

  useEffect(() => {
    loadRepos(page);
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { root: null, rootMargin: "20px", threshold: 1.0 }
    );
    if (loader.current) observer.observe(loader.current);
    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, []);

  return (
    <div className="min-h-screen text-white p-4 flex flex-col gap-4">
      <h1 className="text-3xl text-red-500 font-bold text-center mb-4">
        GitHub Trending Application
      </h1>

      <div className="flex flex-col gap-4">
        {repos.map((r) => (
          <RepoItem key={r.id} repo={r} />
        ))}
      </div>

      <div ref={loader} className="h-10 flex justify-center items-center">
        <ClipLoader color="black" loading = {loading}
          cssOverride={override} size={40}
          aria-label="Loading Spinner"
          data-testid="loader"/>
      </div>
    </div>
  );
};

export default RepoMain;
