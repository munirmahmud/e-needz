import Link from "next/link";
import React from "react";

const TableOrdersItems = ({ usrOrderItems, err }) => {
  const getRemainingTime = (time) => {
    const remainingTime = 2 * 60 * 1000;
    let remainingOfferTime = new Date().getTime() + remainingTime;

    if (remainingOfferTime <= new Date().getTime()) {
      return "Time's Up";
    }

    // let timer = remainingOfferTime.toLocaleTimeString();
    console.log(new Date(remainingOfferTime));
  };

  const timeee = setInterval(getRemainingTime, 1000);
  // clearTimeout(timeee, 1000);

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
        <td>{item.remainingTime}</td>
        {/* <td>{getRemainingTime(item.remainingTime)}</td> */}

        <td className="p-0 text-center">
          <Link href={`/account/payment/${item.order_id}`}>
            <a className="ps-badge warning">Make Payment</a>
          </Link>
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
