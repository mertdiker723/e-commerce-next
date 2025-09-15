"use client";

type ProductDetailPageProps = {
    productId: string;
};

const ProductDetailPage = ({ productId }: ProductDetailPageProps) => {
    return <div>Product Detail Page {productId}</div>;
};

export default ProductDetailPage;
