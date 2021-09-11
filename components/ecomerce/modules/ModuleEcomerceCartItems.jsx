<<<<<<< HEAD
import React from 'react'
import { connect } from 'react-redux'
import useEcomerce from '~/hooks/useEcomerce'
import { Result } from 'antd'
import ProductCart from '~/components/elements/products/ProductCart'

const ModuleEcomerceCartItems = ({ ecomerce, cartItems }) => {
  const { increaseQty, decreaseQty, removeItem } = useEcomerce()

  function handleRemoveItem(e, productId) {
    e.preventDefault()
    removeItem({ id: productId }, ecomerce.cartItems, 'cart')
  }

  function handleIncreaseItemQty(e, productId) {
    e.preventDefault()
    increaseQty({ id: productId }, ecomerce.cartItems)
  }

  function handleDecreaseItemQty(e, productId) {
    e.preventDefault()
    decreaseQty({ id: productId }, ecomerce.cartItems)
  }

  // View
  let cartItemsViews
=======
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
    increaseQty({ id: productId }, ecomerce.cartItems);
  }

  function handleDecreaseItemQty(e, productId) {
    e.preventDefault();
    decreaseQty({ id: productId }, ecomerce.cartItems);
  }

  // View
  let cartItemsViews;
>>>>>>> master
  if (cartItems && cartItems.length > 0) {
    const items = cartItems.map((item) => (
      <tr key={item.id}>
        <td>
          <ProductCart product={item} />
        </td>
<<<<<<< HEAD
        <td data-label='price' className='price'>
          ${item.price}
        </td>
        <td data-label='quantity'>
          <div className='form-group--number'>
            <button
              className='up'
=======
        <td data-label="price" className="price">
          <div className="price d-flex align-items-center justify-content-center w-100">
            <img src="/static/icons/currency-bdt.svg" alt="bdt" />
            <span>{item.price}</span>
          </div>
        </td>
        <td data-label="quantity">
          <div className="form-group--number">
            <button
              className="up"
>>>>>>> master
              onClick={(e) => handleIncreaseItemQty(e, item.id)}
            >
              +
            </button>
            <button
<<<<<<< HEAD
              className='down'
=======
              className="down"
>>>>>>> master
              onClick={(e) => handleDecreaseItemQty(e, item.id)}
            >
              -
            </button>
            <input
<<<<<<< HEAD
              className='form-control'
              type='text'
=======
              className="form-control"
              type="text"
>>>>>>> master
              placeholder={item.quantity}
              disabled={true}
            />
          </div>
        </td>
<<<<<<< HEAD
        <td data-label='total'>
          <strong>${(item.price * item.quantity).toFixed(2)}</strong>
        </td>
        <td>
          <a href='#' onClick={(e) => handleRemoveItem(e, item.id)}>
            <i className='icon-cross'></i>
          </a>
        </td>
      </tr>
    ))

    cartItemsViews = (
      <>
        <table className='table  ps-table--shopping-cart ps-table--responsive'>
=======
        <td data-label="total">
          <strong className="d-flex align-items-center justify-content-center">
            <img src="/static/icons/currency-bdt.svg" alt="bdt" />
            {(item.price * item.quantity).toFixed(2)}
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
>>>>>>> master
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
<<<<<<< HEAD
    )
  } else {
    cartItemsViews = <Result status='warning' title='No product in cart.' />
  }
  return <>{cartItemsViews}</>
}
=======
    );
  } else {
    cartItemsViews = <Result status="warning" title="No product in cart." />;
  }
  return <>{cartItemsViews}</>;
};
>>>>>>> master

export default connect((state) => state)(ModuleEcomerceCartItems)
