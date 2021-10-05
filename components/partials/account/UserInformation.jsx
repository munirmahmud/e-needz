import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AccountMenuSidebar from "~/components/partials/account/modules/AccountMenuSidebar";
import FormChangeUserInformation from "~/components/shared/FormChangeUserInformation";

const UserInformation = () => {
  const authUser = useSelector((state) => state.auth);
  const Router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (authUser.isLoggedIn) {
      setIsLoggedIn(true);
    }
  }, [authUser]);

  const userRedirect = () => {
    Router.push("/account/login");
  };

  const accountLinks = [
    {
      text: "Account Information",
      url: "/account/user-information",
      icon: "icon-user",
      active: true,
    },
    {
      text: "Invoices",
      url: "/account/invoices",
      icon: "icon-papers",
    },
    {
      text: "Track Order",
      url: "/account/order-tracking",
      icon: "icon-papers",
    },
    {
      text: "Payment History",
      url: "/account/payment-history",
      icon: "icon-cog",
    },
    {
      text: "Address",
      url: "/account/address",
      icon: "icon-map-marker",
    },
    {
      text: "Change Password",
      url: "/account/change-password",
      icon: "icon-lock",
    },
  ];

  return isLoggedIn ? (
    <section className="ps-my-account ps-page--account">
      <div className="ps-container">
        <div className="row">
          <div className="col-lg-3">
            <div className="ps-page__left">
              <AccountMenuSidebar data={accountLinks} />
            </div>
          </div>

          <div className="col-lg-9">
            <div className="ps-page__content">
              <FormChangeUserInformation />
            </div>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <>{userRedirect()}</>
  );
};

export default UserInformation;
