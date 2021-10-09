import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BreadCrumb from "~/components/elements/BreadCrumb";
import PageContainer from "~/components/layouts/PageContainer";
import FooterFullwidth from "~/components/shared/footers/FooterFullwidth";
import TrackOrders from "~/pages/account/invoice-details/TrackOrders";

const OrderTrackingDetails = () => {
  const Router = useRouter();
  const [orderData, setOrderData] = useState({});
  console.log("Router", Router.query);

  useEffect(() => {
    const orderData = {
      order_no: Router.query.orderno,
    };
    setOrderData(orderData);
  }, [Router]);

  const breadCrumb = [
    {
      text: "Home",
      url: "/",
    },
    {
      text: "Order Tracking",
    },
  ];

  return (
    <PageContainer footer={<FooterFullwidth />} title="Order Tracking">
      <div className="ps-page--simple">
        <BreadCrumb breacrumb={breadCrumb} />

        <section className="ps-my-account ps-page--account">
          <div className="ps-container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                <div className="ps-page__content">
                  <div className="ps-section--account-setting">
                    <div className="ps-section__header">
                      <h3>Your order information</h3>
                    </div>
                    <div className="ps-section__content">
                      <TrackOrders orderData={orderData} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageContainer>
  );
};

export default OrderTrackingDetails;
