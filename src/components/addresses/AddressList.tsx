import React from 'react';
import {Grid, Typography} from '@mui/material';
import type {Address} from "../../types/customer.ts";
import {useFetchData} from "../../hooks/useFetchData.ts";
import {ApiType} from "../../types/common.ts";
import {useQueryToast} from "../../hooks/useQueryToast.ts";
import {useApiMutation} from "../../hooks/useApiMutation.ts";
import {toast} from "react-hot-toast";
import LoadingSkeleton from "../common/LoadingSkeleton.tsx";
import ErrorFallback from "../common/ErrorFallback.tsx";
import {useLanguage} from '../../hooks/useLanguage.ts';
import AddressCard from "./AddressCard.tsx";

const queryKey = 'addresses';

const AddressList: React.FC = () => {
    const {t} = useLanguage();
    const query = useFetchData<Address[]>(ApiType.STORE, queryKey, `/addresses`);
    const {data: addresses, isLoading, isError, retryWithToast} = useQueryToast(query, {
        showLoading: true,
    });

    const deleteAddressMutation = useApiMutation<void, { id: number }>({
        method: 'delete',
        url: '/addresses',
        api: ApiType.STORE,
        refetchKey: queryKey,
        addPathVariables: (url, payload) => `${url}/${payload.id}`,
        sendPayload: false,
        onSuccess: () => toast.success('Adresse erfolgreich gelöscht'),
        onError: (error) => toast.error('Fehler beim Löschen der Adresse: ' + error.message),
    });

    const handleDelete = (id: number) => {
        deleteAddressMutation.mutate({id: id});
    };
    const handleEdit = (address: Address) => {
        console.log('TODO: Edit address:', address);
    };

    if (isLoading) return <LoadingSkeleton/>;
    if (isError) return <ErrorFallback onRetry={retryWithToast}/>;


    return (
        <>
            <Typography variant="h6" gutterBottom>
                {t.address.title}
            </Typography>
            <Grid container spacing={2}>
                {addresses && addresses.map((address) => (
                    <Grid size={{xs: 12, md: 6}} key={address.id}>
                        <AddressCard
                            address={address}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default AddressList;
