import React from "react";
import BreadCrumb from "~/components/elements/BreadCrumb";
import PageContainer from "~/components/layouts/PageContainer";
import BlankContent from "~/components/partials/page/Blank";
import FooterFullwidth from "~/components/shared/footers/FooterFullwidth";

const RefundPolicy = () => {
  const breadCrumb = [
    {
      text: "Home",
      url: "/",
    },
    {
      text: "Refund Policy",
    },
  ];

  return (
    <PageContainer footer={<FooterFullwidth />} title="Refund Policy">
      <div className="ps-page--single">
        <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />
        <BlankContent />
      </div>
    </PageContainer>
  );
};

export default RefundPolicy;
