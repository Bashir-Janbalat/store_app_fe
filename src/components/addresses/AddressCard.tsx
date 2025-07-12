import React from 'react';
import {Button, Card, CardContent, Chip, Grid, Stack, Tooltip, Typography} from '@mui/material';
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
        <Card variant="outlined" sx={{
            borderRadius: 3,
            p: 0,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease-in-out',
            border: '1px solid',
            borderColor: 'divider',
            '&:hover': {
                boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                transform: 'translateY(-2px)',
                borderColor: 'primary.main',
            }
        }}>
            <CardContent>
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid sx={{xs: 12}}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap"
                               spacing={2}>
                            {/* العنوان */}
                            <Stack>
                                <Typography variant="h5" fontWeight="medium" color="text.primary">
                                    {address.addressLine}
                                </Typography>
                                <Typography variant="h5" fontWeight="medium" color="text.secondary">
                                    {address.city}, {address.state} {address.postalCode}
                                </Typography>
                                <Typography variant="h5" color="text.secondary">
                                    {address.country}
                                </Typography>
                            </Stack>
                            {/* الشفرات */}
                            <Stack direction="row" flexWrap="wrap" justifyContent={"flex-start"} sx={{flexShrink: 0}}>
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
                                    color={address.addressType.toLowerCase() === 'billing' ? 'primary' : 'info'}
                                />
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>
                <Stack direction="row" spacing={1} mt={2} flexWrap="wrap" justifyContent="flex-start">
                    <Tooltip title={t.common.edit} arrow>
                        <Button
                            size="medium"
                            startIcon={<EditIcon/>}
                            onClick={() => onEdit(address)}
                            variant="outlined"
                        >
                            {t.common.edit}
                        </Button>
                    </Tooltip>
                    <Tooltip title={t.common.delete} arrow>
                        <Button
                            size="medium"
                            startIcon={<DeleteIcon/>}
                            onClick={() => onDelete(address.id)}
                            variant="outlined"
                            color="error"
                        >
                            {t.common.delete}
                        </Button>
                    </Tooltip>
                </Stack>
                <Stack flexDirection={{xs:"column", md:'row'}}>
                    {!isDefaultBilling && (
                        <Button
                            size="medium"
                            variant="outlined"
                            onClick={() => onSetDefault(address.id, 'BILLING')}
                            sx={{mr: 1, mt:1}}
                        >
                            {t.address.type.setAsDefaultBilling}
                        </Button>
                    )}
                    {!isDefaultShipping && (
                        <Button
                            size="medium"
                            variant="outlined"
                            onClick={() => onSetDefault(address.id, 'SHIPPING')}
                            sx={{mr: 1, mt:1}}
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
