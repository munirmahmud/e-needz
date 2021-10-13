import { Alert } from "antd";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { toggleDrawerMenu } from "~/store/app/action";

const TrackOrders = ({ orderData }) => {
  const [authCookie] = useCookies(["auth"]);
  const dispatch = useDispatch();
  const [trackInfo, setTrackInfo] = useState([]);
  const [orderInfo, setOrderInfo] = useState("");

  const getOrderTrackTimeLine = async () => {
    const formData = new FormData();
    formData.append("order_no", orderData.order_no);
    // formData.append("customer_id", authCookie.auth?.id);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CUSTOMER_DASHBOARD}/order_tracking`,
      {
        method: "POST",
        body: formData,
      }
    );
    const result = await response.json();

    if (result?.response_status === 200) {
      setTrackInfo(result.data.track_details);
      setOrderInfo(result?.data?.order_no);
    } else {
      console.log("order_tracking error", result);
    }
  };

  useEffect(() => {
    getOrderTrackTimeLine();
    dispatch(toggleDrawerMenu(false));
  }, [orderData]);

  const orderStatus = (item) => {
    let badgeView;
    if (item.order_status === "1") {
      badgeView = <figcaption className="success">Pending</figcaption>;
    } else if (item.order_status === "2") {
      badgeView = <figcaption className="success">Processing</figcaption>;
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
        {newDateTime[0]} <small>{newDateTime[1]}</small>
      </>
    );
  };

  return (
    <>
      {authCookie.auth.id && (
        <div style={{ background: "#e8e8e8", height: "1.5rem" }} />
      )}

      <div className="card p-5 track-order-card border-0">
        {Array.isArray(trackInfo) && trackInfo.length > 0 && (
          <div className="mb-2">
            <h4>Timeline</h4>
          </div>
        )}

        <div className="ps-card__content">
          <div className="track-order-wrapper">
            <div className="ps-block__header mb-5">
              <div className="row">
                {Array.isArray(trackInfo) && trackInfo.length > 0 && (
                  <div className="col-6">
                    <div>
                      <p>
                        <strong>Order No: </strong> {orderData.order_no}
                      </p>
                    </div>
                  </div>
                )}

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
                {Array.isArray(trackInfo) && trackInfo.length > 0 ? (
                  trackInfo.map((track, index) => (
                    <figure key={index} className="active">
                      {orderStatus(track)}
                      <p dangerouslySetInnerHTML={{ __html: track.message }} />
                      <p>{dateTimeFormatter(track.date)}</p>
                    </figure>
                  ))
                ) : (
                  <Alert text="Sorry no track records found!" type="success" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrackOrders;
