class AppConfig {
	
    public readonly registerUrl = "http://localhost:8080/api/auth/registration";
    public readonly loginUrl = "http://localhost:8080/api/auth/login";
    public readonly dashboardUrl = "http://localhost:8080/api/dashboard";
    public readonly voteUrl = "http://localhost:8080/api/vote";
    public readonly prefUrl = "http://localhost:8080/api/pref";


}

export const appConfig = new AppConfig();