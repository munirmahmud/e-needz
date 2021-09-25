import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { toggleDrawerMenu } from "~/store/app/action";

const TrackOrders = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(toggleDrawerMenu(false));
  }, []);

  return (
    <>
      <div style={{ background: "#e8e8e8", height: "1.5rem" }} />
      <div className="card p-5 track-order-card border-0">
        <div className="mb-5">
          <h4>Track Order</h4>
        </div>

        <div className="ps-card__content">
          <div className="track-order-wrapper">
            <div className="ps-block__header mb-5">
              <div className="row">
                <div className="col-6">
                  <figure>
                    <figcaption>Order ID:</figcaption>
                    <p>#ABD-235711</p>
                  </figure>
                </div>
                <div className="col-6">
                  <figure>
                    <figcaption>Tracking ID:</figcaption>
                    <p>21191818abs1</p>
                  </figure>
                </div>
              </div>
            </div>

            <div className="ps-block__content">
              <div className="ps-block__timeline">
                <figure className="active">
                  <figcaption>Order Placed</figcaption>
                  <p>
                    Sep 19, 2020 <small>7:00am</small>
                  </p>
                </figure>
                <figure className="active">
                  <figcaption>Packed</figcaption>
                  <p>
                    Sep 19, 2020 <small>10:00am</small>
                  </p>
                </figure>
                <figure className="active">
                  <figcaption>Shipped</figcaption>
                  <p>
                    Sep 19, 2020 <small>4:00pm</small>
                  </p>
                </figure>
                <figure>
                  <figcaption>Delivered</figcaption>
                  <p>Estimated delivery within 1 day</p>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default connect((state) => state.app)(TrackOrders);
