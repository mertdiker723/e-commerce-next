import { fetchApi } from "../utils/fetchUtils";
import { ProductResponse, Product } from "../models/product.model";
import { Retailer } from "../models/retailer.model";
import { Brand } from "../models/brand.model";
import { Category } from "../models/category.model";

export class ProductService {
    // Get all products
    async getProducts(): Promise<Product[]> {
        try {
            const res = await fetchApi<ProductResponse>(
                `${process.env.NEXT_PUBLIC_BASE_URL}/products`
            );
            return res.data;
        } catch (error) {
            console.error("Products fetch error:", error);
            return [];
        }
    }

    // Get all retailers
    async getRetailers(): Promise<Retailer[]> {
        try {
            const { data } = await fetchApi<{ data: Retailer[] }>(
                `${process.env.NEXT_PUBLIC_BASE_URL}/retailers`
            );
            return data;
        } catch (error) {
            console.error("Retailers fetch error:", error);
            return [];
        }
    }

    // Get all categories
    async getCategories(): Promise<Category[]> {
        try {
            const { data } = await fetchApi<{ data: Category[] }>(
                `${process.env.NEXT_PUBLIC_BASE_URL}/categories`
            );
            return data;
        } catch (error) {
            console.error("Categories fetch error:", error);
            return [];
        }
    }

    // Get all brands
    async getBrands(): Promise<Brand[]> {
        try {
            const { data } = await fetchApi<{ data: Brand[] }>(
                `${process.env.NEXT_PUBLIC_BASE_URL}/brands`
            );
            return data;
        } catch (error) {
            console.error("Brands fetch error:", error);
            return [];
        }
    }
}

export const productService = new ProductService();