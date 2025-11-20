import { useEffect } from "react";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

// Services
import { brandService } from "@/services/brand.services";

// Models
import { BrandDropdownResponse } from "@/models/brand.model";

export const BRANDS_QUERY_KEY = {
    byCategory: (categoryId: string) => ["brands", categoryId] as const,
};

export const useBrands = (categoryId: string | null) => {
    const { data, isLoading } = useQuery<BrandDropdownResponse>({
        queryKey: BRANDS_QUERY_KEY.byCategory(categoryId || ""),
        queryFn: () => brandService.getBrandsDropdown(categoryId as string),
        enabled: !!categoryId,
    });

    useEffect(() => {
        if (data && !data.success) {
            toast.error(data?.message as string);
        }
    }, [data]);

    return { data, isLoading };
};
