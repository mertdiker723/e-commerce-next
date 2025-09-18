import ProductDetailPage from "@/view/productDetail";

const ProductDetail = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    return <ProductDetailPage productId={id} />;
};

export default ProductDetail;
