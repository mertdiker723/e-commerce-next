export interface Brand {
    _id: string;
    name: string;
}

export interface BrandDropdownResponse {
    data: Brand[];
    success: boolean;
    message?: string;
}