import React from "react";
import PageContainer from "~/components/layouts/PageContainer";
import MerchantRegister from "~/components/partials/account/MerchantRegister";
import FooterFullwidth from "~/components/shared/footers/FooterFullwidth";

const MerchantSignupPage = () => {
  return (
    <>
      <PageContainer footer={<FooterFullwidth />} title="Register">
        <div className="ps-page--my-account">
          <MerchantRegister />
        </div>
      </PageContainer>
    </>
  );
};

export default MerchantSignupPage;
