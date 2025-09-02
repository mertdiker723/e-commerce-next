import { District } from "./district.model";
import { Neighborhood } from "./neighborhood.model";
import { Province } from "./province.model";

export interface Retailer {
    _id: string;
    businessName: string;
    name: string;
    surname: string;
    email: string;
    phoneNumber: string;
    openAddress: string;
    province: Province;
    district: District;
    neighborhood: Neighborhood;
}
