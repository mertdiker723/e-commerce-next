import { fetchApi } from "@/utils/fetchUtils";
import { Province } from "@/models/province.model";
import { District } from "@/models/district.model";
import { Neighborhood } from "@/models/neighborhood.model";

class LocationService {
    // Get all provinces
    async getProvinces(): Promise<Province[]> {
        try {
            const { data } = await fetchApi<{ data: Province[] }>(
                `${process.env.NEXT_PUBLIC_BASE_URL}/location/provinces`
            );
            return data;
        } catch {
            return [];
        }
    }

    // Get all districts
    async getDistricts(provinceId: number): Promise<District[]> {
        try {
            const { data } = await fetchApi<{ data: District[] }>(
                `${process.env.NEXT_PUBLIC_BASE_URL}/location/districts/${provinceId}`
            );
            return data;
        } catch {
            return [];
        }
    }

    // Get all neighborhoods
    async getNeighborhoods(districtId: number): Promise<Neighborhood[]> {
        try {
            const { data } = await fetchApi<{ data: Neighborhood[] }>(
                `${process.env.NEXT_PUBLIC_BASE_URL}/location/neighborhoods/${districtId}`
            );
            return data;
        } catch {
            return [];
        }
    }
}

export const locationService = new LocationService();
