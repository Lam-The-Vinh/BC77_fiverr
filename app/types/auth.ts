interface AuthState {
    user: any;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}