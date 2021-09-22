import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { connect } from "react-redux";
import ModuleProductActions from "~/components/elements/products/modules/ModuleProductActions";
import Rating from "~/components/elements/Rating";
import useEcomerce from "~/hooks/useEcomerce";
import useProduct from "~/hooks/useProduct";
import { StrapiProductPriceExpanded } from "~/utilities/product-helper";

const ProductDealOfDay = ({ product, ecomerce }) => {
  const { thumbnailImage } = useProduct();
  const Router = useRouter();

  const [quantity] = useState(1);
  const { addItem } = useEcomerce();

  function handleBuynow() {
    addItem(
      {
        id: product.product_id,
        campaign_id: product.campaign_id,
        quantity: quantity,
      },
      ecomerce.cartItems,
      "cart"
    );
    setTimeout(function () {
      Router.push("/account/shopping-cart");
    }, 1000);
  }
  console.log("product", product);

  return (
    <div className="ps-product ps-product--inner">
      <div className="ps-product__thumbnail">
        <Link
          href="/product/[pid]"
          as={`/product/${product.product_id}-${product.campaign_id}`}
        >
          <a>{thumbnailImage(product)}</a>
        </Link>
        {/* {badge(product)} */}
        {product.on_sale === "0" && (
          <small className="product-offer-badge">
            off ৳ {product.discount_amount}
          </small>
        )}
        {/* {product.discount_percent === "1" && ( */}
        <small className="product-offer-badge discount">10% Off</small>
        {/* )} */}

        <ModuleProductActions product={product} />
      </div>
      <div className="ps-product__container">
        <Link href={`/store/${product.seller_id}`}>
          <a
            className="ps-product__vendor"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            {" "}
            <span>{product.seller_store_name}</span>
            {product.quantity === "0" ? (
              <span style={{ color: "red" }}>Out Of stock</span>
            ) : (
              ""
            )}
          </a>
        </Link>
        <div className="ps-product__content">
          {StrapiProductPriceExpanded(product)}
          {/* {title(product)} */}
          <Link
            href="/product/[pid]"
            as={`/product/${product.product_id}-${product.campaign_id}`}
          >
            {product.title}
          </Link>
          <div className="ps-product__rating">
            <Rating />
            <span>{product.ratingCount}</span>
          </div>
          <button
            className="ps-btn btn-small"
            onClick={() => {
              handleBuynow();
            }}
            disabled={product.quantity === "0"}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default connect((state) => state)(ProductDealOfDay);
