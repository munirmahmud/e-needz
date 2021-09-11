import React from "react";
import PageContainer from "~/components/layouts/PageContainer";
import ForgetPassword from "~/components/partials/account/ForgetPassword";
import FooterFullwidth from "~/components/shared/footers/FooterFullwidth";

const RegisterPage = () => {
  const breadCrumb = [
    {
      text: "Home",
      url: "/",
    },
    {
      text: "Forget Password",
    },
  ];

  return (
    <>
      <PageContainer footer={<FooterFullwidth />} title="Forget Password">
        <div className="ps-page--my-account">
          <ForgetPassword />
        </div>
      </PageContainer>
    </>
  );
};

export default RegisterPage;
