import React from "react";
import PageContainer from "~/components/layouts/PageContainer";
import UserInformation from "~/components/partials/account/UserInformation";
import FooterFullwidth from "~/components/shared/footers/FooterFullwidth";

const UserInformationPage = () => {
  return (
    <PageContainer footer={<FooterFullwidth />} title="User Information">
      <div className="ps-page--my-account">
        <UserInformation />
      </div>
    </PageContainer>
  );
};

export default UserInformationPage;
