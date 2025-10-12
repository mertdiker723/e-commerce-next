export interface Province {
    _id: number;
    name: string;
}

export interface ProvinceDropdownResponse {
    data: Province[];
    success: boolean;
    message?: string;
}
