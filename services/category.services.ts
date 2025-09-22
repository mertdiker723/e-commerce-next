import { Category } from "@/models/category.model";
import { fetchApi } from "@/utils/fetchUtils";

export class CategoryService {
    // Get all categories
    async getCategories(): Promise<Category[]> {
        try {
            const { data } = await fetchApi<{ data: Category[] }>(
                `${process.env.NEXT_PUBLIC_BASE_URL}/categories`
            );
            return data;
        } catch {
            return [];
        }
    }
}

export const categoryService = new CategoryService();
