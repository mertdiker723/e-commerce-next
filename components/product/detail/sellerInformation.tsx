import Link from "next/link";

type SellerInformationProps = {
    businessName?: string;
    retailerName?: string;
    retailerId?: string;
    surname?: string;
    email?: string;
    phoneNumber?: string;
    provinceName?: string;
    districtName?: string;
    neighborhoodName?: string;
    openAddress?: string;
};

const SellerInformation = ({
    businessName,
    retailerName,
    retailerId,
    surname,
    email,
    phoneNumber,
    provinceName,
    districtName,
    neighborhoodName,
    openAddress,
}: SellerInformationProps) => {
    return (
        <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Seller Information</h3>
            <div className="space-y-2">
                <div className="flex justify-between">
                    <span className="text-xs text-gray-600">Business:</span>
                    <Link
                        href={`/retailer/${retailerId}`}
                        className="text-xs font-medium text-blue-900 hover:text-blue-600 hover:underline transition-all duration-200"
                    >
                        {businessName || "-"}
                    </Link>
                </div>
                <div className="flex justify-between">
                    <span className="text-xs text-gray-600">Contact:</span>
                    <span className="text-xs font-medium text-gray-900">
                        {retailerName} {surname}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="text-xs text-gray-600">Email:</span>
                    <span className="text-xs font-medium text-blue-600">{email || "-"}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-xs text-gray-600">Phone:</span>
                    <span className="text-xs font-medium text-blue-600">{phoneNumber || "-"}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-xs text-gray-600">Location:</span>
                    <span className="text-xs font-medium text-gray-900">
                        {provinceName || "-"}, {districtName || "-"}, {neighborhoodName || "-"}
                    </span>
                </div>
                {openAddress && (
                    <div className="flex justify-between">
                        <span className="text-xs text-gray-600">Open Address:</span>
                        <span className="text-xs font-medium text-gray-900">
                            {openAddress || "-"}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SellerInformation;
