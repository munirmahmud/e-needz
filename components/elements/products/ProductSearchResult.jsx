import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import Link from "next/link";
import React from "react";
import Rating from "~/components/elements/Rating";
import useProduct from "~/hooks/useProduct";

const ProductSearchResult = ({ product }) => {
  const { thumbnailImage, price, title } = useProduct();
  console.log("product", product);

  return (
    <div className="ps-product ps-product--wide ps-product--search-result">
      <div className="ps-product__thumbnail">
        {product?.image_path ? (
          <Link
            href="/product/[pid]"
            as={`/product/${product.product_id}-${product.campaign_id}`}
          >
            <a>
              <img src={product.image_path} alt={product?.title} />
            </a>
          </Link>
        ) : (
          <Spin indicator={<LoadingOutlined />} />
        )}
      </div>

      <div className="ps-product__content">
        {title(product)}
        {/* ***** */}
        <div className="ps-product__rating">
          <Rating />
          <span>{product.ratingCount}</span>
        </div>
        {price(product)}
      </div>
    </div>
  );
};
export default ProductSearchResult;
