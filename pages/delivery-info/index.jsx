import React from "react";
import BreadCrumb from "~/components/elements/BreadCrumb";
import PageContainer from "~/components/layouts/PageContainer";
import PageContent from "~/components/partials/page/PageContent";
import FooterFullwidth from "~/components/shared/footers/FooterFullwidth";

const DeliveryInfo = () => {
  const breadCrumb = [
    {
      text: "Home",
      url: "/",
    },
    {
      text: "Delivery Info",
    },
  ];

  return (
    <PageContainer footer={<FooterFullwidth />} title="Blank page">
      <div className="ps-page--single">
        <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />
        <PageContent page_id="3" />
      </div>
    </PageContainer>
  );
};

export default DeliveryInfo;
