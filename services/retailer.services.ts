import { Retailer, GetRetailerByIdResponse } from "@/models/retailer.model";
import { fetchApi } from "@/utils/fetchUtils";

export class RetailerService {
    async getRetailers(): Promise<Retailer[]> {
        try {
            const { data } = await fetchApi<{ data: Retailer[] }>(
                `${process.env.NEXT_PUBLIC_BASE_URL}/retailers`
            );
            return data;
        } catch {
            return [];
        }
    }

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
}

export const retailerService = new RetailerService();
