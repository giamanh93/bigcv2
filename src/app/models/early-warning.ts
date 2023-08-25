export interface EarlyWarning {
    id?: string;
    code?: string;
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
    inventoryStatus?: string;
    category?: string;
    image?: string;
    rating?: number;
}

export interface ProductWarning {
    productId?: number;
    productName?: string;
    barCode?: string;
    unit?: string;
    branchId?: number;
    branchName?: string;
    buyPrice?: number;
    sellPrice?: number;
    realMargin?: number;
    standardMargin?: number;
}

export interface Branch {
    branchId?: number;
    branchName?: string;
    contactNumber?: string;
    address?: string
}

export interface SearchEarlyWarning {
    retailerId?: number;
    search?: string;
    page: number;
    size: number;
    branchId?: number;
}

export interface CountRecord {
    totalRecord: number;
    currentRecordStart: number;
    currentRecordEnd: number;
}