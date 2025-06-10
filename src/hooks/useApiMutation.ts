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
    sendPayload?: boolean;
}

export function useApiMutation<T, P>({
                                         method = "post",
                                         refetchKey,
                                         url,
                                         api,
                                         onSuccess,
                                         onError,
                                         buildUrlFn,
                                         sendPayload
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

            const shouldSendPayload = sendPayload ?? true;

            switch (method) {
                case "post":
                    return shouldSendPayload
                        ? (await axiosClient.post<T>(finalUrl, payload)).data
                        : (await axiosClient.post<T>(finalUrl)).data;

                case "put":
                    return shouldSendPayload
                        ? (await axiosClient.put<T>(finalUrl, payload)).data
                        : (await axiosClient.put<T>(finalUrl)).data;

                case "delete":
                    return (await axiosClient.delete<T>(finalUrl, shouldSendPayload && payload ? {data: payload} : undefined)).data;
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
