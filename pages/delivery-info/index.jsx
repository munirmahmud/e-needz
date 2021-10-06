import React from "react";
import BreadCrumb from "~/components/elements/BreadCrumb";
import PageContainer from "~/components/layouts/PageContainer";
import BlankContent from "~/components/partials/page/Blank";
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
        <BlankContent />
      </div>
    </PageContainer>
  );
};

export default DeliveryInfo;
