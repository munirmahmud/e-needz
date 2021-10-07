import React from "react";
import BreadCrumb from "~/components/elements/BreadCrumb";
import PageContainer from "~/components/layouts/PageContainer";
import PageContent from "~/components/partials/page/PageContent";
import FooterFullwidth from "~/components/shared/footers/FooterFullwidth";

const AboutUsPage = () => {
  const breadCrumb = [
    {
      text: "Home",
      url: "/",
    },
    {
      text: "About Us",
    },
  ];
  return (
    <PageContainer footer={<FooterFullwidth />} title="About Us">
      <div className="ps-page--single">
        <BreadCrumb breacrumb={breadCrumb} />
        <PageContent page_id="1" />
      </div>
    </PageContainer>
  );
};
export default AboutUsPage;
