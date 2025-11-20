import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import toast from "react-hot-toast";

// Services
import { subCategoryService } from "@/services/subCategory.services";

// Models
import { SubCategoryDropdownResponse } from "@/models/subCategory.model";

export const SUBCATEGORIES_QUERY_KEY = {
    all: ["subcategories"] as const,
    byCategory: (categoryId: string) => ["subcategories", categoryId] as const,
};

export const useSubCategories = (categoryId: string) => {
    const { data, isLoading } = useQuery<SubCategoryDropdownResponse>({
        queryKey: SUBCATEGORIES_QUERY_KEY.byCategory(categoryId),
        queryFn: () => subCategoryService.getSubCategoriesDropdown(categoryId),
        enabled: !!categoryId,
    });

    useEffect(() => {
        if (data && !data.success) {
            toast.error(data?.message as string);
        }
    }, [data]);

    return { data, isLoading };
};
