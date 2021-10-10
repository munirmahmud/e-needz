import { useRouter } from "next/router";
import React from "react";
import { connect } from "react-redux";
import BreadCrumb from "~/components/elements/BreadCrumb";
import PageContainer from "~/components/layouts/PageContainer";
import Payment from "~/components/partials/account/Payment";
import FooterFullwidth from "~/components/shared/footers/FooterFullwidth";

const PaymentPage = ({ auth }) => {
  const Router = useRouter();

  const redirectUser = () => {
    Router.push("/account/login");
  };

  const breadCrumb = [
    {
      text: "Home",
      url: "/",
    },
    {
      text: "Invoices",
      url: "/account/invoices",
    },
    {
      text: "Payment",
    },
  ];

  return (
    <>
      {auth ? (
        <PageContainer footer={<FooterFullwidth />} title="Payment">
          <div className="ps-page--simple">
            <BreadCrumb breacrumb={breadCrumb} />
            <Payment />
          </div>
        </PageContainer>
      ) : (
        redirectUser()
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  const cookies = context.req.cookies["auth"];

  let authUser = false;
  if (cookies !== undefined) {
    const auth = JSON.parse(cookies);
    if (auth.id) {
      authUser = true;
    } else {
      authUser = false;
    }
  } else {
    authUser = false;
  }

  return {
    props: {
      auth: authUser,
    },
  };
}

export default connect()(PaymentPage);
