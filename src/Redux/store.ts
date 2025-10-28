import { configureStore } from "@reduxjs/toolkit";
import type { DashboardContentModel } from "../models/DashboardContentModel";
import type { UserModel } from "../models/UserModel";
import { userSlice } from "./userSlice";
import { dashboardSlice } from "./dashboardSlice";


export type AppState = {
    dashboardContent: DashboardContentModel[] | null;
    user: UserModel | null;
}; 

 
export const store = configureStore<AppState>({
    reducer: {
        dashboardContent: dashboardSlice.reducer,
        user: userSlice.reducer
    }
});