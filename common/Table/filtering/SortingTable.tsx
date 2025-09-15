import { useState, useMemo, useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// Common
import Input from "@/common/Input/input";
import SelectBox from "@/common/SelectBox";

// Helpers
import { debounce } from "@/helpers/helperMethods";

const sortOptions: { label: string; value: string }[] = [
    { label: "Newest", value: "updatedDate_desc" },
    { label: "Oldest", value: "updatedDate_asc" },
    { label: "Price (Low → High)", value: "price_asc" },
    { label: "Price (High → Low)", value: "price_desc" },
];

type SortingProps = {
    filteringItems?: {
        searchPlaceholder?: string;
    };
};

const Sorting = ({ filteringItems }: SortingProps) => {
    const searchParams = useSearchParams();
    const [searchValue, setSearchValue] = useState("");

    const router = useRouter();

    useEffect(() => {
        const urlSearchValue = searchParams.get("search") || "";
        setSearchValue(urlSearchValue);
    }, [searchParams]);

    const handleFilter = useCallback(
        (filters: { sort?: string; search?: string }) => {
            const params = new URLSearchParams(searchParams);

            if (filters.sort !== undefined) {
                if (filters.sort) {
                    params.set("sort", filters.sort);
                } else {
                    params.delete("sort");
                }
            }

            if (filters.search !== undefined) {
                if (filters.search) {
                    params.set("search", filters.search);
                } else {
                    params.delete("search");
                }
            }

            router.push(`?${params.toString()}`);
        },
        [router, searchParams]
    );

    const debouncedSearch = useMemo(
        () =>
            debounce((...args: unknown[]) => {
                const searchTerm = args[0] as string;

                handleFilter({ search: searchTerm });
            }, 1000),
        [handleFilter]
    );

    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 m-6 mb-0">
            <div className="mb-3 lg:mb-4 flex">
                <Input
                    placeholder={filteringItems?.searchPlaceholder}
                    type="text"
                    id="search"
                    name="search"
                    value={searchValue}
                    onChange={(e) => {
                        setSearchValue(e.target.value);
                        debouncedSearch(e.target.value);
                    }}
                />
            </div>
            <div className="mb-3 lg:mb-4">
                <SelectBox
                    placeholder="Choose sorting"
                    options={sortOptions}
                    value={searchParams.get("sort") || ""}
                    onChange={(value) => handleFilter({ sort: value as string })}
                />
            </div>
        </div>
    );
};

export default Sorting;
