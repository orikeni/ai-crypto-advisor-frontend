import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserModel } from "../models/UserModel";

export type UserState = UserModel | null;

export function initUser(_currentState: UserState, action: PayloadAction<UserModel>): UserModel {
    const userToInit = action.payload;
    const newState = userToInit;
    return newState;
}

export function logoutUser(): UserState {
    return null;
}

export const userSlice = createSlice({
    name: "user",
    initialState: null as UserState,
    reducers: { initUser, logoutUser }
});