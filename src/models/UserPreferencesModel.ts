import type { ContentType } from "./ContentType";
import type { InvestorType } from "./InvestorType ";

export interface UserPreferencesModel {
    interestedAssets: string[];
    investorType: InvestorType;
    contentTypes: ContentType[];
  }