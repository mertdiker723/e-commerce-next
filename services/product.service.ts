import { fetchApi, fetchApiSSR } from "../utils/fetchUtils";

// Models
import {
    ProductResponse,
    ProductByIdResponse,
    ProductRetailerResponse,
} from "../models/product.model";

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

    async getProductById(id: string, cookiesString?: string): Promise<ProductByIdResponse> {
        try {
            const headers: Record<string, string> = {
                Cookie: cookiesString || "",
            };

            const { data, isFavorited, status } = await fetchApiSSR<ProductByIdResponse>(
                `${process.env.NEXT_PUBLIC_BASE_URL}/product/${id}`,
                {
                    headers,
                }
            );

            return { data, message: null, isFavorited, status };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Product fetch error";

            return { data: null, message: errorMessage, isFavorited: false, status: false };
        }
    }

    async getProductsByRetailerId(
        retailerId: string,
        searchParams: URLSearchParams
    ): Promise<ProductRetailerResponse> {
        try {
            const queryString = searchParams.toString();
            const res = await fetchApi<ProductRetailerResponse>(
                `${process.env.NEXT_PUBLIC_BASE_URL}/products/retailer/${retailerId}${
                    queryString ? `?${queryString}` : ""
                }`
            );
            return {
                data: res.data,
                totalCount: res.totalCount,
                totalPages: res.totalPages,
                success: res.success,
            };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Products fetch error";
            return {
                data: [],
                message: errorMessage || "",
                totalCount: 0,
                totalPages: 0,
                success: false,
            };
        }
    }
}

export const productService = new ProductService();
