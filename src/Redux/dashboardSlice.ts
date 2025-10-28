import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { DashboardContentModel } from "../models/DashboardContentModel";


export type DashboardState = DashboardContentModel[] | null;

export function initDashboard(_currentState: DashboardState, action: PayloadAction<DashboardContentModel[]>): DashboardContentModel[] {
    const dashboardToInit = action.payload;
    const newState = dashboardToInit;
    return newState;
}

export function clearDashboard(): DashboardState {
    return [];
}

export const dashboardSlice = createSlice({
    name: "dashboard",
    initialState: [] as DashboardState,
    reducers: { initDashboard, clearDashboard },
});


