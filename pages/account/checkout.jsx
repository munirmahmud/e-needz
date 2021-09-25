import React from "react";
import BreadCrumb from "~/components/elements/BreadCrumb";
import PageContainer from "~/components/layouts/PageContainer";
import Checkout from "~/components/partials/account/Checkout";
import FooterFullwidth from "~/components/shared/footers/FooterFullwidth";

const CheckoutPage = () => {
  const breadCrumb = [
    {
      text: "Home",
      url: "/",
    },
    {
      text: "Shopping Cart",
      url: "/account/shopping-cart",
    },
    {
      text: "Checkout Information",
    },
  ];

  return (
    <PageContainer footer={<FooterFullwidth />} title="Checkout">
      <div className="ps-page--simple">
        <BreadCrumb breacrumb={breadCrumb} />
        <Checkout />
      </div>
    </PageContainer>
  );
};

export default CheckoutPage;
