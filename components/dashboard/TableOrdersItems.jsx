import { Alert } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import RemainingOfferTime from "~/components/dashboard/RemainingOfferTime";

const TableOrdersItems = ({ usrOrderItems, err }) => {
  const Router = useRouter();

  const handlePaymentPage = (item) => {
    const paymentInfo = {
      total_amount: item.total_amount,
      date: item.date,
      order_id: item.order_id,
      order_no: item.order_no,
    };
    localStorage.setItem("paymentInfo", JSON.stringify(paymentInfo));
    Router.push("/account/payment");
  };

  const tableItemsView = usrOrderItems.map((item, index) => {
    if (item === undefined) return;

    let badgeView, fullfillmentView;

    if (item.order_status === "1") {
      badgeView = <span className="ps-badge success">Pending</span>;
    } else if (item.order_status === "2") {
      badgeView = (
        <span className="ps-badge" style={{ backgroundColor: "yellow" }}>
          Processing
        </span>
      );
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
        <td>{index + 1}</td>
        <td>
          <strong> {item.date}</strong>
        </td>
        <td>
          <Link href={`/account/invoice-details/${item.order_id}`}>
            <a>{item.order_id}</a>
          </Link>
        </td>
        <td>
          <strong>{item.total_amount}</strong>
        </td>
        <td>{badgeView}</td>
        {/* 2 D 7 H 48 M 30 S */}
        <td className="text-center">
          {item.remainingTime ===
          "Payment Time is Over, Please Contact with e-needz" ? (
            item.remainingTime
          ) : (
            <RemainingOfferTime remainingTime={item.remainingTime} />
          )}
        </td>

        <td className="p-0 text-center">
          {item.remainingTime ===
          "Payment Time is Over, Please Contact with e-needz" ? (
            "Timeout"
          ) : (
            <button
              type="button"
              className="ps-btn ps-btn--sm"
              onClick={() => handlePaymentPage(item)}
            >
              Pay Now
            </button>
          )}
        </td>
        <td>
          <Link href={`/account/invoice-details/${item.order_id}`}>
            <a>Details</a>
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
              <th>ID</th>
              <th>Date</th>
              <th>Order No</th>
              <th>Total</th>
              <th>Status</th>
              <th>Remaining Time</th>
              <th>Make Payment</th>
              <th>Order Info</th>
            </tr>
          </thead>
          <tbody>{tableItemsView}</tbody>
        </table>
      </div>
    </>
  );
};

export default TableOrdersItems;
