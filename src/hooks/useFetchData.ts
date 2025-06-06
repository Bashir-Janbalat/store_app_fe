import {useQuery} from '@tanstack/react-query';
import storeApi from "../api/storeApi.ts";
import inventoryApi from "../api/inventoryApi.ts";
import {ApiType} from "../types/common.ts";

function getSessionId(): string {
    let sessionId = localStorage.getItem("sessionId");
    if (!sessionId) {
        sessionId = crypto.randomUUID();
        localStorage.setItem("sessionId", sessionId);
    }
    return sessionId;
}

export function useFetchData<T, P extends Record<string, unknown> | undefined = undefined>(
    api: ApiType,
    key: string,
    url: string,
    params?: P
) {
    const axiosClient = api === ApiType.INVENTORY ? inventoryApi : storeApi;
    return useQuery<T, Error>({
        queryKey: [key, params],
        queryFn: async () => {
            const token = localStorage.getItem("token");
            let finalUrl = url;

            if (!token && !url.includes("sessionId")) {
                const sessionId = getSessionId();
                const separator = url.includes("?") ? "&" : "?";
                finalUrl = `${url}${separator}sessionId=${sessionId}`;
            }

            const res = await axiosClient.get<T>(finalUrl, {params});
            return res.data;
        },
    });
}