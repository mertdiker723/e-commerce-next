import { useEffect } from "react";
import toast from "react-hot-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Services
import { favoriteService } from "@/services/favorite.service";

// Models
import { ListFavoritesResponse } from "@/models/favorite.model";

export const FAVORITES_QUERY_KEY = {
    withParams: (searchParams: URLSearchParams) => ["favorites", searchParams.toString()] as const,
};

export const useFavorites = (searchParams: URLSearchParams) => {
    const { data, isLoading } = useQuery<ListFavoritesResponse>({
        queryKey: FAVORITES_QUERY_KEY.withParams(searchParams),
        queryFn: () => favoriteService.getFavorites(searchParams),
    });

    useEffect(() => {
        if (data && !data.success) {
            toast.error(data?.message as string);
        }
    }, [data]);

    return { data, isLoading };
};

export const useDeleteFavorite = () => {
    const queryClient = useQueryClient();

    const { data, mutate, isPending } = useMutation({
        mutationFn: (favoriteId: string) => favoriteService.deleteFavorite(favoriteId),
        onSuccess: (data) => {
            if (data.success) {
                queryClient.invalidateQueries({ queryKey: ["favorites"] });
                toast.success("Favorite removed successfully");
            } else {
                toast.error(data.message || "Failed to delete favorite");
            }
        },
        onError: (error: Error) => {
            toast.error(error.message || "An error occurred while deleting favorite");
        },
    });

    return { data, mutate, isPending };
};
