import Link from "next/link";
import React from "react";
import ModuleProductActions from "~/components/elements/products/modules/ModuleProductActions";
import Rating from "~/components/elements/Rating";
import useProduct from "~/hooks/useProduct";

const Product = ({ product }) => {
  const { thumbnailImage, price, badge, title } = useProduct();
  return (
    <div className="ps-product">
      <div className="ps-product__thumbnail">
        <Link
          href="/product/[pid]"
          as={`/product/${product.product_id}-${product.campaign_id}`}
        >
          <a>{thumbnailImage(product)}</a>
        </Link>
        {badge(product)}
        <ModuleProductActions product={product} />
      </div>
      <div className="ps-product__container">
        <Link href="/shop">
          <a className="ps-product__vendor">{product.seller_store_name}</a>
        </Link>
        <div className="ps-product__content">
          {title(product)}
          <div className="ps-product__rating">
            <Rating />
            {/* <span>02</span> */}
          </div>
          {price(product)}
        </div>
        {/* <div className="ps-product__content hover">
                    {title(product)}
                    {price(product)}
                </div> */}
      </div>
    </div>
  );
};

export default Product;
