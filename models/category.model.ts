export interface Category {
    _id: string;
    name: string;
}

export interface CategoryDropdownResponse {
    data: Category[];
    success: boolean;
    message?: string;
}
