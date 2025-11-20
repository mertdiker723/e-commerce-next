import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import toast from "react-hot-toast";

import { locationService } from "@/services/location.services";
import { ProvinceDropdownResponse } from "@/models/province.model";

export const PROVINCES_QUERY_KEY = ["provinces"];

export const useProvinces = () => {
    const { data, isLoading } = useQuery<ProvinceDropdownResponse>({
        queryKey: PROVINCES_QUERY_KEY,
        queryFn: () => locationService.getProvinces(),
        staleTime: Infinity,
        gcTime: 1000 * 60 * 60 * 6,
    });

    useEffect(() => {
        if (data && !data.success) {
            toast.error(data?.message as string);
        }
    }, [data]);

    return { data, isLoading };
};
