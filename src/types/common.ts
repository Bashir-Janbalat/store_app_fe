export interface PagedResponseDTO<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
}

export const ApiType = {
    STORE: 'store',
    INVENTORY: 'inventory',
} as const;

export type ApiType = typeof ApiType[keyof typeof ApiType];
