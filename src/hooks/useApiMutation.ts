import {useMutation, type UseMutationResult, useQueryClient} from "@tanstack/react-query";
import storeApi from "../api/storeApi";
import inventoryApi from "../api/inventoryApi";
import {ApiType} from "../types/common";


interface UseApiMutationOptions<T, P> {
    method?: "post" | "put" | "delete";
    refetchKey?: string;
    url: string;
    api: ApiType;
    onSuccess?: (data: T) => void;
    onError?: (error: Error) => void;
    buildUrlFn?: (url: string, payload: P) => string;
    addPathVariables?: (url: string, payload: P) => string;
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
                                         addPathVariables,
                                         sendPayload,
                                     }: UseApiMutationOptions<T, P>): UseMutationResult<T, Error, P> {
    const axiosClient = api === ApiType.INVENTORY ? inventoryApi : storeApi;
    const queryClient = useQueryClient();

    return useMutation<T, Error, P>({
        mutationFn: async (payload: P) => {
            if (addPathVariables) {
                url = addPathVariables(url, payload);
            }
            if (buildUrlFn) {
                url = buildUrlFn(url, payload);
            }

            const shouldSendPayload = sendPayload ?? true;

            switch (method) {
                case "post":
                    return shouldSendPayload
                        ? (await axiosClient.post<T>(url, payload)).data
                        : (await axiosClient.post<T>(url)).data;

                case "put":
                    return shouldSendPayload
                        ? (await axiosClient.put<T>(url, payload)).data
                        : (await axiosClient.put<T>(url)).data;

                case "delete":
                    return (await axiosClient.delete<T>(url, shouldSendPayload && payload ? {data: payload} : undefined)).data;
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
