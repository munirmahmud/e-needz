import { Modal } from "antd";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import useEcomerce from "~/hooks/useEcomerce";

const ModuleDetailShoppingActions = ({
  ecomerce,
  product,
  extended = false,
}) => {
  const [quantity, setQuantity] = useState(1);
  const Router = useRouter();
  const { addItem } = useEcomerce();

  function handleAddItemToCart(e) {
    e.preventDefault();
    addItem(
      {
        id: product.product_id,
        campaign_id: product.campaign_id,
        quantity: quantity,
      },
      ecomerce.cartItems,
      "cart"
    );

    toast.success("The product added into your cart!");
  }

  function handleBuynow(e) {
    e.preventDefault();
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
    }, 100);
  }

  const handleAddItemToCompare = (e) => {
    e.preventDefault();
    e.preventDefault();
    addItem({ id: product.prduct_id }, ecomerce.compareItems, "compare");
    const modal = Modal.success({
      centered: true,
      title: "Success!",
      content: `This product has been added to compare listing!`,
    });
    modal.update;
  };

  const handleAddItemToWishlist = (e) => {
    e.preventDefault();
    addItem(
      { id: product.product_id, campaign_id: product.campaign_id },
      ecomerce.wishlistItems,
      "wishlist"
    );
    const modal = Modal.success({
      centered: true,
      title: "Success!",
      content: `This item has been added to your wishlist`,
    });
    modal.update;
  };

  function handleIncreaseItemQty(e) {
    e.preventDefault();
    setQuantity(quantity + 1);
  }

  function handleDecreaseItemQty(e) {
    e.preventDefault();
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }
  if (!extended) {
    return (
      <>
        <p>
          {Number(product.quantity) > 0
            ? `Only ${product.quantity} items left`
            : `No items are left`}
        </p>
        <div className="ps-product__shopping">
          <figure>
            <figcaption>Quantity</figcaption>
            <div className="form-group--number">
              <button className="up" onClick={(e) => handleIncreaseItemQty(e)}>
                <i className="fa fa-plus"></i>
              </button>
              <button
                className="down"
                onClick={(e) => handleDecreaseItemQty(e)}
              >
                <i className="fa fa-minus"></i>
              </button>
              <input
                className="form-control"
                type="text"
                placeholder={quantity}
                disabled
              />
            </div>
          </figure>
          <div className="d-flex align-items-center mr-0">
            <button
              type="button"
              className="ps-btn ps-btn--black mr-3"
              onClick={(e) => handleAddItemToCart(e)}
              disabled={Number(product.quantity) === 0}
            >
              Add to cart
            </button>
            <button
              type="button"
              className="ps-btn mr-3"
              onClick={(e) => handleBuynow(e)}
              disabled={Number(product.quantity) === 0}
            >
              Buy Now
            </button>
            <div className="ps-product__actions">
              <a
                href="#"
                className="d-flex "
                onClick={(e) => handleAddItemToWishlist(e)}
              >
                <i className="icon-heart"></i>
              </a>
              {/* <a href="#" onClick={(e) => handleAddItemToCompare(e)}>
            <i className="icon-chart-bars"></i>
          </a> */}
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className="ps-product__shopping extend">
        <div className="ps-product__btn-group">
          <figure>
            <figcaption>Quantity</figcaption>
            <div className="form-group--number">
              <button className="up" onClick={(e) => handleIncreaseItemQty(e)}>
                <i className="fa fa-plus"></i>
              </button>
              <button
                className="down"
                onClick={(e) => handleDecreaseItemQty(e)}
              >
                <i className="fa fa-minus"></i>
              </button>
              <input
                className="form-control"
                type="text"
                placeholder={quantity}
                disabled
              />
            </div>
          </figure>
          <button
            className="ps-btn ps-btn--black"
            onClick={(e) => handleAddItemToCart(e)}
            disabled={Number(product.quantity) === 0}
          >
            Add to cart
          </button>
          <div className="ps-product__actions">
            <a href="#" onClick={(e) => handleAddItemToWishlist(e)}>
              <i className="icon-heart"></i>
            </a>
            {/* <a href="#" onClick={(e) => handleAddItemToCompare(e)}>
              <i className="icon-chart-bars"></i>
            </a> */}
          </div>
        </div>
        <button
          className="ps-btn"
          onClick={(e) => handleBuynow(e)}
          disabled={Number(product.quantity) === 0}
        >
          Buy Now
        </button>
      </div>
    );
  }
};

export default connect((state) => state)(ModuleDetailShoppingActions);
