import { Suspense } from "react";
import RetailerPage from "@/view/retailer";

interface RetailerPageProps {
    params: Promise<{ id: string }>;
}

const Retailer = async ({ params }: RetailerPageProps) => {
    const { id } = await params;
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <RetailerPage retailerId={id} />
        </Suspense>
    );
};

export default Retailer;
