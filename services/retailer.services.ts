import { GetRetailerByIdResponse, RetailerDropdownResponse } from "@/models/retailer.model";
import { fetchApi } from "@/utils/fetchUtils";

export class RetailerService {
    async getRetailerById(retailerId: string): Promise<GetRetailerByIdResponse> {
        try {
            const { data, success, message } = await fetchApi<GetRetailerByIdResponse>(
                `${process.env.NEXT_PUBLIC_BASE_URL}/retailer/${retailerId}`
            );
            return { data, message, success };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Retailer fetch error";
            return { data: null, message: errorMessage, success: false };
        }
    }

    async getRetailersDropdown(): Promise<RetailerDropdownResponse> {
        try {
            const { data, success, message } = await fetchApi<RetailerDropdownResponse>(
                `${process.env.NEXT_PUBLIC_BASE_URL}/dropdown/retailers`
            );
            return { data, success, message };
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : "Dropdown retailers fetch error";
            return { data: [], success: false, message: errorMessage };
        }
    }
}

export const retailerService = new RetailerService();
