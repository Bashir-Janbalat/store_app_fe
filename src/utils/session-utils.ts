import Cookies from "js-cookie";

const SESSION_COOKIE_NAME = "sessionId";
const IS_LOGGED_IN_COOKIE = "isLoggedIn";

const isProd = window.location.protocol === "https:";

const cookieOptions = {
    expires: 7,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
} as const;

export const generateNewSessionId = (): string => {
    return crypto.randomUUID();
};

export function getSessionId(): string {
    let sessionId = Cookies.get(SESSION_COOKIE_NAME);
    if (!sessionId) {
        sessionId = generateNewSessionId();
        Cookies.set(SESSION_COOKIE_NAME, sessionId, cookieOptions);
    }
    return sessionId;
}

export function hasSessionId(): boolean {
    return !!Cookies.get(SESSION_COOKIE_NAME);
}

export function resetSessionId(): string {
    const newId = generateNewSessionId();
    Cookies.set(SESSION_COOKIE_NAME, newId, cookieOptions);
    return newId;
}

export function isLoggedIn(): boolean {
    return Cookies.get(IS_LOGGED_IN_COOKIE) === "true";
}

export function saveLoggedIn(loggedIn: boolean): void {
    Cookies.set(IS_LOGGED_IN_COOKIE, loggedIn ? "true" : "false", cookieOptions);
}

export function removeLoggedIn(): void {
    Cookies.remove(IS_LOGGED_IN_COOKIE);
    Cookies.remove(SESSION_COOKIE_NAME);
}
