import Image from "next/image";
import { PhotoIcon } from "@heroicons/react/24/outline";

type RetailerImageProps = {
    url?: string;
    name?: string;
};

const RetailerImage = ({ url, name }: RetailerImageProps) => {
    return (
        <div className="bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center h-full">
            {url ? (
                <Image
                    src={url}
                    alt={name || "Retailer image"}
                    width={600}
                    height={600}
                    className="w-full h-full object-contain"
                />
            ) : (
                <div className="flex flex-col items-center justify-center text-gray-400">
                    <PhotoIcon className="w-24 h-24 mb-2" />
                </div>
            )}
        </div>
    );
};

export default RetailerImage;
