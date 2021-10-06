import React from "react";
import BreadCrumb from "~/components/elements/BreadCrumb";
import PageContainer from "~/components/layouts/PageContainer";
import BlankContent from "~/components/partials/page/Blank";
import FooterFullwidth from "~/components/shared/footers/FooterFullwidth";

const TermsConditions = () => {
  const breadCrumb = [
    {
      text: "Home",
      url: "/",
    },
    {
      text: "Terms & Conditions",
    },
  ];

  return (
    <PageContainer footer={<FooterFullwidth />} title="Terms &amp; Conditions">
      <div className="ps-page--single">
        <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />
        <BlankContent />
      </div>
    </PageContainer>
  );
};

export default TermsConditions;
