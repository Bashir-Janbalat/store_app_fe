import React from 'react';
import {Box, Button, Card, CardContent, Chip, Grid, IconButton, Stack, Tooltip, Typography} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import type {Address, AddressType} from "../../types/customer.ts";
import {useLanguage} from "../../hooks/useLanguage.ts";

type Props = {
    address: Address;
    onEdit: (address: Address) => void;
    onDelete: (addressId: number) => void;
    onSetDefault: (addressId: number, type: AddressType) => void;
};
const billing = 'BILLING';
const shipping = 'SHIPPING';

const AddressCard: React.FC<Props> = ({address, onEdit, onDelete, onSetDefault}) => {
    const {t} = useLanguage();

    const isDefaultBilling = address.defaultAddress && address.addressType === billing;
    const isDefaultShipping = address.defaultAddress && address.addressType === shipping;

    return (
        <Card variant="outlined" sx={{borderRadius: 2, p: 2}}>
            <CardContent>
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid size={{xs: 10}}>
                        <Stack spacing={0.5}>
                            <Typography variant="h5" fontWeight="bold">
                                {address.addressLine}, {address.postalCode} {address.city}
                            </Typography>
                            <Typography variant="h6" color="text.secondary">
                                {address.state}, {address.country}
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid>
                        <Box sx={{pt: 2}}>
                            {address.defaultAddress && (
                                <Chip
                                    label={t.address.default}
                                    size="medium"
                                    color="success"
                                    sx={{mr: 0.5}}
                                />
                            )}
                            <Chip
                                label={t.address.type[address.addressType.toLowerCase() as 'billing' | 'shipping']}
                                size="medium"
                                color={'primary'}
                            />
                        </Box>
                    </Grid>
                </Grid>
                <Stack direction="row" spacing={1} mt={2} flexWrap="wrap" justifyContent="flex-end">
                    <Tooltip title={t.common.edit} arrow>
                        <IconButton onClick={() => onEdit(address)} color="primary">
                            <EditIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={t.common.delete} arrow>
                        <IconButton onClick={() => onDelete(address.id)} color="error">
                            <DeleteIcon/>
                        </IconButton>
                    </Tooltip>
                </Stack>
                <Stack direction="row" spacing={1} mt={2} flexWrap="wrap" justifyContent="flex-end">
                    {!isDefaultBilling && (
                        <Button
                            size="small"
                            variant="outlined"
                            onClick={() => onSetDefault(address.id, 'BILLING')}
                        >
                            {t.address.type.setAsDefaultBilling}
                        </Button>
                    )}
                    {!isDefaultShipping && (
                        <Button
                            size="small"
                            variant="outlined"
                            onClick={() => onSetDefault(address.id, 'SHIPPING')}
                        >
                            {t.address.type.setAsDefaultShipping}
                        </Button>
                    )}
                </Stack>
            </CardContent>
        </Card>
    );
};

export default AddressCard;
