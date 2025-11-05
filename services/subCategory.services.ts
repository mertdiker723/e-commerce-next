// Models
import { SubCategoryDropdownResponse } from "@/models/subCategory.model";

// Utils
import { fetchApi } from "@/utils/fetchUtils";

export class SubCategoryService {
    async getSubCategoriesDropdown(categoryId: string): Promise<SubCategoryDropdownResponse> {
        try {
            const { data, success, message } = await fetchApi<SubCategoryDropdownResponse>(
                `${process.env.NEXT_PUBLIC_BASE_URL}/dropdown/subcategories/${categoryId}`
            );
            return { data, success, message };
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : "Subcategories dropdown fetch error";
            return { data: [], success: false, message: errorMessage };
        }
    }
}

export const subCategoryService = new SubCategoryService();
