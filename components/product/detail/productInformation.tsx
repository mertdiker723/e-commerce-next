import { HeartIcon } from "@heroicons/react/24/outline";

type ProductInformationProps = {
    status: boolean;
    name: string;
    updatedAt: string;
    brandName: string;
    categoryName: string;
    description: string | null;
    price: number;
    stock: number;
};

const ProductInformation = ({
    status,
    name,
    updatedAt,
    brandName,
    categoryName,
    description,
    price,
    stock,
}: ProductInformationProps) => {
    return (
        <>
            <span
                className={`mb-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}
            >
                {status ? "Active" : "Inactive"}
            </span>
            <div className="flex justify-between items-center space-x-2 mb-2 mt-1">
                <div className="text-3xl font-bold text-gray-900">{name}</div>
                <div className="text-sm text-gray-400">
                    {new Date(updatedAt).toLocaleDateString("tr-TR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </div>
            </div>
            <div className="flex items-center space-x-4 mt-3">
                <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Brand:</span>
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                        {brandName}
                    </span>
                </div>
                <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Category:</span>
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                        {categoryName}
                    </span>
                </div>
            </div>

            {description && (
                <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">Description</h3>
                    <p className="text-xs text-gray-700 leading-relaxed">{description}</p>
                </div>
            )}

            <div className="border-t border-b border-gray-200 py-4">
                <div className="flex justify-between items-center space-x-3">
                    <span className="text-3xl font-bold text-gray-900">
                        Price: ₺{price?.toLocaleString("tr-TR") || "0"}
                    </span>

                    <div className="flex space-x-3">
                        <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                            <HeartIcon className="w-6 h-6 text-gray-600" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex items-center space-x-2">
                <div
                    className={`w-3 h-3 rounded-full ${
                        stock && stock > 0 ? "bg-green-400" : "bg-red-400"
                    }`}
                ></div>
                <span className="text-sm text-gray-700">
                    {stock && stock > 0 ? `In stock: ${stock} items` : "Out of stock"}
                </span>
            </div>
        </>
    );
};

export default ProductInformation;
