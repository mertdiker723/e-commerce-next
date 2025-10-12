// Utils
import { fetchApi } from "@/utils/fetchUtils";

// Models
import { ProvinceDropdownResponse } from "@/models/province.model";
import { DistrictsDropdownResponse } from "@/models/district.model";
import { NeighborhoodsDropdownResponse } from "@/models/neighborhood.model";

class LocationService {
    // Get all provinces
    async getProvinces(): Promise<ProvinceDropdownResponse> {
        try {
            const { data, success, message } = await fetchApi<ProvinceDropdownResponse>(
                `${process.env.NEXT_PUBLIC_BASE_URL}/location/provinces`
            );
            return { data, success, message };
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to get provinces";
            return { data: [], success: false, message };
        }
    }

    // Get all districts
    async getDistricts(provinceId: number): Promise<DistrictsDropdownResponse> {
        try {
            const { data, success, message } = await fetchApi<DistrictsDropdownResponse>(
                `${process.env.NEXT_PUBLIC_BASE_URL}/location/districts/${provinceId}`
            );
            return { data, success, message };
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to get districts";
            return { data: [], success: false, message };
        }
    }

    // Get all neighborhoods
    async getNeighborhoods(districtId: number): Promise<NeighborhoodsDropdownResponse> {
        try {
            const { data, success, message } = await fetchApi<NeighborhoodsDropdownResponse>(
                `${process.env.NEXT_PUBLIC_BASE_URL}/location/neighborhoods/${districtId}`
            );
            return { data, success, message };
        } catch (error) {
            const message =
                error instanceof Error ? error.message : "Failed to get neighborhoods";
            return { data: [], success: false, message };
        }
    }
}

export const locationService = new LocationService();
