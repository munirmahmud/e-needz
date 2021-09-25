import React from "react";
import BreadCrumb from "~/components/elements/BreadCrumb";
import PageContainer from "~/components/layouts/PageContainer";
import InvoiceDetail from "~/components/partials/account/InvoiceDetail";
import FooterFullwidth from "~/components/shared/footers/FooterFullwidth";

const InvoiceDetailPage = () => {
  const breadCrumb = [
    {
      text: "Home",
      url: "/",
    },
    {
      text: "Invoice Detail",
    },
  ];
  return (
    <>
      <PageContainer footer={<FooterFullwidth />} title="Invoice detail">
        <div className="ps-page--my-account">
          <BreadCrumb breacrumb={breadCrumb} />

          <InvoiceDetail />
        </div>
      </PageContainer>
    </>
  );
};

export default InvoiceDetailPage;
