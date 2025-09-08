type SkeletonRowProps = {
    rowCount?: number;
};

const SkeletonRow = ({ rowCount = 5 }: SkeletonRowProps) => {
    return Array.from({ length: rowCount }).map((_, index) => (
        <div className="flex justify-between gap-x-4 p-6 animate-pulse" key={index}>
            <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
            <div className="flex-shrink-0">
                <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-16"></div>
            </div>
        </div>
    ));
};

export default SkeletonRow;
