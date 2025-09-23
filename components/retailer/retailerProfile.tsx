import { BuildingStorefrontIcon, UserIcon } from "@heroicons/react/24/outline";

type RetailerProfileProps = {
    businessName: string;
    name: string;
    surname: string;
};

const RetailerProfile = ({ businessName, name, surname }: RetailerProfileProps) => {
    return (
        <>
            <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <BuildingStorefrontIcon className="w-4 h-4 text-indigo-600" />
                </div>
                <span className="text-xs font-medium text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full">
                    RETAILER
                </span>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-2">{businessName}</h1>

            <div className="flex items-center gap-2">
                <UserIcon className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-500">Owner:</span>
                <span className="text-lg font-semibold text-gray-800">
                    {name} {surname}
                </span>
            </div>
        </>
    );
};

export default RetailerProfile;
