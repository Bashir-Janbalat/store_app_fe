import {useQuery} from '@tanstack/react-query';
import storeApi from "../api/storeApi.ts";
import inventoryApi from "../api/inventoryApi.ts";
import {ApiType} from "../types/common.ts";
import { getSessionId } from '../utils/session-utils.ts';



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
            const sessionId = getSessionId();
            const urlWithSession = url.includes("?")
                ? `${url}&sessionId=${sessionId}`
                : `${url}?sessionId=${sessionId}`;
            const res = await axiosClient.get<T>(urlWithSession, {params: params});
            return res.data;
        },
    });
}