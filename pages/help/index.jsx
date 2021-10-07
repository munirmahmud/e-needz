import React from "react";
import BreadCrumb from "~/components/elements/BreadCrumb";
import PageContainer from "~/components/layouts/PageContainer";
import PageContent from "~/components/partials/page/PageContent";
import FooterFullwidth from "~/components/shared/footers/FooterFullwidth";

const HelpPage = () => {
  const breadCrumb = [
    {
      text: "Home",
      url: "/",
    },
    {
      text: "Help",
    },
  ];
  return (
    <PageContainer footer={<FooterFullwidth />} title="Help">
      <div className="ps-page--single">
        <BreadCrumb breacrumb={breadCrumb} />
        <PageContent page_id="6" />
      </div>
    </PageContainer>
  );
};
export default HelpPage;
