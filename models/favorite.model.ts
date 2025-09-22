import { Product } from "./product.model";

export interface Favorite {
    _id: string;
    userId: string;
    product: Product;
    createdAt: Date;
}

export interface ListFavoritesResponse {
    data: Favorite[];
    message: string | null;
    success: boolean;
    totalCount?: number;
    totalPages?: number;
}

export interface FavoriteResponse {
    data: { _id: string } | null;
    message: string | null;
    success: boolean;
}
