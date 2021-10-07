import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import BreadCrumb from "~/components/elements/BreadCrumb";
import PageContainer from "~/components/layouts/PageContainer";
import Payment from "~/components/partials/account/Payment";
import FooterFullwidth from "~/components/shared/footers/FooterFullwidth";

const PaymentPage = () => {
  const authUser = useSelector((state) => state);
  const Router = useRouter();
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
      text: "Shopping Cart",
      url: "/account/shopping-cart",
    },
    {
      text: "Checkout Information",
      url: "/account/checkout",
    },
    {
      text: "Payment",
    },
  ];

  return (
    <>
      <PageContainer footer={<FooterFullwidth />} title="Payment">
        <div className="ps-page--simple">
          <BreadCrumb breacrumb={breadCrumb} />
          <Payment />
        </div>
      </PageContainer>
    </>
  );
};

export default connect()(PaymentPage);
