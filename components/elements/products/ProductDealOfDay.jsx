import { Rate } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import ModuleProductActions from "~/components/elements/products/modules/ModuleProductActions";
import useEcomerce from "~/hooks/useEcomerce";
import useProduct from "~/hooks/useProduct";
import { StrapiProductPriceExpanded } from "~/utilities/product-helper";

const ProductDealOfDay = ({ product, ecomerce }) => {
  const { thumbnailImage } = useProduct();
  const Router = useRouter();

  const [quantity] = useState(1);
  const { addItem } = useEcomerce();

  const handleAddtoCart = () => {
    if (product.quantity === "0") return;

    addItem(
      {
        id: product.product_id,
        campaign_id: product.campaign_id,
        quantity: 1,
      },
      ecomerce.cartItems,
      "cart"
    );

    toast.success("The product added into your cart!");
  };

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
        {product.on_sale === "1" && (
          <small className="product-offer-badge">
            % {product.discount_percent} Off
          </small>
        )}
        {product.on_sale === "1" && (
          <small className="product-offer-badge discount flex-column">
            <span className="d-flex align-items-center justify-content-center">
              off ৳
            </span>{" "}
            {product.discount_amount}
          </small>
        )}

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

          <Link
            href="/product/[pid]"
            as={`/product/${product.product_id}-${product.campaign_id}`}
          >
            <a className="product-title" title={product.title}>
              {product.title}
            </a>
          </Link>

          <div className="item-footer">
            <div className="ps-product__rating form-group__rating">
              <Rate disabled defaultValue={product?.ratings} />
            </div>

            <div className="d-flex justify-content-between flex-wrap">
              <button
                className="ps-btn ps-btn--sm mr-2"
                onClick={() => {
                  handleAddtoCart();
                }}
                disabled={product.quantity === "0"}
              >
                Add to Cart
              </button>
              <button
                className="ps-btn ps-btn--sm"
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
      </div>
    </div>
  );
};

export default connect((state) => state)(ProductDealOfDay);
