"use client";

import { logoutUser } from "@/services/auth.services";
import { XCircleIcon } from "@heroicons/react/20/solid";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

type ProductErrorMessageProps = {
    errorMessage: string;
    statusCode?: number | null;
};

const ProductErrorMessage = ({ errorMessage, statusCode }: ProductErrorMessageProps) => {
    const router = useRouter();
    useEffect(() => {
        (async () => {
            if (statusCode === 401 || statusCode === 403) {
                await logoutUser();
                router.push("/login");
            }
        })();
    }, [router, statusCode]);

    if (!errorMessage) return null;

    return (
        <div className="bg-red-50 border-l-4 border-red-400 rounded-lg p-6 shadow-sm">
            <div className="flex items-start">
                <div className="flex-shrink-0">
                    <XCircleIcon className="h-6 w-6 text-red-500" />
                </div>
                <div className="ml-4">
                    <h3 className="text-lg font-semibold text-red-800 mb-2">
                        An Error Occurred {statusCode && `(Status: ${statusCode})`}
                    </h3>
                    <p className="text-sm text-red-700 leading-relaxed">{errorMessage}</p>
                    {statusCode && (
                        <p className="text-xs text-red-600 mt-2 font-medium">
                            HTTP Status Code: {statusCode}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductErrorMessage;
