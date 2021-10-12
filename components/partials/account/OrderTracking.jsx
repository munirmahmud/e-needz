import { useRouter } from "next/router";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const OrderTracking = () => {
  const [orderNo, setOrderNo] = useState("");
  const [authCookie] = useCookies(["auth"]);
  const { isLoggedIn } = useSelector((state) => state.auth);

  const Router = useRouter();
  const [isSubmitted, setSubmitted] = useState(false);

  const handleTrackOrder = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    var formdata = new FormData();
    formdata.append("order_no", orderNo);
    // formdata.append("customer_id", authCookie.auth?.id);

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

    if (result.response_status === 200) {
      if (isLoggedIn) {
        Router.push(`/account/invoice-details/${result.data.order_id}`);
      } else {
        Router.push(`/account/order-tracking/${orderNo}`);
      }
      setSubmitted(false);
    } else if (result.response_status === 204) {
      toast.error(result.message);
      setSubmitted(false);
    } else {
      console.log("order_tracking error", result);
      setSubmitted(false);
    }
  };

  return (
    <div className="ps-order-tracking mb-5">
      <div className="ps-section__header flex-column justify-content-center">
        <h3 className="mb-5">Order Tracking</h3>
        <p>
          To track your order please enter your <strong>Order No</strong> in the
          box below and press the "Track Your Order" button. This was given to
          you on your receipt and in the confirmation email you should have
          received.
        </p>
      </div>
      <div className="ps-section__content">
        <form className="ps-form--order-tracking" onSubmit={handleTrackOrder}>
          <div className="form-group">
            <label htmlFor="order_no">Order No</label>
            <input
              id="order_no"
              name="order_no"
              className="form-control"
              type="text"
              placeholder="Order No"
              value={orderNo}
              onChange={(e) => setOrderNo(e.target.value)}
            />
          </div>
          {/* <div className="form-group">
            <label>Billing Email</label>
            <input className="form-control" type="text" placeholder="" />
          </div> */}
          <div className="form-group">
            <button
              className="ps-btn ps-btn--fullwidth"
              type="submit"
              disabled={isSubmitted}
            >
              Track Your Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderTracking;
