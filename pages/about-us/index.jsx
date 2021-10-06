import React from "react";
import BreadCrumb from "~/components/elements/BreadCrumb";
import PageContainer from "~/components/layouts/PageContainer";
import AboutAwards from "~/components/partials/page/about-us/AboutAwards";
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
        {/* <OurTeam /> */}
        <AboutAwards />
      </div>
    </PageContainer>
  );
};
export default AboutUsPage;
