import { fetchApi } from "@/utils/fetchUtils";
import { BrandDropdownResponse } from "@/models/brand.model";

export class BrandService {
    async getBrandsDropdown(): Promise<BrandDropdownResponse> {
        try {
            const { data, success, message } = await fetchApi<BrandDropdownResponse>(
                `${process.env.NEXT_PUBLIC_BASE_URL}/dropdown/brands`
            );
            return { data, success, message };
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : "Brands dropdown fetch error";
            return { data: [], success: false, message: errorMessage };
        }
    }
}

export const brandService = new BrandService();
