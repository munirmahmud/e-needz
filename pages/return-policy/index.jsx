import React from "react";
import BreadCrumb from "~/components/elements/BreadCrumb";
import PageContainer from "~/components/layouts/PageContainer";
import PageContent from "~/components/partials/page/PageContent";
import FooterFullwidth from "~/components/shared/footers/FooterFullwidth";

const ReturnPolicy = () => {
  const breadCrumb = [
    {
      text: "Home",
      url: "/",
    },
    {
      text: "Return Policy",
    },
  ];

  return (
    <PageContainer footer={<FooterFullwidth />} title="Return Policy">
      <div className="ps-page--single">
        <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />
        <PageContent page_id="return_policy" />
      </div>
    </PageContainer>
  );
};

export default ReturnPolicy;
