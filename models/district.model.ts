export interface District {
    _id: number;
    name: string;
}

export interface DistrictsDropdownResponse {
    data: District[];
    success: boolean;
    message?: string;
}
