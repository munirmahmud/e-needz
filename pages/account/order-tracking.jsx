import React from "react";
import BreadCrumb from "~/components/elements/BreadCrumb";
import PageContainer from "~/components/layouts/PageContainer";
import AccountMenuSidebar from "~/components/partials/account/modules/AccountMenuSidebar";
import OrderTracking from "~/components/partials/account/OrderTracking";
import FooterFullwidth from "~/components/shared/footers/FooterFullwidth";

const OrderTrackingPage = () => {
  const breadCrumb = [
    {
      text: "Home",
      url: "/",
    },
    {
      text: "Order Tracking",
    },
  ];

  const accountLinks = [
    {
      text: "Account Information",
      url: "/account/user-information",
      icon: "icon-user",
    },
    {
      text: "Invoices",
      url: "/account/invoices",
      icon: "icon-papers",
    },
    {
      text: "Track Order",
      url: "/account/order-tracking",
      icon: "icon-papers",
      active: true,
    },
    {
      text: "Payment History",
      url: "/account/payment-history",
      icon: "icon-papers",
    },
    {
      text: "Wishlist",
      url: "/account/wishlist",
      icon: "icon-heart",
    },
    {
      text: "Change Password",
      url: "/account/change-password",
      icon: "icon-heart",
    },
  ];

  return (
    <>
      <PageContainer footer={<FooterFullwidth />} title="Order Tracking">
        <div className="ps-page--simple">
          <BreadCrumb breacrumb={breadCrumb} />

          <section className="ps-my-account ps-page--account">
            <div className="ps-container">
              <div className="row">
                <div className="col-lg-3">
                  <div className="ps-page__left">
                    <AccountMenuSidebar data={accountLinks} active />
                  </div>
                </div>

                <div className="col-lg-9">
                  <div className="ps-page__content">
                    <div className="ps-section--account-setting">
                      <div className="ps-section__header">
                        <h3>Track Your Order</h3>
                      </div>
                      <div className="ps-section__content">
                        <OrderTracking />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </PageContainer>
    </>
  );
};

export default OrderTrackingPage;
