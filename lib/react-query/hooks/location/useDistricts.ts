import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import toast from "react-hot-toast";

import { DistrictsDropdownResponse } from "@/models/district.model";
import { locationService } from "@/services/location.services";

export const DISTRICTS_QUERY_KEY = {
    byProvince: (provinceId: string) => ["districts", provinceId] as const,
};

export const useDistricts = (provinceId: string | null) => {
    const { data, isLoading } = useQuery<DistrictsDropdownResponse>({
        queryKey: DISTRICTS_QUERY_KEY.byProvince(provinceId as string),
        queryFn: () => locationService.getDistricts(Number(provinceId)),
        enabled: !!provinceId,
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
