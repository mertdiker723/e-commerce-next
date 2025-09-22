import { fetchApi } from "../utils/fetchUtils";

// Models
import { ProductResponse, ProductByIdResponse } from "../models/product.model";

export class ProductService {
    // Get all products
    async getProducts(searchParams: URLSearchParams): Promise<ProductResponse> {
        try {
            const queryString = searchParams.toString();
            const res = await fetchApi<ProductResponse>(
                `${process.env.NEXT_PUBLIC_BASE_URL}/products${
                    queryString ? `?${queryString}` : ""
                }`
            );
            return {
                data: res.data,
                totalCount: res.totalCount,
                totalPages: res.totalPages,
                status: res.status,
            };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Products fetch error";
            return { data: [], message: errorMessage, totalCount: 0, totalPages: 0, status: false };
        }
    }

    async getProductById(id: string): Promise<ProductByIdResponse> {
        try {
            const { data, isFavorited, status } = await fetchApi<ProductByIdResponse>(
                `${process.env.NEXT_PUBLIC_BASE_URL}/product/${id}`
            );
            return { data, message: null, isFavorited, status };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Product fetch error";
            return { data: null, message: errorMessage, isFavorited: false, status: false };
        }
    }
}

export const productService = new ProductService();
