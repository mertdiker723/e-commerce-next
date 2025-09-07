import { fetchApi } from "../utils/fetchUtils";
import { ProductResponse, Product } from "../models/product.model";
import { Retailer } from "../models/retailer.model";
import { Brand } from "../models/brand.model";
import { Category } from "../models/category.model";
import { Province } from "@/models/province.model";
import { District } from "@/models/district.model";
import { Neighborhood } from "@/models/neighborhood.model";

export class ProductService {
    // Get all products
    async getProducts(searchParams: URLSearchParams): Promise<Product[]> {
        try {
            const res = await fetchApi<ProductResponse>(
                `${process.env.NEXT_PUBLIC_BASE_URL}/products?${searchParams.toString()}`
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

    async getProvinces(): Promise<Province[]> {
        try {
            const { data } = await fetchApi<{ data: Province[] }>(
                `${process.env.NEXT_PUBLIC_BASE_URL}/location/provinces`
            );
            return data;
        } catch (error) {
            console.error("Provinces fetch error:", error);
            return [];
        }
    }

    async getDistricts(provinceId: number): Promise<District[]> {
        try {
            const { data } = await fetchApi<{ data: District[] }>(
                `${process.env.NEXT_PUBLIC_BASE_URL}/location/districts/${provinceId}`
            );
            return data;
        } catch (error) {
            console.error("Districts fetch error:", error);
            return [];
        }
    }

    async getNeighborhoods(districtId: number): Promise<Neighborhood[]> {
        try {
            const { data } = await fetchApi<{ data: Neighborhood[] }>(
                `${process.env.NEXT_PUBLIC_BASE_URL}/location/neighborhoods/${districtId}`
            );
            return data;
        } catch (error) {
            console.error("Neighborhoods fetch error:", error);
            return [];
        }
    }   
}

export const productService = new ProductService();
