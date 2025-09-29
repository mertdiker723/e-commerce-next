// Models
import { Brand } from "./brand.model";
import { Category } from "./category.model";
import { Retailer } from "./retailer.model";
import { Image } from "./shared/index.model";

export interface Product {
    image?: Image | null;
    _id: string;
    name: string;
    description: string | null;
    price: number;
    stock: number;
    category: Category;
    brand: Brand;
    status: boolean;
    createdBy: Retailer;
    createdAt: string;
    updatedAt: string;
}

export interface ProductResponse {
    message?: string;
    status: boolean;
    data: Product[];
    totalCount: number;
    totalPages: number;
}

export interface ProductRetailerResponse {
    message?: string;
    success: boolean;
    data: Product[];
    totalCount: number;
    totalPages: number;
}

export interface ProductByIdResponse {
    data: Product | null;
    isFavorited: boolean;
    status: boolean;
    message: string | null;
    statusCode?: number | null;
}
