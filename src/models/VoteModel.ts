export interface VoteModel  {
    userId: number;
    contentId: number;
    voteType: "UPVOTE" | "DOWNVOTE",
}