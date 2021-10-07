import React from "react";
import BreadCrumb from "~/components/elements/BreadCrumb";
import PageContainer from "~/components/layouts/PageContainer";
import PageContent from "~/components/partials/page/PageContent";
import FooterFullwidth from "~/components/shared/footers/FooterFullwidth";

const PrivacyPolicy = () => {
  const breadCrumb = [
    {
      text: "Home",
      url: "/",
    },
    {
      text: "Privacy Policy",
    },
  ];

  return (
    <PageContainer footer={<FooterFullwidth />} title="Privacy Policy">
      <div className="ps-page--single">
        <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />
        <PageContent page_id="4" />
      </div>
    </PageContainer>
  );
};

export default PrivacyPolicy;
