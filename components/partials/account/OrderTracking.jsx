import { useRouter } from "next/router";
import React, { useState } from "react";

const OrderTracking = () => {
  const [orderID, setOrderID] = useState("");
  const Router = useRouter();

  const handleTrackOrder = async (e) => {
    e.preventDefault();

    var formdata = new FormData();
    formdata.append("order_id", orderID);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CUSTOMER_DASHBOARD}/order_tracking`,
      requestOptions
    );

    const result = await response.json();
    console.log("order_id", result);

    if (result.response_status === 200) {
      Router.push(`/account/invoice-details/${result.data.order_no}`);
    }
  };

  return (
    <div className="ps-order-tracking mb-5">
      <div className="ps-section__header flex-column justify-content-center">
        <h3 className="mb-5">Order Tracking</h3>
        <p>
          To track your order please enter your Order ID in the box below and
          press the "Track" button. This was given to you on your receipt and in
          the confirmation email you should have received.
        </p>
      </div>
      <div className="ps-section__content">
        <form className="ps-form--order-tracking" onSubmit={handleTrackOrder}>
          <div className="form-group">
            <label htmlFor="order_id">Order ID</label>
            <input
              id="order_id"
              name="order_id"
              className="form-control"
              type="text"
              placeholder="Order ID"
              value={orderID}
              onChange={(e) => setOrderID(e.target.value)}
            />
          </div>
          {/* <div className="form-group">
            <label>Billing Email</label>
            <input className="form-control" type="text" placeholder="" />
          </div> */}
          <div className="form-group">
            <button className="ps-btn ps-btn--fullwidth" type="submit">
              Track Your Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderTracking;
