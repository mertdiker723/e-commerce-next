import { District } from "./district.model";
import { Neighborhood } from "./neighborhood.model";
import { Province } from "./province.model";
import { Image } from "./shared/index.model";

export interface Retailer {
    _id: string;
    businessName: string;
    name: string;
    surname: string;
    email: string;
    phoneNumber: string;
    openAddress: string;
    image?: Image | null;
    province: Province;
    district: District;
    neighborhood: Neighborhood;
}

export interface GetRetailerByIdResponse {
    data: Retailer | null;
    success: boolean;
    message?: string;
}

export interface RetailerDropdown {
    _id: string;
    businessName: string;
}

export interface RetailerDropdownResponse {
    data: RetailerDropdown[];
    success: boolean;
    message?: string;
}
