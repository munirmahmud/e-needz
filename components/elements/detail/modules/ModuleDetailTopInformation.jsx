import { Rate } from "antd";
import Link from "next/link";
import React from "react";

const ModuleDetailTopInformation = ({ product }) => {
  console.log("product", product);
  // Views
  let priceView;
  if (product.on_sale === "1") {
    priceView = (
      <h4 className="ps-product__price sale">
        <del style={{ color: "#aeaeae" }}>{product.price}</del>
        <span className="font-weight-bold ml-2">{product.offer_price} TK</span>
      </h4>
    );
  } else {
    priceView = <h4 className="ps-product__price">{product.price} TK</h4>;
  }
  return (
    <header>
      <h1>{product.title}</h1>
      <div className="ps-product__meta">
        {product.brand_name !== null ? (
          <p>
            Brand:
            <Link href={`brands/${product.brand_id}`}>
              <a className="ml-2 text-capitalize">{product.brand_name}</a>
            </Link>
          </p>
        ) : (
          ""
        )}
        <div className="ps-product__rating form-group__rating">
          <input type="number" defaultValue={Number(product?.ratings)} hidden />
          <Rate disabled allowHalf defaultValue={Number(product?.ratings)} />
          <span>(* review)</span>
        </div>
      </div>
      {priceView}
    </header>
  );
};

export default ModuleDetailTopInformation;
