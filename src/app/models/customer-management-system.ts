export interface Customer {
    customerId?: number;
    customerName?: string;
    revenue?: number;
}

export interface CustmerSearch {
    retailerId?: number;
    page: number;
    size: number;
    branchId?: number;
    startDate?: string;
    endDate?: string;
}

export interface STATUS {
    label?: string;
    value?: number
}