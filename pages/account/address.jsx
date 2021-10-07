import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BreadCrumb from "~/components/elements/BreadCrumb";
import PageContainer from "~/components/layouts/PageContainer";
import Addresses from "~/components/partials/account/Addresses";
import FooterDefault from "~/components/shared/footers/FooterDefault";

const MyAccountPage = () => {
  const authUser = useSelector((state) => state);
  const Router = useRouter();

  const [isLoggedIn, setLoggedIn] = useState(false);

  console.log("authUser.auth", authUser.auth);
  useEffect(() => {
    setTimeout(() => {
      if (authUser.auth.isLoggedIn === true) {
        setLoggedIn(true);
      } else {
        userRedirect();
      }
    }, 2000);
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
      text: "Addresses",
    },
  ];
  return (
    isLoggedIn && (
      <PageContainer footer={<FooterDefault />} title="Address">
        <div className="ps-page--my-account">
          <BreadCrumb breacrumb={breadCrumb} />
          <Addresses />
        </div>
      </PageContainer>
    )
  );
};

export default MyAccountPage;
