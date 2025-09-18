"use client";

import { useEffect } from "react";

// Common
import Filter from "@/common/Filter";
import Table from "@/common/Table";

// Hooks
import { useMergeState } from "@/hooks/useMergeState";

// Services
import { favoriteService } from "@/services/favorite.service";

// Models
import { Favorite } from "@/models/favorite.model";
import FirstColumn from "@/components/favorite/listing/FirstColumn";
import SecondColumn from "@/components/favorite/listing/SecondColumn";

type FavoriteState = {
    favorites: Favorite[];
    errorMessage: string | null;
    isLoading: boolean;
    totalCount: number;
    totalPages: number;
};

const FavoritePage = () => {
    const [state, setState] = useMergeState<FavoriteState>({
        favorites: [],
        errorMessage: null,
        isLoading: true,
        totalCount: 0,
        totalPages: 0,
    });

    const { favorites, errorMessage, isLoading, totalCount, totalPages } = state || {};

    useEffect(() => {
        (async () => {
            const { data, message, success, totalCount, totalPages } =
                await favoriteService.getFavorites();

            if (success) {
                setState({
                    favorites: data,
                    errorMessage: null,
                    isLoading: false,
                    totalCount,
                    totalPages,
                });
                return;
            }
            setState({ favorites: data, errorMessage: message, isLoading: false });
        })();
    }, [setState]);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Favorite Products</h1>
                <p className="text-gray-600">Browse your favorite products</p>
            </div>
            <div className="lg:flex lg:gap-6">
                <div className="lg:w-64 lg:flex-shrink-0 mb-6 lg:mb-0">
                    <Filter filterName="favorite" filterValues={[]} />
                </div>
                <div className="lg:flex-1">
                    <Table
                        items={favorites}
                        loading={isLoading}
                        errorMessage={errorMessage}
                        filteringItems={{ searchPlaceholder: "Search by favorite product name" }}
                        FirstColumn={FirstColumn}
                        SecondColumn={SecondColumn}
                        totalCount={totalCount}
                        totalPages={totalPages}
                    />
                </div>
            </div>
        </div>
    );
};

export default FavoritePage;
