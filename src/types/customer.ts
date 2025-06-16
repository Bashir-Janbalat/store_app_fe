export type AddressType = 'BILLING' | 'SHIPPING';

export type Address = {
    id: number;
    createdAt: string;
    updatedAt: string;
    customerId: number;
    addressLine: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    addressType: AddressType;
    defaultAddress: boolean;
};
