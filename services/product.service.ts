import { fetchApi } from "../utils/fetchUtils";

// Models
import { ProductResponse, Product } from "../models/product.model";

export class ProductService {
    // Get all products
    async getProducts(
        searchParams: URLSearchParams
    ): Promise<{ data: Product[]; error?: string; totalCount: number; totalPages: number }> {
        try {
            const queryString = searchParams.toString();
            const res = await fetchApi<ProductResponse>(
                `${process.env.NEXT_PUBLIC_BASE_URL}/products${
                    queryString ? `?${queryString}` : ""
                }`
            );
            return { data: res.data, totalCount: res.totalCount, totalPages: res.totalPages };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Products fetch error";
            return { data: [], error: errorMessage, totalCount: 0, totalPages: 0 };
        }
    }

    async getProductById(id: string): Promise<{ data: Product | null; error: string | null }> {
        try {
            const { data } = await fetchApi<{ data: Product | null; error: string | null }>(
                `${process.env.NEXT_PUBLIC_BASE_URL}/product/${id}`
            );
            return { data, error: null };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Product fetch error";
            return { data: null, error: errorMessage };
        }
    }
}

export const productService = new ProductService();
