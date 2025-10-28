import { userSlice } from "../Redux/userSlice";
import type { UserModel } from "../models/UserModel";
import { store } from "../Redux/store";
import axios from "axios";
import { appConfig } from "../Utils/AppConfig";
import type { CredentialsModel } from "../models/CredentialsModel";
import { jwtDecode } from "jwt-decode";

class UserService{

    constructor() {
        const token = localStorage.getItem("token");
        if (!token) return;
    
        try {
          const payload = jwtDecode<UserModel & { exp: number }>(token);
          store.dispatch(userSlice.actions.initUser(payload));
        } catch {
          localStorage.removeItem("token");
        }
      }

      public async register(user: UserModel): Promise<void> {
        const response = await axios.post<{ token: string }>(appConfig.registerUrl, user);
        const token = response.data.token;
    
        localStorage.setItem("token", token);
    
        const payload = jwtDecode<UserModel & { exp: number }>(token);
        store.dispatch(userSlice.actions.initUser(payload));
      }

      public async login(credentials: CredentialsModel): Promise<void> {
        const response = await axios.post<{ token: string }>(appConfig.loginUrl, credentials);
        const token = response.data.token;
    
        localStorage.setItem("token", token);
    
        const payload = jwtDecode<UserModel & { exp: number }>(token);
        store.dispatch(userSlice.actions.initUser(payload));
      }

    public logout(): void {
        store.dispatch(userSlice.actions.logoutUser());
        localStorage.removeItem("token");
    }

}
export const userService = new UserService();
