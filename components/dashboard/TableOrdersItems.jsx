import { Alert, Modal } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";
import RemainingOfferTime from "~/components/dashboard/RemainingOfferTime";

const TableOrdersItems = ({ usrOrderItems, err }) => {
  const Router = useRouter();
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [payableAmount, setPayableAmount] = useState("");
  const [orderID, setOrderID] = useState("");
  const [isSubmitted, setSubmitted] = useState(false);

  // const handlePaymentPage = async (item) => {
  //   let formData = new FormData();

  //   formData.append("order_id", item.order_id);
  //   const response = await fetch(
  //     `${process.env.NEXT_PUBLIC_CUSTOMER_DASHBOARD}/details_order`,
  //     {
  //       method: "POST",
  //       body: formData,
  //     }
  //   );
  //   const result = await response.json();

  //   if (result?.response_status === 200) {
  //     const paymentInfo = {
  //       due_amount: result.data.due_amount,
  //       paid_amount: result.data.paid_amount,
  //       total_amount: result.data.total_amount,
  //       order_id: result.data.order_id,
  //       order_no: result.data.order_no,
  //     };
  //     localStorage.setItem("p_info", JSON.stringify(paymentInfo));
  //   } else {
  //     console.log("Sorry no order information found!");
  //   }
  //   Router.push("/account/payment");
  // };

  const handlePaymentAmount = (orderInfo) => {
    setPaymentModalOpen(true);
    setPayableAmount(orderInfo.due_amount);
    setOrderID(orderInfo.order_id);
  };

  const handlePaymentPage = () => {
    setSubmitted(true);

    if (!payableAmount) {
      toast.error("Please add at least a minimum amount");
      setSubmitted(false);
      return;
    } else if (payableAmount === "0") {
      toast.error("The amount should not be 0");
      setSubmitted(false);
      return;
    }

    const paymentInfo = {
      amount: payableAmount,
      order_id: orderID,
    };

    localStorage.setItem("_p_a_", JSON.stringify(paymentInfo));
    Router.push("/account/payment");
  };

  const tableItemsView = usrOrderItems.map((item, index) => {
    if (item === undefined) return;

    let badgeView, fullfillmentView;

    if (item.order_status === "1") {
      badgeView = <span className="ps-badge success">Pending</span>;
    } else if (item.order_status === "2") {
      badgeView = <span className="ps-badge success">Processing</span>;
    } else if (item.order_status === "3") {
      badgeView = <span className="ps-badge success">Shipping</span>;
    } else if (item.order_status === "4") {
      badgeView = <span className="ps-badge success">Delivered</span>;
    } else if (item.order_status === "5") {
      badgeView = <span className="ps-badge danger">Returned</span>;
    } else if (item.order_status === "6") {
      badgeView = <span className="ps-badge success">Cancelled</span>;
    } else if (item.order_status === "7") {
      badgeView = <span className="ps-badge success">Partial Delivery</span>;
    } else if (item.order_status === "18") {
      badgeView = <span className="ps-badge success">Refunded</span>;
    } else if (item.order_status === "19") {
      badgeView = <span className="ps-badge success">Picked</span>;
    }

    return (
      <tr key={index}>
        {/* <td>{index + 1}</td> */}
        <td>
          <strong> {item.date}</strong>
        </td>
        <td>
          <Link href={`/account/invoice-details/${item.order_id}`}>
            <a>{item.order_no}</a>
          </Link>
        </td>
        <td>
          <strong>{item.total_amount}</strong>
        </td>
        <td>{badgeView}</td>
        {/* 2 D 7 H 48 M 30 S */}
        <td className="text-center">
          {item.remainingStatus && (
            <RemainingOfferTime remainingTime={item.remainingTime} />
          )}

          {item.order_status === "6"
            ? "You canceled order"
            : isNaN(item.remainingTime) && item.remainingTime}
        </td>

        <td className="p-0 text-center">
          {item.remainingStatus && (
            <button
              type="button"
              className="ps-btn ps-btn--sm"
              onClick={() => handlePaymentAmount(item)}
            >
              Pay Now
            </button>
          )}

          {/* {item.order_status === "6" && "Cancelled"} */}
          {item.order_status !== "1" && item.order_status !== "6" && "Paid"}
        </td>
        <td>
          <Link href={`/account/invoice-details/${item.order_id}`}>
            <a className="ps-btn ps-btn--sm btn-black">Details</a>
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <>
      {err ? <Alert message="Failed to fetch data" type="error" /> : ""}
      <div className="table-responsive">
        <table className="table ps-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Order No</th>
              <th>Total</th>
              <th>Status</th>
              <th>Remaining Time</th>
              <th>Make Payment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{tableItemsView}</tbody>
        </table>
      </div>

      <Modal
        title="Make Payment"
        centered
        visible={paymentModalOpen}
        onOk={() => setPaymentModalOpen(false)}
        onCancel={() => setPaymentModalOpen(false)}
        footer={[
          <button
            key="submit"
            className="ps-btn btn-small"
            type="button"
            onClick={handlePaymentPage}
            disabled={isSubmitted}
          >
            Continue Payment
          </button>,
        ]}
      >
        <h4 style={{ fontWeight: 500 }}>How much do you want to Pay?</h4>
        <p>
          You can pay partially. We will start processing your order when
          payment is complete
        </p>

        <div className="form-group">
          <label htmlFor="attachment" className="sr-only">
            How much do you want to Pay?
          </label>
          <input
            type="text"
            id="payment_amount"
            className="form-control"
            value={payableAmount}
            onChange={(e) => setPayableAmount(e.target.value)}
          />
        </div>
      </Modal>
    </>
  );
};

export default TableOrdersItems;
