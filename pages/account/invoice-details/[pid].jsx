import { useRouter } from "next/router";
import React from "react";
import BreadCrumb from "~/components/elements/BreadCrumb";
import PageContainer from "~/components/layouts/PageContainer";
import InvoiceDetail from "~/components/partials/account/InvoiceDetail";
import FooterFullwidth from "~/components/shared/footers/FooterFullwidth";

const InvoiceDetailPage = ({ auth }) => {
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
      text: "Invoice Detail",
    },
  ];

  return (
    <>
      {auth ? (
        <PageContainer footer={<FooterFullwidth />} title="Invoice detail">
          <div className="ps-page--my-account">
            <BreadCrumb breacrumb={breadCrumb} />

            <InvoiceDetail />
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

export default InvoiceDetailPage;
