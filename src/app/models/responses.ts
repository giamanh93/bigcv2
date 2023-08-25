export interface Responses {
    success?: boolean;
    code?: string;
    data?: any;
    pageNumber?: number;
    pageSize?: number;
    totalElements?: number;
    last: boolean,
    first: boolean,
    totalPages: number
}