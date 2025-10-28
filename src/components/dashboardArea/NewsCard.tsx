import { useSelector } from "react-redux";
import type { AppState } from "../../Redux/store";
import { voteService } from "../../Services/VoteService";
import { useState } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";


type NewsCardProps = { id: number; content: string };

export default function NewsCard({ id, content }: NewsCardProps) {
  const user = useSelector((state: AppState) => state.user);
  const news = JSON.parse(content) as { title: string; description: string; publishedAt: string }[];
  const [vote, setVote] = useState<"UPVOTE" | "DOWNVOTE" | null>(null);

  async function handleVote(voteType: "UPVOTE" | "DOWNVOTE") {
    if (!user?.id) return alert("Login required ");
    await voteService.vote({ userId: user.id, contentId: id, voteType });
    setVote(voteType);
  }

  return (
     <div className="bg-white border-4 border-gray-400 rounded-xl shadow-sm p-5 flex flex-col h-full transition hover:shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-sky-700">Latest News</h3>

      <ul className="space-y-3 flex-1 overflow-y-auto max-h-64 pr-2">
        {news.map((item, idx) => (
          <li
            key={idx}
            className="border-b border-gray-200 pb-2 last:border-b-0"
          >
            <p className="font-semibold text-gray-800">{item.title}</p>
            {item.description && (
              <p className="text-gray-600 text-sm mt-1">{item.description}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              {new Date(item.publishedAt).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>

      <div className="flex gap-3 mt-4">
        <button
          onClick={() => handleVote("UPVOTE")}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md border text-sm font-medium transition 
            ${
              vote === "UPVOTE"
                ? "bg-green-100 border-green-400 text-green-700"
                : "bg-white border-gray-300 hover:bg-green-50 text-gray-700"
            }`}
        >
          <ThumbsUp className="w-4 h-4" /> Like
        </button>

        <button
          onClick={() => handleVote("DOWNVOTE")}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md border text-sm font-medium transition 
            ${
              vote === "DOWNVOTE"
                ? "bg-red-100 border-red-400 text-red-700"
                : "bg-white border-gray-300 hover:bg-red-50 text-gray-700"
            }`}
        >
          <ThumbsDown className="w-4 h-4" /> Dislike
        </button>
      </div>
    </div>
  );
}