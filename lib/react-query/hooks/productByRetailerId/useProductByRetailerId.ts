import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import toast from "react-hot-toast";

// Services
import { productService } from "@/services/product.service";

// Models
import { ProductRetailerResponse } from "@/models/product.model";

export const PRODUCT_BY_RETAILER_ID_QUERY_KEY = {
    byRetailerId: (retailerId: string, searchParams: string) =>
        ["productByRetailerId", retailerId, searchParams] as const,
};

export const useProductByRetailerId = (retailerId: string, searchParams: URLSearchParams) => {
    const searchParamsString = searchParams.toString();

    const { data, isLoading } = useQuery<ProductRetailerResponse>({
        queryKey: PRODUCT_BY_RETAILER_ID_QUERY_KEY.byRetailerId(retailerId, searchParamsString),
        queryFn: () => productService.getProductsByRetailerId(retailerId, searchParams),
        enabled: !!retailerId,
    });

    useEffect(() => {
        if (data && !data.success) {
            toast.error(data?.message as string);
        }
    }, [data]);

    return { data, isLoading };
};
