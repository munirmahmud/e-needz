import React from "react";
import BreadCrumb from "~/components/elements/BreadCrumb";
import PageContainer from "~/components/layouts/PageContainer";
import PageContent from "~/components/partials/page/PageContent";
import FooterFullwidth from "~/components/shared/footers/FooterFullwidth";

const PurchaseProtection = () => {
  const breadCrumb = [
    {
      text: "Home",
      url: "/",
    },
    {
      text: "Purchase Protection",
    },
  ];

  return (
    <PageContainer footer={<FooterFullwidth />} title="Purchase Protection">
      <div className="ps-page--single">
        <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />
        <PageContent page_id="purchase_protection" />
      </div>
    </PageContainer>
  );
};

export default PurchaseProtection;
