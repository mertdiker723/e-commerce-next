import { fetchApi } from "@/utils/fetchUtils";
import { Brand } from "@/models/brand.model";

export class BrandService {
    // Get all brands
    async getBrands(): Promise<Brand[]> {
        try {
            const { data } = await fetchApi<{ data: Brand[] }>(
                `${process.env.NEXT_PUBLIC_BASE_URL}/brands`
            );
            return data;
        } catch {
            return [];
        }
    }
}

export const brandService = new BrandService();
