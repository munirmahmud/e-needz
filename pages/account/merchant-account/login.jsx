import React from "react";
import PageContainer from "~/components/layouts/PageContainer";
import MerchantLogin from "~/components/partials/account/MerchantLogin";
import FooterFullwidth from "~/components/shared/footers/FooterFullwidth";

const MerchantLoginPage = () => {
  return (
    <>
      <PageContainer footer={<FooterFullwidth />} title="Register">
        <div className="ps-page--my-account">
          <MerchantLogin />
        </div>
      </PageContainer>
    </>
  );
};

export default MerchantLoginPage;
