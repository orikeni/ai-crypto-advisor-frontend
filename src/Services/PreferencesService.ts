import axios from "axios";
import type { UserPreferencesModel } from "../models/UserPreferencesModel";
import { appConfig } from "../Utils/AppConfig";

class PreferencesService {
    public async getPreferences(userId: number): Promise<UserPreferencesModel> {
      const response = await axios.get<UserPreferencesModel>(
        `${appConfig.prefUrl}/${userId}`
      );
      return response.data;
    }
  
    public async savePreferences (userId: number,preferences: UserPreferencesModel): Promise<UserPreferencesModel> {
      const response = await axios.post<UserPreferencesModel>(`${appConfig.prefUrl}/${userId}`,preferences);
      return response.data;
    }
  }
  
  export const preferencesService = new PreferencesService();