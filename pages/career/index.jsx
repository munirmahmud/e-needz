import React from "react";
import BreadCrumb from "~/components/elements/BreadCrumb";
import PageContainer from "~/components/layouts/PageContainer";
import PageContent from "~/components/partials/page/PageContent";
import FooterFullwidth from "~/components/shared/footers/FooterFullwidth";

const CareerPage = () => {
  const breadCrumb = [
    {
      text: "Home",
      url: "/",
    },
    {
      text: "Career",
    },
  ];
  return (
    <PageContainer footer={<FooterFullwidth />} title="Career">
      <div className="ps-page--single">
        <BreadCrumb breacrumb={breadCrumb} />
        <PageContent page_id="career" />
      </div>
    </PageContainer>
  );
};
export default CareerPage;
