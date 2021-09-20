import { Result } from "antd";
import React from "react";
import { connect } from "react-redux";
import ProductCart from "~/components/elements/products/ProductCart";
import useEcomerce from "~/hooks/useEcomerce";

const ModuleEcomerceCartItems = ({ ecomerce, cartItems }) => {
  const { increaseQty, decreaseQty, removeItem } = useEcomerce();

  function handleRemoveItem(e, productId) {
    e.preventDefault();
    removeItem({ id: productId }, ecomerce.cartItems, "cart");
  }

  function handleIncreaseItemQty(e, productId) {
    e.preventDefault();

    // return
    increaseQty({ id: productId }, ecomerce.cartItems);
  }

  function handleDecreaseItemQty(e, productId) {
    e.preventDefault();
    // return
    decreaseQty({ id: productId }, ecomerce.cartItems);
  }

  // View
  let cartItemsViews;
  if (cartItems && cartItems.length > 0) {
    const items = cartItems.map((item, index) => (
      <tr key={index}>
        <td>
          <ProductCart product={item} />
        </td>
        <td data-label="price" className="price">
          ৳{item.on_sale === "1" ? item.offer_price : item.price}
        </td>
        <td data-label="quantity">
          <div className="form-group--number">
            <button
              className="up"
              onClick={(e) => handleIncreaseItemQty(e, item.product_id)}
            >
              +
            </button>
            <button
              className="down"
              onClick={(e) => handleDecreaseItemQty(e, item.product_id)}
            >
              -
            </button>
            <input
              className="form-control"
              type="text"
              placeholder={item.quantity}
              disabled={true}
            />
          </div>
        </td>
        <td data-label="total">
          <strong>
            ৳
            {(item.on_sale === "1"
              ? item.offer_price * item.quantity
              : item.price * item.quantity
            ).toFixed(2)}
          </strong>
        </td>
        <td>
          <a href="#" onClick={(e) => handleRemoveItem(e, item.id)}>
            <i className="icon-cross"></i>
          </a>
        </td>
      </tr>
    ));

    cartItemsViews = (
      <>
        <table className="table  ps-table--shopping-cart ps-table--responsive">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{items}</tbody>
        </table>
      </>
    );
  } else {
    cartItemsViews = <Result status="warning" title="No product in cart." />;
  }
  return <>{cartItemsViews}</>;
};

export default connect((state) => state)(ModuleEcomerceCartItems);
