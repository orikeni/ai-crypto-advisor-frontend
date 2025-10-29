class AppConfig {
    private readonly baseUrl =
        import.meta.env.VITE_API_URL ||
        "http://localhost:8080";

    public readonly registerUrl = `${this.baseUrl}/api/auth/registration`;
    public readonly loginUrl = `${this.baseUrl}/api/auth/login`;
    public readonly dashboardUrl = `${this.baseUrl}/api/dashboard`;
    public readonly voteUrl = `${this.baseUrl}/api/vote`;
    public readonly prefUrl = `${this.baseUrl}/api/pref`;
}

export const appConfig = new AppConfig();