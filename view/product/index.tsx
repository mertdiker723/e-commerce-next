"use client";

import { useEffect, useMemo } from "react";

// Common
import { ProductTable } from "@/common/ProductTable";
import Filter from "@/common/Filter";

// Types
import { Product } from "@/models/product.model";
import { Retailer } from "@/models/retailer.model";

// Hooks
import { useMergeState } from "@/hooks/useMergeState";

// Services
import { ProductService } from "@/services/product.service";
import { Category } from "@/models/category.model";
import { Brand } from "@/models/brand.model";

type ProductState = {
    products: Product[];
    retailers: Retailer[];
    categories: Category[];
    brands: Brand[];
};

const ProductPage = () => {
    const [state, setState] = useMergeState<ProductState>({
        products: [],
        retailers: [],
        categories: [],
        brands: [],
    });

    const { products = [], retailers = [], categories = [], brands = [] } = state || {};

    const productService = useMemo(() => new ProductService(), []);
    
    useEffect(() => {
        const loadAllData = async () => {
            try {
                const [productsData, retailersData, categoriesData, brandsData] = await Promise.all(
                    [
                        await productService.getProducts(),
                        await productService.getRetailers(),
                        await productService.getCategories(),
                        await productService.getBrands(),
                    ]
                );

                setState({
                    products: productsData,
                    retailers: retailersData,
                    categories: categoriesData,
                    brands: brandsData,
                });
            } catch (error) {
                console.error("Data loading error:", error);
            }
        };

        loadAllData();
    }, [productService, setState]);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Products</h1>
                <p className="text-gray-600">Browse products from local businesses</p>
            </div>

            <div className="lg:flex lg:gap-6">
                <div className="lg:w-64 lg:flex-shrink-0 mb-6 lg:mb-0">
                    <Filter retailers={retailers} categories={categories} brands={brands} />
                </div>

                <div className="lg:flex-1">
                    <ProductTable items={products} />
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
