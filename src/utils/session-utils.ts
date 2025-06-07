export const generateNewSessionId = (): string => {
    return crypto.randomUUID();
};

export function getSessionId(): string {
    let sessionId = localStorage.getItem("sessionId");
    if (!sessionId) {
        sessionId = generateNewSessionId();
        localStorage.setItem("sessionId", sessionId);
    }
    return sessionId;
}

export function hasSessionId(): boolean {
    return !!localStorage.getItem("sessionId");
}

export function resetSessionId(): string {
    const newId = generateNewSessionId();
    localStorage.setItem("sessionId", newId);
    return newId;
}

export function isLoggedIn(): boolean {
    return localStorage.getItem("isLoggedIn") === "true";
}

export function saveLoggedIn(loggedIn: boolean): void {
    localStorage.setItem("isLoggedIn", loggedIn ? "true" : "false");
}
export function removeLoggedIn(): void {
    localStorage.removeItem("isLoggedIn");
}
