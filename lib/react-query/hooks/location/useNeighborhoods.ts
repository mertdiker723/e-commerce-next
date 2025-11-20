import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import toast from "react-hot-toast";

// Models
import { NeighborhoodsDropdownResponse } from "@/models/neighborhood.model";

// Services
import { locationService } from "@/services/location.services";

export const NEIGHBORHOODS_QUERY_KEY = {
    byDistrict: (districtId: string) => ["neighborhoods", districtId] as const,
};

export const useNeighborhoods = (provinceId: string | null, districtId: string | null) => {
    const { data, isLoading } = useQuery<NeighborhoodsDropdownResponse>({
        queryKey: NEIGHBORHOODS_QUERY_KEY.byDistrict(districtId as string),
        queryFn: () => locationService.getNeighborhoods(Number(districtId)),
        enabled: !!districtId && !!provinceId,
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
