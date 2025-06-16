import React, {useEffect, useState} from 'react';
import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    MenuItem,
    Stack,
    TextField
} from '@mui/material';
import {useApiMutation} from '../../hooks/useApiMutation';
import {useLanguage} from '../../hooks/useLanguage';
import { toast } from 'react-hot-toast';
import type {Address} from '../../types/customer';
import {ApiType} from '../../types/common';

interface EditAddressDialogProps {
    open: boolean;
    onClose: () => void;
    address: Address | null;
    refetchKey: string;
}

const EditAddressDialog: React.FC<EditAddressDialogProps> = ({open, onClose, address, refetchKey}) => {
    const {t} = useLanguage();
    const [form, setForm] = useState<Address | null>(null);

    useEffect(() => {
        if (address) {
            setForm(address);
        }
    }, [address]);

    const updateAddressMutation = useApiMutation<Address, Address>({
        method: 'put',
        url: '/addresses',
        api: ApiType.STORE,
        sendPayload: true,
        refetchKey: refetchKey,
        addPathVariables: (url, payload) => `${url}/${payload.id}`,
        onSuccess: () => {
            toast.success(t.address.editSuccess);
            onClose();
        },
        onError: (err) => toast.error(t.address.editError + err.message),
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!form) return;
        const {name, value, type, checked} = e.target;
        if (type === 'checkbox') {
            setForm({...form, [name]: checked});
        } else {
            setForm({...form, [name]: value});
        }
    };

    const handleSave = () => {
        if (!form) {
            toast.error(t.address.noFormData);
            return;
        }

        if (
            !form.addressLine ||
            !form.city ||
            !form.state ||
            !form.postalCode ||
            !form.country
        ) {
            toast.error(t.address.fillAllRequiredFields);
            return;
        }

        updateAddressMutation.mutate(form);
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>{t.address.edit}</DialogTitle>
            <DialogContent>
                <Stack spacing={2} mt={1}>
                    <TextField
                        label={t.address.addressLine}
                        name="addressLine"
                        value={form?.addressLine || ''}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label={t.address.city}
                        name="city"
                        value={form?.city || ''}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label={t.address.state}
                        name="state"
                        value={form?.state || ''}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label={t.address.postalCode}
                        name="postalCode"
                        value={form?.postalCode || ''}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label={t.address.country}
                        name="country"
                        value={form?.country || ''}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        id={`address-type-${form?.id || 'new'}`}
                        select
                        label={t.address.type.title}
                        name="addressType"
                        value={form?.addressType || ''}
                        onChange={handleChange}
                        fullWidth
                    >
                        <MenuItem value="BILLING">{t.address.type.billing}</MenuItem>
                        <MenuItem value="SHIPPING">{t.address.type.shipping}</MenuItem>
                    </TextField>
                    <FormControlLabel
                        control={
                            <Checkbox
                                id={`default-address-checkbox-${form?.id || 'new'}`}
                                checked={form?.defaultAddress || false}
                                onChange={handleChange}
                                name="defaultAddress"
                            />
                        }
                        label={t.address.default}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>{t.common.cancel}</Button>
                <Button onClick={handleSave} variant="contained">{t.common.save}</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditAddressDialog;
