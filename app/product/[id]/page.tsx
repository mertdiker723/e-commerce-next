import ProductDetailPage from "@/view/productDetail";

const ProductDetail = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    return (
        <div>
            <ProductDetailPage productId={id} />
        </div>
    );
};

export default ProductDetail;
