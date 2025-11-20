import { useEffect } from "react";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

// Services
import { categoryService } from "@/services/category.services";
import { CategoryDropdownResponse } from "@/models/category.model";

export const CATEGORIES_QUERY_KEY = ["categories"];

export const useCategories = () => {
    const { data, isLoading } = useQuery<CategoryDropdownResponse>({
        queryKey: CATEGORIES_QUERY_KEY,
        queryFn: () => categoryService.getCategoriesDropdown(),
    });

    useEffect(() => {
        if (data && !data.success) {
            toast.error(data?.message as string);
        }
    }, [data]);

    return { data, isLoading };
};
