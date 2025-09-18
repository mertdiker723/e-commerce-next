// Models
import { Brand } from "./brand.model";
import { Category } from "./category.model";
import { Retailer } from "./retailer.model";

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

export interface Image {
    fileId: string;
    url: string;
    thumbnailUrl: string;
    name: string;
    size: number;
    filePath: string;
}

export interface ProductResponse {
    message: string;
    status: boolean;
    data: Product[];
    totalCount: number;
    totalPages: number;
}
