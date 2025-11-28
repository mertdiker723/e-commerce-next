import { useEffect } from "react";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

// Services
import { retailerService } from "@/services/retailer.services";

// Models
import { GetRetailerByIdResponse } from "@/models/retailer.model";

export const RETAILER_BY_ID_QUERY_KEY = {
    byRetailerId: (retailerId: string) => ["retailerById", retailerId] as const,
};

export const useRetailerById = (retailerId: string) => {
    const { data, isLoading } = useQuery<GetRetailerByIdResponse>({
        queryKey: RETAILER_BY_ID_QUERY_KEY.byRetailerId(retailerId),
        queryFn: () => retailerService.getRetailerById(retailerId),
        enabled: !!retailerId,
    });

    useEffect(() => {
        if (data && !data.success) {
            toast.error(data?.message as string);
        }
    }, [data]);

    return { data, isLoading };
};
