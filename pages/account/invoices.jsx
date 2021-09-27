import React from "react";
import PageContainer from "~/components/layouts/PageContainer";
import Invoices from "~/components/partials/account/Invoices";
import FooterFullwidth from "~/components/shared/footers/FooterFullwidth";

const InvoicePage = () => {
  return (
    <>
      <PageContainer footer={<FooterFullwidth />} title="Invoices">
        <div className="ps-page--my-account">
          <Invoices />
        </div>
      </PageContainer>
    </>
  );
};

export default InvoicePage;
