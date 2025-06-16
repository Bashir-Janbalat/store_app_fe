import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Stack, TextField } from '@mui/material';
import { useApiMutation } from '../../hooks/useApiMutation';
import { useLanguage } from '../../hooks/useLanguage';
import { toast } from 'react-hot-toast';
import type { Address } from '../../types/customer';
import { ApiType } from '../../types/common';

interface CreateAddressDialogProps {
    open: boolean;
    onClose: () => void;
    refetchKey: string;
}

const CreateAddressDialog: React.FC<CreateAddressDialogProps> = ({ open, onClose, refetchKey }) => {
    const { t } = useLanguage();
    const initialAddress = {
        id: 0,
        createdAt: '',
        updatedAt: '',
        customerId: 0,
        addressLine: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
        addressType: 'SHIPPING' as Address['addressType'],
        defaultAddress: false,
    };
    const [form, setForm] = useState<Address>(initialAddress);

    const createAddressMutation = useApiMutation<Address, Address>({
        method: 'post',
        url: '/addresses',
        api: ApiType.STORE,
        sendPayload: true,
        refetchKey: refetchKey,
        onSuccess: () => {
            toast.success(t.address.createSuccess);
            onClose();
            setForm(initialAddress);
        },
        onError: (err) => toast.error(t.address.createError + err.message),
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSave = () => {
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
        createAddressMutation.mutate(form);
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>{t.address.create}</DialogTitle>
            <DialogContent>
                <Stack spacing={2} mt={1}>
                    <TextField
                        label={t.address.addressLine}
                        name="addressLine"
                        value={form.addressLine}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        label={t.address.city}
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        label={t.address.state}
                        name="state"
                        value={form.state}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        label={t.address.postalCode}
                        name="postalCode"
                        value={form.postalCode}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        label={t.address.country}
                        name="country"
                        value={form.country}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        select
                        label={t.address.type.title}
                        name="addressType"
                        value={form.addressType}
                        onChange={handleChange}
                        fullWidth
                        required
                    >
                        <MenuItem value="BILLING">{t.address.type.billing}</MenuItem>
                        <MenuItem value="SHIPPING">{t.address.type.shipping}</MenuItem>
                    </TextField>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <label>
                            <input
                                type="checkbox"
                                name="defaultAddress"
                                checked={form.defaultAddress}
                                onChange={handleChange}
                            />{' '}
                            {t.address.default}
                        </label>
                    </Stack>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>{t.common.cancel}</Button>
                <Button onClick={handleSave} variant="contained">
                    {t.common.save}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateAddressDialog;
