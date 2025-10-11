import { CategoryDropdownResponse } from "@/models/category.model";
import { fetchApi } from "@/utils/fetchUtils";

export class CategoryService {
    async getCategoriesDropdown(): Promise<CategoryDropdownResponse> {
        try {
            const { data, success, message } = await fetchApi<CategoryDropdownResponse>(
                `${process.env.NEXT_PUBLIC_BASE_URL}/dropdown/categories`
            );
            return { data, success, message };
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : "Categories dropdown fetch error";
            return { data: [], success: false, message: errorMessage };
        }
    }
}

export const categoryService = new CategoryService();
