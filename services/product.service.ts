import { fetchApi } from "../utils/fetchUtils";

// Models
import { ProductResponse, Product } from "../models/product.model";
import { Retailer } from "../models/retailer.model";
import { Brand } from "../models/brand.model";
import { Category } from "../models/category.model";
import { Province } from "@/models/province.model";
import { District } from "@/models/district.model";
import { Neighborhood } from "@/models/neighborhood.model";

export class ProductService {
    // Get all products
    async getProducts(
        searchParams: URLSearchParams
    ): Promise<{ data: Product[]; error?: string; totalCount: number; totalPages: number }> {
        try {
            const res = await fetchApi<ProductResponse>(
                `${process.env.NEXT_PUBLIC_BASE_URL}/products?${searchParams.toString()}`
            );
            return { data: res.data, totalCount: res.totalCount, totalPages: res.totalPages };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Products fetch error";
            return { data: [], error: errorMessage, totalCount: 0, totalPages: 0 };
        }
    }

    async getProductById(
        id: string
    ): Promise<{ data: Product | null; error: string | null }> {
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

    // Get all retailers
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

    // Get all provinces
    async getProvinces(): Promise<Province[]> {
        try {
            const { data } = await fetchApi<{ data: Province[] }>(
                `${process.env.NEXT_PUBLIC_BASE_URL}/location/provinces`
            );
            return data;
        } catch {
            return [];
        }
    }

    // Get all districts
    async getDistricts(provinceId: number): Promise<District[]> {
        try {
            const { data } = await fetchApi<{ data: District[] }>(
                `${process.env.NEXT_PUBLIC_BASE_URL}/location/districts/${provinceId}`
            );
            return data;
        } catch {
            return [];
        }
    }

    // Get all neighborhoods
    async getNeighborhoods(districtId: number): Promise<Neighborhood[]> {
        try {
            const { data } = await fetchApi<{ data: Neighborhood[] }>(
                `${process.env.NEXT_PUBLIC_BASE_URL}/location/neighborhoods/${districtId}`
            );
            return data;
        } catch {
            return [];
        }
    }
}

export const productService = new ProductService();
