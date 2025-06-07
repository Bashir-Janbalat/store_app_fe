import {useMutation, useQueryClient} from "@tanstack/react-query";
import storeApi from "../api/storeApi";
import inventoryApi from "../api/inventoryApi";
import {ApiType} from "../types/common";
import {getSessionId} from "../utils/session-utils";


interface UseApiMutationOptions<T, P> {
    method?: "post" | "put" | "delete";
    refetchKey?: string;
    url: string;
    api: ApiType;
    onSuccess?: (data: T) => void;
    onError?: (error: Error) => void;
    buildUrlFn?: (url: string, payload: P) => string;
}

export function useApiMutation<T, P>({
                                         method = "post",
                                         refetchKey,
                                         url,
                                         api,
                                         onSuccess,
                                         onError,
                                         buildUrlFn
                                     }: UseApiMutationOptions<T, P>) {
    const axiosClient = api === ApiType.INVENTORY ? inventoryApi : storeApi;
    const queryClient = useQueryClient();

    return useMutation<T, Error, P>({
        mutationFn: async (payload: P) => {
            const sessionId = getSessionId();
            let finalUrl = url.includes("?")
                ? `${url}&sessionId=${sessionId}`
                : `${url}?sessionId=${sessionId}`;
            
            if (buildUrlFn) {
                finalUrl = buildUrlFn(finalUrl, payload);
            }

            switch (method) {
                case "post":
                    return (await axiosClient.post<T>(finalUrl, payload)).data;
                case "put":
                    return (await axiosClient.put<T>(finalUrl, payload)).data;
                case "delete":
                    return (await axiosClient.delete<T>(finalUrl, payload ? {data: payload} : undefined)).data;
            }
        },
        onSuccess: async (data) => {
            if (refetchKey) {
                await queryClient.invalidateQueries({queryKey: [refetchKey]});
            }
            onSuccess?.(data);
        },
        onError,
    });
}
