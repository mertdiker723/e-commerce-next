"use client";

import { useSearchParams } from "next/navigation";

// Common
import Filter from "@/common/Filter";
import Table from "@/common/Table";

// Hooks
import { useRetailers } from "@/lib/react-query/hooks/retailers/useRetailer";
import { useCategories } from "@/lib/react-query/hooks/category/useCategories";
import { useBrands } from "@/lib/react-query/hooks/brand/useBrands";
import { useSubCategories } from "@/lib/react-query/hooks/subCategory/useSubCategories";

// Models
import { Favorite } from "@/models/favorite.model";

// Components
import { FirstColumn } from "@/components/product/listing/FirstColumn";
import { SecondColumn } from "@/components/product/listing/SecondColumn";

// Services
import { useFavorites, useDeleteFavorite } from "@/lib/react-query/hooks/favorite/useFavorite";

const FavoritePage = () => {
    const searchParams = useSearchParams();
    const categoryId = searchParams?.get("category") as string;

    // React Query hooks
    const { data: retailersData } = useRetailers();
    const retailers = retailersData?.data || [];

    const { data: categoriesData } = useCategories();
    const categories = categoriesData?.data || [];

    const { data: brandsData } = useBrands(categoryId);
    const brands = brandsData?.data || [];

    const { data: subCategoriesData } = useSubCategories(categoryId);
    const subCategories = subCategoriesData?.data || [];

    const { data: favoritesData, isLoading } = useFavorites(searchParams);
    const favorites = favoritesData?.data || [];
    const errorMessage = favoritesData?.message || null;
    const totalCount = favoritesData?.totalCount || 0;
    const totalPages = favoritesData?.totalPages || 0;

    const { mutate: deleteFavorite, isPending } = useDeleteFavorite();

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
                                onDelete={() => deleteFavorite(props.item._id)}
                                isDeletingLoader={isPending}
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
