// Common
import Breadcrumb, { BreadcrumbItem } from "@/common/Breadcrumb";

// Components
import ProductErrorMessage from "@/components/product/detail/productErrorMessage";
import ProductImage from "@/components/product/detail/productImage";
import ProductInformation from "@/components/product/detail/productInformation";
import SellerInformation from "@/components/product/detail/sellerInformation";

// Models
import { Product } from "@/models/product.model";

type ProductDetailPageProps = {
    productId: string;
    data?: Product | null;
    isFavorited: boolean;
    message: string | null;
};

const ProductDetailPage = ({ data, isFavorited, message }: ProductDetailPageProps) => {
    const {
        name,
        description,
        price,
        status: statusProduct,
        stock,
        image,
        updatedAt,
        brand,
        category,
        createdBy,
        _id,
    } = data || {};

    const { url } = image || {};
    const {
        businessName,
        district,
        email,
        name: retailerName,
        neighborhood,
        openAddress,
        phoneNumber,
        province,
        surname,
        _id: retailerId,
    } = createdBy || {};

    const { name: districtName } = district || {};
    const { name: neighborhoodName } = neighborhood || {};
    const { name: provinceName } = province || {};
    const { name: brandName } = brand || {};
    const { name: categoryName } = category || {};

    const breadcrumbItems: BreadcrumbItem[] = [
        { label: "Products", href: "/product" },
        { label: `Product Detail: ${data?.name}` },
    ];

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Breadcrumb items={breadcrumbItems} />

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
                    <ProductImage url={url} name={name} />

                    <div className="space-y-6">
                        {message ? (
                            <ProductErrorMessage errorMessage={message} />
                        ) : (
                            <>
                                <ProductInformation
                                    productId={_id}
                                    status={statusProduct}
                                    name={name}
                                    updatedAt={updatedAt}
                                    brandName={brandName}
                                    categoryName={categoryName}
                                    description={description}
                                    price={price}
                                    stock={stock}
                                    isFavorited={isFavorited}
                                />
                                <SellerInformation
                                    businessName={businessName}
                                    retailerName={retailerName}
                                    retailerId={retailerId}
                                    surname={surname}
                                    email={email}
                                    phoneNumber={phoneNumber}
                                    provinceName={provinceName}
                                    districtName={districtName}
                                    neighborhoodName={neighborhoodName}
                                    openAddress={openAddress}
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
