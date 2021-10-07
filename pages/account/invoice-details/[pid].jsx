import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BreadCrumb from "~/components/elements/BreadCrumb";
import PageContainer from "~/components/layouts/PageContainer";
import InvoiceDetail from "~/components/partials/account/InvoiceDetail";
import FooterFullwidth from "~/components/shared/footers/FooterFullwidth";

const InvoiceDetailPage = () => {
  const Router = useRouter();
  const authUser = useSelector((state) => state);
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (authUser.auth.isLoggedIn) {
      setLoggedIn(true);
    } else {
      userRedirect();
    }
  }, [authUser]);

  function userRedirect() {
    Router.push("/account/login");
  }

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
    isLoggedIn && (
      <>
        <PageContainer footer={<FooterFullwidth />} title="Invoice detail">
          <div className="ps-page--my-account">
            <BreadCrumb breacrumb={breadCrumb} />

            <InvoiceDetail />
          </div>
        </PageContainer>
      </>
    )
  );
};

export default InvoiceDetailPage;
