import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import toast from "react-hot-toast";

// Services
import { retailerService } from "@/services/retailer.services";

// Models
import { RetailerDropdownResponse } from "@/models/retailer.model";

export const RETAILERS_QUERY_KEY = ["retailers"];

export const useRetailers = () => {
    const { data, isLoading } = useQuery<RetailerDropdownResponse>({
        queryKey: RETAILERS_QUERY_KEY,
        queryFn: () => retailerService.getRetailersDropdown(),
    });
    useEffect(() => {
        if (data && !data.success) {
            toast.error(data?.message as string);
        }
    }, [data]);

    return { data, isLoading };
};
