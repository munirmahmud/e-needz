import React from "react";
import DescriptionBox from "~/components/elements/detail/description/DescriptionBox";
import ModuleDetailActionsMobile from "~/components/elements/detail/modules/ModuleDetailActionsMobile";
import ModuleDetailShoppingActions from "~/components/elements/detail/modules/ModuleDetailShoppingActions";
import ModuleDetailTopInformation from "~/components/elements/detail/modules/ModuleDetailTopInformation";
import ModuleProductDetailDescription from "~/components/elements/detail/modules/ModuleProductDetailDescription";
import ModuleProductDetailSharing from "~/components/elements/detail/modules/ModuleProductDetailSharing";
import ModuleProductDetailSpecification from "~/components/elements/detail/modules/ModuleProductDetailSpecification";
import ThumbnailDefault from "~/components/elements/detail/thumbnail/ThumbnailDefault";
import WidgetProductSameBrands from "~/components/shared/widgets/WidgetProductSameBrands";

const ProductDetailBox = ({ product }) => (
  <div className="ps-product--detail ps-product--box">
    <div className="ps-product__header ps-product__box">
      <ThumbnailDefault product={product} vertical={false} />
      <div className="ps-product__info">
        <ModuleDetailTopInformation product={product} />
        <ModuleProductDetailDescription product={product} />
        <ModuleDetailShoppingActions product={product} />
        <ModuleProductDetailSpecification />
        <ModuleProductDetailSharing />
        <ModuleDetailActionsMobile />
      </div>
    </div>
    <div className="ps-product__content">
      <div className="row">
        <div className="col-xl-9">
          <DescriptionBox />
        </div>
        <div className="col-xl-3">
          <div className="ps-product__box">
            <WidgetProductSameBrands collectionSlug="shop-same-brand" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ProductDetailBox;
