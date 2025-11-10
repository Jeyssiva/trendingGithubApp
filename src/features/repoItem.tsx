import React from "react";
import { FaStar } from "react-icons/fa";
import type { RepoType } from "../repoType";

interface RepoItemProps {
  repo: RepoType;
}

const RepoItem: React.FC<RepoItemProps> = ({ repo }) => {
  return (
    <div
      className="border rounded-md p-4 bg-customTeal text-white hover:bg-gray-700 transition flex flex-col gap-2"
    >
      <h2 className="text-xl font-bold">{repo.name}</h2>

      <p className="text-gray-300">{repo.description}</p>

      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center gap-2">
          <img
            src={repo.owner.avatar_url}
            alt={repo.owner.login}
            className="w-8 h-8 rounded-full"
          />
          <span className="text-gray-400 text-sm">{repo.owner.login}</span>
        </div>
        <div className="flex items-center gap-1 text-yellow-400 text-sm">
          {(<FaStar />)} {repo.stargazers_count}
        </div>
      </div>
    </div>
  );
};

export default RepoItem;
