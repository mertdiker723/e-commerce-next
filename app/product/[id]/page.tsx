import { cookies } from "next/headers";

// Views
import ProductDetailPage from "@/view/productDetail";

// Services
import { productService } from "@/services/product.service";

const ProductDetail = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    const cookieStore = await cookies();
    const cookiesString = cookieStore.toString();

    const productData = await productService.getProductById(id, cookiesString);

    return (
        <ProductDetailPage
            productId={id}
            data={productData.data}
            isFavorited={productData.isFavorited}
            message={productData.message}
            statusCode={productData.statusCode}
        />
    );
};

export default ProductDetail;
