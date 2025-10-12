import { Suspense } from "react";
import ProductPage from "@/view/product";

const Product = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ProductPage />
        </Suspense>
    );
};

export default Product;
