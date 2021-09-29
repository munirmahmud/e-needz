import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { toggleDrawerMenu } from "~/store/app/action";

const InvoiceTimeLine = ({ customer_id }) => {
  const dispatch = useDispatch();
  const [trackInfo, setTrackInfo] = useState([]);
  const [orderInfo, setOrderInfo] = useState("");

  const getOrderTrackTimeLine = async () => {
    const formData = new FormData();
    formData.append("order_id", customer_id);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CUSTOMER_DASHBOARD}/manage_invoice`,
      {
        method: "POST",
        body: formData,
      }
    );
    const result = await response.json();

    console.log("manage_invoice", result);

    if (result?.response_status === 200) {
      setTrackInfo(result.data.track_details);
      setOrderInfo(result?.data?.order_no);
    }
  };

  useEffect(() => {
    getOrderTrackTimeLine();
    dispatch(toggleDrawerMenu(false));
  }, []);

  const orderStatus = (item) => {
    let badgeView;
    if (item.order_status === "1") {
      badgeView = <figcaption className="success">Pending</figcaption>;
    } else if (item.order_status === "2") {
      badgeView = (
        <figcaption style={{ backgroundColor: "yellow" }}>
          Processing
        </figcaption>
      );
    } else if (item.order_status === "3") {
      badgeView = <figcaption className="success">Shipping</figcaption>;
    } else if (item.order_status === "4") {
      badgeView = <figcaption className="success">Delivered</figcaption>;
    } else if (item.order_status === "5") {
      badgeView = <figcaption className="danger">Returned</figcaption>;
    } else if (item.order_status === "6") {
      badgeView = <figcaption className="success">Cancelled</figcaption>;
    } else if (item.order_status === "7") {
      badgeView = <figcaption className="success">Partial Delivery</figcaption>;
    } else if (item.order_status === "18") {
      badgeView = <figcaption className="success">Refunded</figcaption>;
    } else if (item.order_status === "19") {
      badgeView = <figcaption className="success">Picked</figcaption>;
    }
    return badgeView;
  };

  const dateTimeFormatter = (dateTime) => {
    const newDateTime = dateTime?.split(" ");
    return (
      <>
        {newDateTime[0]}{" "}
        <small>
          {newDateTime[1]}:{newDateTime[2]}
        </small>
      </>
    );
  };

  return (
    <>
      <div style={{ background: "#e8e8e8", height: "1.5rem" }} />
      <div className="card p-5 track-order-card border-0">
        <div className="mb-2">
          <h4>Timeline</h4>
        </div>

        <div className="ps-card__content">
          <div className="track-order-wrapper">
            <div className="ps-block__header mb-5">
              <div className="row">
                <div className="col-6">
                  <div>
                    <p>
                      <strong>Order No: </strong> #{orderInfo}
                    </p>
                  </div>
                </div>
                {/* <div className="col-6">
                  <figure>
                    <figcaption>Tracking ID:</figcaption>
                    <p>21191818abs1</p>
                  </figure>
                </div> */}
              </div>
            </div>

            <div className="ps-block__content">
              <div className="ps-block__timeline">
                {trackInfo.length &&
                  trackInfo.map((track, index) => (
                    <figure key={index} className="active">
                      {orderStatus(track)}
                      <div
                        dangerouslySetInnerHTML={{ __html: track.message }}
                      />
                      <p>{dateTimeFormatter(track.date)}</p>
                    </figure>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default connect((state) => state.app)(InvoiceTimeLine);
