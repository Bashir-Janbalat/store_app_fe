import {useQuery} from '@tanstack/react-query';
import storeApi from "../api/storeApi.ts";
import inventoryApi from "../api/inventoryApi.ts";
import {ApiType} from "../types/common.ts";


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
            const res = await axiosClient.get<T>(url, {params});
            return res.data;
        },
    });
}