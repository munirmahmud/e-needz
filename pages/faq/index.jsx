import React from "react";
import BreadCrumb from "~/components/elements/BreadCrumb";
import PageContainer from "~/components/layouts/PageContainer";
import PageContent from "~/components/partials/page/PageContent";
import FooterFullwidth from "~/components/shared/footers/FooterFullwidth";

const FAQ = () => {
  const breadCrumb = [
    {
      text: "Home",
      url: "/",
    },
    {
      text: "Frequently ask questions",
    },
  ];

  return (
    <PageContainer
      footer={<FooterFullwidth />}
      title="Frequently ask questions"
    >
      <div className="ps-page--single">
        <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />
        <PageContent page_id="faq" />
      </div>
    </PageContainer>
  );
};

export default FAQ;
