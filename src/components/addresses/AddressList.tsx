import React, {useState} from 'react';
import {Button, Grid, Typography} from '@mui/material';
import type {Address, AddressType} from "../../types/customer.ts";
import {useFetchData} from "../../hooks/useFetchData.ts";
import {ApiType} from "../../types/common.ts";
import {useQueryToast} from "../../hooks/useQueryToast.ts";
import {useApiMutation} from "../../hooks/useApiMutation.ts";
import {toast} from "react-hot-toast";
import LoadingSkeleton from "../common/LoadingSkeleton.tsx";
import ErrorFallback from "../common/ErrorFallback.tsx";
import {useLanguage} from '../../hooks/useLanguage.ts';
import AddressCard from "./AddressCard.tsx";
import AddIcon from '@mui/icons-material/Add';
import EditAddressDialog from "./EditAddressDialog.tsx";
import CreateAddressDialog from "./CreateAddressDialog.tsx";

const queryKey = 'addresses';

const AddressList: React.FC = () => {
    const {t} = useLanguage();
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
    const [openCreateDialog, setOpenCreateDialog] = useState(false);


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
        onSuccess: () => toast.success(t.address.deleteSuccess),
        onError: (error) => toast.error(t.address.deleteError + error.message),
    });

    const handleDelete = (id: number) => {
        deleteAddressMutation.mutate({id: id});
    };
    const setDefaultAddressMutation = useApiMutation<void, Address>({
        method: 'put',
        url: '/addresses',
        api: ApiType.STORE,
        refetchKey: queryKey,
        sendPayload: true,
        addPathVariables: (url, payload) => `${url}/${payload.id}`,
        onSuccess: () => toast.success(t.address.type.defaultSetSuccess),
        onError: (error) => toast.error(t.address.type.defaultSetError + error.message),
    });

    const handleSetDefault = (addressId: number, type: AddressType) => {
        const targetAddress = addresses?.find(addr => addr.id === addressId);
        if (!targetAddress) {
            toast.error("Address not found");
            return;
        }

        const updatedAddress: Address = {
            ...targetAddress,
            addressType: type,
            defaultAddress: true,
        };

        setDefaultAddressMutation.mutate(updatedAddress);
    };

    const handleEdit = (address: Address) => {
        setSelectedAddress(address);
    };
    const handleCreate = () => {
        setOpenCreateDialog(true);
    };

    if (isLoading) return <LoadingSkeleton/>;
    if (isError) return <ErrorFallback onRetry={retryWithToast}/>;


    return (
        <>
            <Typography variant="h6" gutterBottom>
                {t.address.title}
            </Typography>
            <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon/>}
                onClick={handleCreate}
                sx={{mb: 2}}
            >
                {t.address.create}
            </Button>
            <Grid container spacing={2}>
                {addresses && addresses.map((address) => (
                    <Grid size={{xs: 12, md: 6}} key={address.id}>
                        <AddressCard
                            address={address}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onSetDefault={handleSetDefault}
                        />
                    </Grid>
                ))}
            </Grid>
            {selectedAddress && (
                <EditAddressDialog
                    open={Boolean(selectedAddress)}
                    address={selectedAddress}
                    onClose={() => setSelectedAddress(null)}
                    refetchKey={queryKey}
                />
            )}
            {openCreateDialog && (
                <CreateAddressDialog
                    open={true}
                    onClose={() => setOpenCreateDialog(false)}
                    refetchKey={queryKey}
                />
            )}
        </>
    );
};

export default AddressList;
