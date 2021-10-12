import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import TableOrdersItems from "~/components/dashboard/TableOrdersItems";
import AccountMenuSidebar from "~/components/partials/account/modules/AccountMenuSidebar";
import { toggleDrawerMenu } from "~/store/app/action";

const Invoices = () => {
  const dispatch = useDispatch();
  const Router = useRouter();
  const authUser = useSelector((state) => state);

  const [usrOrderItems, setUsrOrderItems] = useState([]);
  const [usrOrderItemsSpliced, setUsrOrderItemsSpliced] = useState([]);
  const [len, setLen] = useState(0);
  const [offset, setOffset] = useState(0);
  const [spliceNO, setSpliceNO] = useState(10);
  const [err, setErr] = useState(false);
  const [authCookie] = useCookies(["auth"]);

  const params = new URLSearchParams(window.location.search);
  const getMessageAfterPayment = () => {
    const status = params.get("status");
    const message = params.get("message");

    if (status !== null) {
      if (status === "success") {
        toast.success(message);
        localStorage.removeItem("_p_a_");
      } else if (status === "failed") {
        toast.error(message);
        localStorage.removeItem("_p_a_");
      }
    }
  };

  useEffect(() => {
    getMessageAfterPayment();
  }, []);

  function userRedirect() {
    Router.push("/account/login");
  }

  useEffect(() => {
    dispatch(toggleDrawerMenu(false));
  }, []);

  useEffect(() => {
    var formdata = new FormData();
    formdata.append("customer_id", authCookie.auth?.id);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(
      `${process.env.NEXT_PUBLIC_CUSTOMER_DASHBOARD}/manage_order`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.response_status === 200) {
          setUsrOrderItems(result.data);
          setUsrOrderItemsSpliced(result.data);
          setLen(result.data.length);
        } else {
          setErr(true);
        }
      })
      .catch((error) => console.log("error", error));
  }, [authCookie.auth]);

  useEffect(() => {
    if (usrOrderItems.length > 0) {
      const temps = usrOrderItems.map((data, index) => {
        if (index >= offset && index < spliceNO) return data;
      });
      setUsrOrderItemsSpliced(temps);
    }
  }, [usrOrderItems, spliceNO]);

  const accountLinks = [
    {
      text: "Account Information",
      url: "/account/user-information",
      icon: "icon-user",
    },
    {
      text: "Invoices",
      url: "/account/invoices",
      icon: "icon-papers",
      active: true,
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

  return (
    <section className="ps-my-account ps-page--account">
      <div className="ps-container">
        <div className="row">
          <div className="col-lg-3">
            <div className="ps-page__left">
              <AccountMenuSidebar data={accountLinks} active />
            </div>
          </div>

          <div className="col-lg-9">
            <div className="ps-page__content">
              <div className="ps-section--account-setting">
                <div className="ps-section__header">
                  <h3>Invoices</h3>
                </div>
                <div className="ps-section__content">
                  <TableOrdersItems usrOrderItems={usrOrderItems} err={err} />
                  {/* <TableInvoices
                    usrOrderItems={usrOrderItemsSpliced}
                    err={err}
                  /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Invoices;
