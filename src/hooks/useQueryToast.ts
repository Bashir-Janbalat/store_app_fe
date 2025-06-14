import {useEffect} from "react";
import {toast} from "react-hot-toast";
import type {UseQueryResult} from "@tanstack/react-query";
import {useLanguage} from "./useLanguage.ts";

interface UseToastHandlerOptions {
    successMessage?: string;
    errorMessage?: string;
    showLoading?: boolean;
}

export function useQueryToast<T>(queryResult: UseQueryResult<T, Error>, options: UseToastHandlerOptions = {}) {
    const {t} = useLanguage();
    const {isError, isSuccess, refetch} = queryResult;

    useEffect(() => {
        if (isError && options.errorMessage) {
            toast.error(options.errorMessage);
        }

        if (isSuccess && options.successMessage) {
            toast.success(options.successMessage);
        }
    }, [isError, isSuccess, options.errorMessage, options.successMessage]);

    const retryWithToast = async () => {
        if (options.showLoading) toast.loading(t.loading.retry || "Retrying...");
        const res = await refetch();
        toast.dismiss();

        if (res.isError) {
            toast.error(options.errorMessage || t.error.retryFail || "Error while retrying.");
        } else {
            toast.success(options.successMessage || t.success.loaded || "Data loaded successfully.");
        }
    };

    return {
        ...queryResult,
        retryWithToast,
    };
}