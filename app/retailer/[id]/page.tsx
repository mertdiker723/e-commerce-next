import RetailerPage from "@/view/retailer";

interface RetailerPageProps {
    params: Promise<{ id: string }>;
}

const Retailer = async ({ params }: RetailerPageProps) => {
    const { id } = await params;
    return <RetailerPage retailerId={id} />;
};

export default Retailer;
