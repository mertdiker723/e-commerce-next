const RetailerSkeleton = () => {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-10">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
                    <div className="bg-gray-100 rounded-lg animate-pulse overflow-hidden flex items-center justify-center h-full" />

                    <div className="space-y-6">
                        <div>
                            {/* RETAILER badge + icon */}
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
                                <div className="h-6 bg-gray-200 rounded-full w-20 animate-pulse"></div>
                            </div>

                            {/* Business Name */}
                            <div className="h-8 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>

                            {/* Owner info */}
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                                <div className="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
                                <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                            </div>
                        </div>

                        {/* RetailerContact Skeleton */}
                        <div className="space-y-4">
                            {/* Contact Information Title */}
                            <div className="h-6 bg-gray-200 rounded w-40 animate-pulse border-b border-gray-200 pb-2"></div>

                            <div className="space-y-3">
                                {/* Email */}
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
                                    <div>
                                        <div className="h-3 bg-gray-200 rounded w-12 mb-1 animate-pulse"></div>
                                        <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
                                    <div>
                                        <div className="h-3 bg-gray-200 rounded w-12 mb-1 animate-pulse"></div>
                                        <div className="h-4 bg-gray-200 rounded w-28 animate-pulse"></div>
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse flex-shrink-0"></div>
                                    <div className="flex-1 min-w-0">
                                        <div className="h-4 bg-gray-200 rounded w-16 mb-3 animate-pulse"></div>

                                        {/* Location hierarchy */}
                                        <div className="space-y-2 mb-4">
                                            <div className="flex items-center gap-2">
                                                <div className="h-5 bg-gray-200 rounded w-16 animate-pulse"></div>
                                                <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="h-5 bg-gray-200 rounded w-14 animate-pulse"></div>
                                                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="h-5 bg-gray-200 rounded w-20 animate-pulse"></div>
                                                <div className="h-4 bg-gray-200 rounded w-28 animate-pulse"></div>
                                            </div>
                                        </div>

                                        {/* Detailed Address */}
                                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                                                <div className="h-4 bg-gray-200 rounded w-28 animate-pulse"></div>
                                            </div>
                                            <div className="h-3 bg-gray-200 rounded w-full mb-1 animate-pulse"></div>
                                            <div className="h-3 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RetailerSkeleton;
