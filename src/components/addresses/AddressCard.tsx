import React from 'react';
import {Box, Card, CardContent, Chip, Grid, IconButton, Stack, Typography} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import type {Address} from "../../types/customer.ts";
import {useLanguage} from "../../hooks/useLanguage.ts";

type Props = {
    address: Address;
    onEdit: (address: Address) => void;
    onDelete: (addressId: number) => void;
};

const AddressCard: React.FC<Props> = ({address, onEdit, onDelete}) => {
    const {t} = useLanguage();
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
                <Box mt={2} display="flex" justifyContent="flex-end">
                    <IconButton onClick={() => onEdit(address)} color="primary">
                        <EditIcon/>
                    </IconButton>
                    <IconButton onClick={() => onDelete(address.id)} color="error">
                        <DeleteIcon/>
                    </IconButton>
                </Box>
            </CardContent>
        </Card>
    );
};

export default AddressCard;
