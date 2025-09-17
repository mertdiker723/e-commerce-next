import Image from "next/image";
import { PhotoIcon } from "@heroicons/react/24/outline";

type ProductImageProps = {
    url?: string;
    name?: string;
};

const ProductImage = ({ url, name }: ProductImageProps) => {
    return (
        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
            {url ? (
                <Image
                    src={url}
                    alt={name || "Product image"}
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

export default ProductImage;
