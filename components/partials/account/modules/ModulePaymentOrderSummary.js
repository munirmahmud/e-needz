import React, { useEffect } from "react";
import { connect } from "react-redux";
import useEcomerce from "~/hooks/useEcomerce";
import { calculateAmount } from "~/utilities/ecomerce-helpers";

const ModulePaymentOrderSummary = ({ ecomerce, shipping }) => {
  const { products, getProducts } = useEcomerce();

  useEffect(() => {
    if (ecomerce.cartItems) {
      getProducts(ecomerce.cartItems, "cart");
    }
  }, [ecomerce]);

  // view
  let listItemsView, shippingView, totalView;
  let amount;
  if (products && products.length > 0) {
    amount = calculateAmount(products);
    listItemsView = products.map((item) => (
      <div key={item.id} className="cart-items">
        <strong>
          {item.title} <span>x{item.quantity}</span>
        </strong>
        <small>
          <img src="/static/icons/currency-bdt.svg" alt="bdt" />{" "}
          {item.quantity * item.price}
        </small>
      </div>
    ));
  } else {
    listItemsView = <p>No Product.</p>;
  }
  if (shipping === true) {
    shippingView = (
      <figure>
        <figcaption>
          <strong>Shipping Fee</strong>
          <small>
            <img src="/static/icons/currency-bdt.svg" alt="bdt" /> 20.00
          </small>
        </figcaption>
      </figure>
    );
    totalView = (
      <figure className="ps-block__total">
        <h3>
          Total
          <strong>
            <img src="/static/icons/currency-bdt.svg" alt="bdt" />
            {parseInt(amount) + 20}.00
          </strong>
        </h3>
      </figure>
    );
  } else {
    totalView = (
      <figure className="ps-block__total">
        <h3>
          Total
          <strong>
            <img src="/static/icons/currency-bdt.svg" alt="bdt" />
            {parseInt(amount)}.00
          </strong>
        </h3>
      </figure>
    );
  }
  return (
    <div className="ps-block--checkout-order">
      <div className="ps-block__content">
        <figure>
          <figcaption>
            <strong>Product</strong>
            <strong>total</strong>
          </figcaption>
        </figure>
        <figure className="ps-block__items">{listItemsView}</figure>
        <figure>
          <figcaption>
            <strong>Subtotal</strong>
            <small>
              <img src="/static/icons/currency-bdt.svg" alt="bdt" /> {amount}
            </small>
          </figcaption>
        </figure>
        {shippingView}
        {totalView}
      </div>
    </div>
  );
};
export default connect((state) => state)(ModulePaymentOrderSummary);
