import React from "react";
import DefaultDescription from "~/components/elements/detail/description/DefaultDescription";
import ModuleDetailActionsMobile from "~/components/elements/detail/modules/ModuleDetailActionsMobile";
import ModuleDetailShoppingActions from "~/components/elements/detail/modules/ModuleDetailShoppingActions";
import ModuleDetailTopInformation from "~/components/elements/detail/modules/ModuleDetailTopInformation";
import ModuleProductDetailDescription from "~/components/elements/detail/modules/ModuleProductDetailDescription";
import ModuleProductDetailSharing from "~/components/elements/detail/modules/ModuleProductDetailSharing";
import ModuleProductDetailSpecification from "~/components/elements/detail/modules/ModuleProductDetailSpecification";
import ModuleProductHasVariants from "~/components/elements/detail/modules/ModuleProductHasVariants";
import ThumbnailDefault from "~/components/elements/detail/thumbnail/ThumbnailDefault";

const ProductDetailVariants = ({ product }) => {
  if (product !== null && typeof product !== "Array") {
    if (product.variants.length > 0) {
      return (
        <div className="ps-product--detail ps-product--fullwidth">
          <ModuleProductHasVariants product={product} />
          <DefaultDescription />
        </div>
      );
    } else {
      return (
        <div className="ps-product--detail ps-product--fullwidth">
          <div className="ps-product__header">
            <ThumbnailDefault product={product} />
            <div className="ps-product__info">
              <ModuleDetailTopInformation product={product} />
              <ModuleProductDetailDescription product={product} />
              <ModuleDetailShoppingActions product={product} />
              <ModuleProductDetailSpecification />
              <ModuleProductDetailSharing />
              <ModuleDetailActionsMobile />
            </div>
          </div>
          <DefaultDescription />
        </div>
      );
    }
  } else {
    return <p>No Data</p>;
  }
};

export default ProductDetailVariants;
