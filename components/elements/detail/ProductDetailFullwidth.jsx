import React from "react";
import ModuleDetailShoppingActions from "~/components/elements/detail/modules/ModuleDetailShoppingActions";
import ModuleDetailTopInformation from "~/components/elements/detail/modules/ModuleDetailTopInformation";
import ModuleProductDetailDescription from "~/components/elements/detail/modules/ModuleProductDetailDescription";
// import ModuleProductDetailSharing from "~/components/elements/detail/modules/ModuleProductDetailSharing";
import ModuleProductDetailSpecification from "~/components/elements/detail/modules/ModuleProductDetailSpecification";
import ThumbnailDefault from "~/components/elements/detail/thumbnail/ThumbnailDefault";

const ProductDetailFullwidth = ({ product }) => {
  return (
    <div className="ps-product--detail ps-product--fullwidth">
      <div className="ps-product__header">
        <ThumbnailDefault product={product} />
        <div className="ps-product__info">
          <ModuleDetailTopInformation product={product} />
          <ModuleProductDetailDescription product={product} />
          <ModuleDetailShoppingActions product={product} />
          <ModuleProductDetailSpecification product={product} />
          {/* <ModuleProductDetailSharing /> */}
          {/* <ModuleDetailActionsMobile /> */}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailFullwidth;
