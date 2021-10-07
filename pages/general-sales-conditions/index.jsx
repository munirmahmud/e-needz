import React from "react";
import BreadCrumb from "~/components/elements/BreadCrumb";
import PageContainer from "~/components/layouts/PageContainer";
import PageContent from "~/components/partials/page/PageContent";
import FooterFullwidth from "~/components/shared/footers/FooterFullwidth";

const GeneralSalesConditions = () => {
  const breadCrumb = [
    {
      text: "Home",
      url: "/",
    },
    {
      text: "General sales conditions",
    },
  ];

  return (
    <PageContainer
      footer={<FooterFullwidth />}
      title="General sales conditions"
    >
      <div className="ps-page--single">
        <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />
        <PageContent page_id="general-sales-conditions" />
      </div>
    </PageContainer>
  );
};

export default GeneralSalesConditions;
