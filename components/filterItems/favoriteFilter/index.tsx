type FavoriteFilterProps = {
    filterValues: any; // eslint-disable-line @typescript-eslint/no-explicit-any
    handleFilter: (entries: Record<string, string | null>) => void;
};

const FavoriteFilter = ({ filterValues, handleFilter }: FavoriteFilterProps) => {
    return <div>FavoriteFilter</div>;
};

export default FavoriteFilter;
