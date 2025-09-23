import { EnvelopeIcon, PhoneIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { District } from "@/models/district.model";
import { Neighborhood } from "@/models/neighborhood.model";
import { Province } from "@/models/province.model";

type RetailerContactProps = {
    email: string;
    phoneNumber: string;
    openAddress: string;
    province: Province;
    district: District;
    neighborhood: Neighborhood;
};

const RetailerContact = ({
    email,
    phoneNumber,
    openAddress,
    province,
    district,
    neighborhood,
}: RetailerContactProps) => {
    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Contact Information
            </h2>

            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <EnvelopeIcon className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-medium text-gray-900">{email || "N/A"}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <PhoneIcon className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <p className="font-medium text-gray-900">{phoneNumber || "N/A"}</p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPinIcon className="w-4 h-4 text-purple-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-600 mb-3">Location</p>

                        {/* Location hierarchy */}
                        <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2">
                                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-medium">
                                    Province:
                                </span>
                                <span className="font-medium text-gray-900">
                                    {province?.name || "Not specified"}
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-medium">
                                    District:
                                </span>
                                <span className="text-gray-700">
                                    {district?.name || "Not specified"}
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded font-medium">
                                    Neighborhood:
                                </span>
                                <span className="text-gray-700">
                                    {neighborhood?.name || "Not specified"}
                                </span>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <MapPinIcon className="w-4 h-4 text-blue-600" />
                                <span className="text-sm font-semibold text-blue-900">
                                    Detailed Address
                                </span>
                            </div>
                            <p className="text-sm text-gray-700 leading-relaxed">
                                {openAddress || "No detailed address provided"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RetailerContact;
