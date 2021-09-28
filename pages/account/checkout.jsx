import React from "react";
import PageContainer from "~/components/layouts/PageContainer";
import Checkout from "~/components/partials/account/Checkout";
import FooterFullwidth from "~/components/shared/footers/FooterFullwidth";

const CheckoutPage = () => {
  return (
    <PageContainer footer={<FooterFullwidth />} title="Checkout">
      <div className="ps-page--simple">
        <Checkout />
      </div>
    </PageContainer>
  );
};

export default CheckoutPage;
