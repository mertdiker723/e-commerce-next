import { Retailer } from "@/models/retailer.model";
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
}

export const retailerService = new RetailerService();
