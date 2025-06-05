export interface ImageDTO {
    id?: number;
    imageUrl: string;
    altText?: string;
}

export interface StockDTO {
    id?: number;
    quantity: number;
}

export interface ProductAttributeDTO {
    attributeID?: number;
    attributeName: string;
    attributeValue: string;
}

export interface ProductDTO {
    id?: number;
    name: string;
    sku: string;
    description?: string;
    sellingPrice?: number;
    categoryID: number;
    categoryName?: string;
    brandID: number;
    brandName?: string;
    supplierID?: number;
    supplierName?: string;
    supplierContactEmail?: string;
    images: ImageDTO[];
    stocks: StockDTO[];
    productAttributes: ProductAttributeDTO[];
}
