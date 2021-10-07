import React from "react";
import BreadCrumb from "~/components/elements/BreadCrumb";
import PageContainer from "~/components/layouts/PageContainer";
import ContactForm from "~/components/partials/page/ContactForm";
import ContactInfo from "~/components/partials/page/ContactInfo";
import ContactMap from "~/components/partials/page/ContactMap";
import FooterFullwidth from "~/components/shared/footers/FooterFullwidth";

const ContactUsPage = () => {
  const breadCrumb = [
    {
      text: "Home",
      url: "/",
    },
    {
      text: "Contact Us",
    },
  ];

  return (
    <PageContainer footer={<FooterFullwidth />} title="Contact Us">
      <div className="ps-page--single" id="contact-us">
        <BreadCrumb breacrumb={breadCrumb} />
        <ContactMap />
        <ContactInfo />
        <ContactForm />
      </div>
    </PageContainer>
  );
};

export default ContactUsPage;
