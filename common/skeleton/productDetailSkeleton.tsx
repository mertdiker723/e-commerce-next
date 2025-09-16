const ProductDetailSkeleton = () => {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-10">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
                    <div className="space-y-4">
                        <div className="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <div className="h-6 bg-gray-200 rounded-full w-16 mb-2 animate-pulse"></div>

                            <div className="flex justify-between items-center space-x-2 mb-2 mt-1">
                                <div className="h-9 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                            </div>

                            <div className="flex items-center space-x-4 mt-3">
                                <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                                <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="h-4 bg-gray-200 rounded w-20 mb-2 animate-pulse"></div>
                            <div className="h-3 bg-gray-200 rounded w-full mb-1 animate-pulse"></div>
                            <div className="h-3 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                        </div>

                        <div className="border-t border-b border-gray-200 py-4">
                            <div className="flex justify-between items-center space-x-3">
                                <div className="h-8 bg-gray-200 rounded w-32 animate-pulse"></div>
                                <div className="h-12 bg-gray-200 rounded w-12 animate-pulse"></div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-gray-200 rounded-full animate-pulse"></div>
                            <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="h-4 bg-gray-200 rounded w-28 mb-3 animate-pulse"></div>
                            <div className="space-y-2">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="flex justify-between">
                                        <div className="h-3 bg-gray-200 rounded w-16 animate-pulse"></div>
                                        <div className="h-3 bg-gray-200 rounded w-20 animate-pulse"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailSkeleton;
