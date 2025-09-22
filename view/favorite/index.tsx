"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

// Common
import Filter from "@/common/Filter";
import Table from "@/common/Table";

// Hooks
import { useMergeState } from "@/hooks/useMergeState";

// Services
import { favoriteService } from "@/services/favorite.service";

// Models
import { Favorite } from "@/models/favorite.model";
import { Retailer } from "@/models/retailer.model";
import { Category } from "@/models/category.model";
import { Brand } from "@/models/brand.model";

// Components - using reusable product listing components
import { FirstColumn } from "@/components/product/listing/FirstColumn";
import { SecondColumn } from "@/components/product/listing/SecondColumn";
import { productService } from "@/services/product.service";

type FavoriteState = {
    favorites: Favorite[];
    retailers: Retailer[];
    errorMessage: string | null;
    isLoading: boolean;
    totalCount: number;
    totalPages: number;
    categories: Category[];
    brands: Brand[];
};

const FavoritePage = () => {
    const [state, setState] = useMergeState<FavoriteState>({
        favorites: [],
        errorMessage: null,
        isLoading: true,
        retailers: [],
        categories: [],
        brands: [],
        totalCount: 0,
        totalPages: 0,
    });

    const {
        favorites,
        errorMessage,
        isLoading,
        totalCount,
        totalPages,
        retailers,
        categories,
        brands,
    } = state || {};

    const searchParams = useSearchParams();

    const handleDelete = (productId: string) => {
        console.log(productId);
    };

    useEffect(() => {
        (async () => {
            try {
                const [retailersResponse, categoriesResponse, brandsResponse] = await Promise.all([
                    productService.getRetailers(),
                    productService.getCategories(),
                    productService.getBrands(),
                ]);

                setState({
                    retailers: retailersResponse,
                    categories: categoriesResponse,
                    brands: brandsResponse,
                });
            } catch (error) {
                setState({
                    errorMessage: error instanceof Error ? error.message : "Data loading error",
                });
            }
        })();
    }, [setState]);

    useEffect(() => {
        (async () => {
            setState({ isLoading: true });
            const { data, message, success, totalCount, totalPages } =
                await favoriteService.getFavorites(searchParams);
            if (!success) {
                setState({ errorMessage: message, isLoading: false });
                return;
            }

            setState({
                isLoading: false,
                favorites: data || [],
                totalCount: totalCount,
                totalPages: totalPages,
            });
        })();
    }, [searchParams, setState]);

    const filterValues = {
        retailers,
        categories,
        brands,
    };

    console.log(isLoading, favorites);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Favorite Products</h1>
                <p className="text-gray-600">Browse your favorite products</p>
                <p className="text-gray-400 text-sm">
                    You can add max 15 products to your favorite list!
                </p>
            </div>
            <div className="lg:flex lg:gap-6">
                <div className="lg:w-64 lg:flex-shrink-0 mb-6 lg:mb-0">
                    <Filter filterName="favorite" filterValues={filterValues} />
                </div>
                <div className="lg:flex-1">
                    <Table
                        items={favorites}
                        loading={isLoading}
                        errorMessage={errorMessage}
                        filteringItems={{ searchPlaceholder: "Search by favorite product name" }}
                        FirstColumn={(props: { item: Favorite }) => (
                            <FirstColumn
                                productData={props.item.product}
                                favoriteCreatedAt={props.item.createdAt}
                            />
                        )}
                        SecondColumn={(props: { item: Favorite }) => (
                            <SecondColumn
                                productData={props.item.product}
                                productId={props.item.product._id}
                                onDelete={() => handleDelete(props.item.product._id)}
                            />
                        )}
                        totalCount={totalCount}
                        totalPages={totalPages}
                    />
                </div>
            </div>
        </div>
    );
};

export default FavoritePage;
