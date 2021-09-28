import React from "react";
import ModulePaymentMethods from "~/components/ecomerce/modules/ModulePaymentMethods";

const PaymentOptions = () => {
  return (
    <PageContainer footer={<FooterFullwidth />} title="Invoice detail">
      <div className="ps-page--my-account">
        <ModulePaymentMethods />
      </div>
    </PageContainer>
  );
};

export default PaymentOptions;
