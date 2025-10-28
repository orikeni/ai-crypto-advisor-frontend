import { useState } from "react";
import { useSelector } from "react-redux";
import type { AppState } from "../../Redux/store";
import { voteService } from "../../Services/VoteService";
import { ThumbsUp, ThumbsDown } from "lucide-react";


type MemeCardProps = { id: number; content: string };

export default function MemeCard({ id, content }: MemeCardProps) {
  const user = useSelector((state: AppState) => state.user);
  const [vote, setVote] = useState<"UPVOTE" | "DOWNVOTE" | null>(null);

  async function handleVote(voteType: "UPVOTE" | "DOWNVOTE") {
    if (!user?.id) return alert("Login required");
    await voteService.vote({ userId: user.id, contentId: id, voteType });
    setVote(voteType);
  }

  return (
    <div className="bg-white border-4 border-gray-400 rounded-xl shadow-sm p-5 flex flex-col h-full items-center transition hover:shadow-md">
      <h3 className="text-xl font-semibold mb-3 text-sky-700">Crypto Meme</h3>

      <img
        src={content}
        alt="Crypto Meme"
        className="rounded-lg max-h-64 w-auto object-contain border border-gray-300"
      />

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