import axios from "axios";
import { appConfig } from "../Utils/AppConfig";
import type { DashboardContentModel } from "../models/DashboardContentModel";


class DashboardService {
    public async getDashboard(userId: number): Promise<Record<string, DashboardContentModel>> {
      const response = await axios.get<Record<string, DashboardContentModel>>(
        `${appConfig.dashboardUrl}/${userId}`
      );
      return response.data;
    }
  
    public async refreshDashboard(userId: number): Promise<Record<string, DashboardContentModel>> {
      const response = await axios.post<Record<string, DashboardContentModel>>(
        `${appConfig.dashboardUrl}/${userId}/refresh`
      );
      return response.data;
    }
  }
  
  export const dashboardService = new DashboardService();