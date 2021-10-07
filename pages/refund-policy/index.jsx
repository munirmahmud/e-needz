import React from "react";
import BreadCrumb from "~/components/elements/BreadCrumb";
import PageContainer from "~/components/layouts/PageContainer";
import PageContent from "~/components/partials/page/PageContent";
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
        <PageContent page_id="7" />
      </div>
    </PageContainer>
  );
};

export default RefundPolicy;
