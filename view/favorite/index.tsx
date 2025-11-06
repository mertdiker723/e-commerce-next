"use client";

import { useEffect, useCallback, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

// Common
import Filter from "@/common/Filter";
import Table from "@/common/Table";

// Hooks
import { useMergeState } from "@/hooks/useMergeState";

// Models
import { Favorite } from "@/models/favorite.model";
import { RetailerDropdown } from "@/models/retailer.model";
import { Category } from "@/models/category.model";
import { Brand } from "@/models/brand.model";
import { SubCategory } from "@/models/subCategory.model";

// Components
import { FirstColumn } from "@/components/product/listing/FirstColumn";
import { SecondColumn } from "@/components/product/listing/SecondColumn";

// Services
import { brandService } from "@/services/brand.services";
import { retailerService } from "@/services/retailer.services";
import { categoryService } from "@/services/category.services";
import { favoriteService } from "@/services/favorite.service";
import { subCategoryService } from "@/services/subCategory.services";

type FavoriteState = {
    favorites: Favorite[];
    retailers: RetailerDropdown[];
    errorMessage: string | null;
    isLoading: boolean;
    totalCount: number;
    totalPages: number;
    categories: Category[];
    brands: Brand[];
    subCategories: SubCategory[];
};

const FavoritePage = () => {
    const [state, setState] = useMergeState<FavoriteState>({
        favorites: [],
        errorMessage: null,
        isLoading: true,
        retailers: [],
        categories: [],
        brands: [],
        subCategories: [],
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
        subCategories,
    } = state || {};

    const searchParams = useSearchParams();

    const categoryId = useMemo(() => searchParams?.get("category"), [searchParams]);

    const handleDelete = async (favoriteId: string) => {
        const { success, message } = await favoriteService.deleteFavorite(favoriteId);
        if (!success) {
            toast.error(message || "Failed to delete favorite");
            return;
        }
        toast.success("Favorite removed successfully");
        await getFavorites();
    };

    const getFavorites = useCallback(async () => {
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
    }, [searchParams, setState]);

    useEffect(() => {
        (async () => {
            await Promise.all([
                retailerService.getRetailersDropdown(),
                categoryService.getCategoriesDropdown(),
            ])
                .then(([retailersResponse, categoriesResponse]) => {
                    if (!retailersResponse.success) {
                        toast.error(retailersResponse.message as string);
                    }
                    if (!categoriesResponse.success) {
                        toast.error(categoriesResponse.message as string);
                    }
                    setState({
                        retailers: retailersResponse.data || [],
                        categories: categoriesResponse.data || [],
                    });
                })
                .catch((error) => {
                    toast.error(
                        error instanceof Error ? error.message : "Failed to load filter data"
                    );
                });
        })();
    }, [setState]);

    useEffect(() => {
        (async () => {
            if (!categoryId) {
                setState({ subCategories: [] });
                return;
            }
            const { data, success, message } = await subCategoryService.getSubCategoriesDropdown(
                categoryId as string
            );
            if (!success) {
                toast.error(message as string);
                setState({ subCategories: [] });
                return;
            }
            setState({ subCategories: data });
        })();
    }, [categoryId, setState]);

    useEffect(() => {
        (async () => {
            if (!categoryId) {
                setState({ brands: [] });
                return;
            }
            const { data, success, message } = await brandService.getBrandsDropdown(
                categoryId as string
            );
            if (!success) {
                toast.error(message as string);
                setState({ brands: [] });
                return;
            }
            setState({ brands: data });
        })();
    }, [categoryId, setState]);

    useEffect(() => {
        getFavorites();
    }, [getFavorites]);

    const filterValues = {
        retailers,
        categories,
        brands,
        subCategories,
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Favorite Products</h1>
                <p className="text-gray-600">Browse your favorite products</p>
                <p className="text-gray-400 text-sm">
                    You can add max 10 products to your favorite list!
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
                                onDelete={() => handleDelete(props.item._id)}
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
