import axios from "axios";
import type { VoteModel } from "../models/VoteModel";
import { appConfig } from "../Utils/AppConfig";


class VoteService {
    public async vote(vote: VoteModel): Promise<void> {
      await axios.post(`${appConfig.voteUrl}`, null, {
        params: {
          userId: vote.userId,
          contentId: vote.contentId,
          voteType: vote.voteType,
        },
      });
    }
  }
  
  export const voteService = new VoteService();