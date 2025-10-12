export interface Neighborhood {
    _id: number;
    name: string;
}

export interface NeighborhoodsDropdownResponse {
    data: Neighborhood[];
    success: boolean;
    message?: string;
}