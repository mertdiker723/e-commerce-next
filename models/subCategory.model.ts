export interface SubCategory {
    _id: string;
    name: string;
}

export interface SubCategoryDropdownResponse {
    data: SubCategory[];
    success: boolean;
    message?: string;
}
