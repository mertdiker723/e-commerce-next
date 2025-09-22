import { FavoriteResponse, ListFavoritesResponse } from "@/models/favorite.model";
import { fetchApi } from "@/utils/fetchUtils";

class FavoriteService {
    async getFavorites(searchParams: URLSearchParams): Promise<ListFavoritesResponse> {
        try {
            const queryString = searchParams.toString();
            const { data, message, success, totalCount, totalPages } =
                await fetchApi<ListFavoritesResponse>(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/favorites${
                        queryString ? `?${queryString}` : ""
                    }`
                );

            return { data, message, success, totalCount, totalPages };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Favorites fetch error";
            return {
                data: [],
                message: errorMessage,
                success: false,
            };
        }
    }
    async addFavorite(productId: string): Promise<FavoriteResponse> {
        try {
            const { data, message, success } = await fetchApi<FavoriteResponse>(
                `${process.env.NEXT_PUBLIC_BASE_URL}/favorite`,
                {
                    method: "POST",
                    body: { productId },
                }
            );

            return {
                data,
                message,
                success,
            };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Favorite add error";

            return { data: null, message: errorMessage, success: false };
        }
    }

    async deleteFavorite(
        favoriteId: string
    ): Promise<FavoriteResponse> {
        try {
            const { data, message, success } = await fetchApi<FavoriteResponse>(
                `${process.env.NEXT_PUBLIC_BASE_URL}/favorite/${favoriteId}`, 
                { method: "DELETE" }
            );

            return { data, message, success };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Favorite delete error";
            return { data: null, message: errorMessage, success: false };
        }
    }
}

export const favoriteService = new FavoriteService();
