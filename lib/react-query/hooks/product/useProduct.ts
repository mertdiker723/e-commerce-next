import { useEffect } from "react";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

// Services
import { productService } from "@/services/product.service";

// Models
import { ProductResponse } from "@/models/product.model";

export const PRODUCTS_QUERY_KEY = {
    withParams: (searchParams: URLSearchParams) => ["products", searchParams.toString()] as const,
};

export const useProducts = (searchParams: URLSearchParams) => {
    const { data, isLoading } = useQuery<ProductResponse>({
        queryKey: PRODUCTS_QUERY_KEY.withParams(searchParams),
        queryFn: () => productService.getProducts(searchParams),
    });

    useEffect(() => {
        if (data && !data.status) {
            toast.error(data?.message as string);
        }
    }, [data]);

    return { data, isLoading };
};
