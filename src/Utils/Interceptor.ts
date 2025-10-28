import axios from "axios";

class Interceptor {

    public create(): void {

        axios.interceptors.request.use((requestConfig) => {

            if (requestConfig.url && requestConfig.url.includes("/api/auth/")) {
                return requestConfig;
            }

            const token = localStorage.getItem("token");
            if (token) {
                requestConfig.headers.Authorization = "Bearer " + token;
            }
            return requestConfig;
        });
    }
}

export const interceptor = new Interceptor();
