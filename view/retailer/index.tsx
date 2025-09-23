"use client";

import { useEffect } from "react";

// Components
import RetailerImage from "@/components/retailer/retailerImage";
import RetailerErrorMessage from "@/components/retailer/retailerErrorMessage";
import RetailerProfile from "@/components/retailer/retailerProfile";
import RetailerContact from "@/components/retailer/retailerContact";

// Common
import Breadcrumb, { BreadcrumbItem } from "@/common/Breadcrumb";

// Services
import { retailerService } from "@/services/retailer.services";
import { useMergeState } from "@/hooks/useMergeState";

// Models
import { Retailer } from "@/models/retailer.model";
import RetailerSkeleton from "@/common/skeleton/retailerSkeleton";

interface RetailerPageProps {
    retailerId: string;
}

type RetailerState = {
    retailer: Retailer;
    errorMessage: string | null;
    isLoading: boolean;
};

const RetailerPage = ({ retailerId }: RetailerPageProps) => {
    const [state, setState] = useMergeState<RetailerState>({
        retailer: {} as Retailer,
        errorMessage: null,
        isLoading: true,
    });

    const { retailer, errorMessage, isLoading } = state || {};

    const {
        businessName,
        name,
        surname,
        email,
        phoneNumber,
        openAddress,
        province,
        district,
        neighborhood,
    } = retailer || {};

    const breadcrumbItems: BreadcrumbItem[] = [
        { label: "Products", href: "/product" },
        { label: `Retailer: ${businessName}` },
    ];

    useEffect(() => {
        (async () => {
            const result = await retailerService.getRetailerById(retailerId);
            const { data, message, success } = result || {};

            if (!success) {
                setState({ errorMessage: message, isLoading: false });
                return;
            }

            setState({ retailer: data as Retailer, isLoading: false });
        })();
    }, [retailerId, setState]);

    if (isLoading) return <RetailerSkeleton />;

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Breadcrumb items={breadcrumbItems} />

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
                    <RetailerImage url={undefined} name={businessName} />
                    <div className="space-y-6">
                        {errorMessage ? (
                            <RetailerErrorMessage errorMessage={errorMessage || ""} />
                        ) : (
                            <>
                                <RetailerProfile
                                    businessName={businessName}
                                    name={name}
                                    surname={surname}
                                />

                                <RetailerContact
                                    email={email}
                                    phoneNumber={phoneNumber}
                                    openAddress={openAddress}
                                    province={province}
                                    district={district}
                                    neighborhood={neighborhood}
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RetailerPage;
