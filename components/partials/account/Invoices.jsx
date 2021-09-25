import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import TableOrdersItems from "~/components/dashboard/TableOrdersItems";
import { toggleDrawerMenu } from "~/store/app/action";
import AccountMenuSidebar from "./modules/AccountMenuSidebar";

const Invoices = () => {
  const dispatch = useDispatch();
  const [usrOrderItems, setUsrOrderItems] = useState([]);
  const [usrOrderItemsSpliced, setUsrOrderItemsSpliced] = useState([]);
  const [len, setLen] = useState(0);
  const [offset, setOffset] = useState(0);
  const [spliceNO, setSpliceNO] = useState(10);
  const [err, setErr] = useState(false);
  const [authCookie] = useCookies(["auth"]);

  useEffect(() => {
    dispatch(toggleDrawerMenu(false));
  }, []);

  useEffect(() => {
    var formdata = new FormData();
    formdata.append("customer_id", authCookie.auth); /** It has to be dynamic */

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
      text: "Notifications",
      url: "/account/notifications",
      icon: "icon-alarm-ringing",
    },
    {
      text: "Invoices",
      url: "/account/invoices",
      icon: "icon-papers",
      active: true,
    },
    {
      text: "Address",
      url: "/account/addresses",
      icon: "icon-papers",
    },
    {
      text: "Recent Viewed Product",
      url: "/account/recent-viewed-product",
      icon: "icon-papers",
    },
    {
      text: "Wishlist",
      url: "/account/wishlist",
      icon: "icon-papers",
    },
  ];

  return (
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
              <div className="ps-section--account-setting">
                <div className="ps-section__header">
                  <h3>Invoices</h3>
                </div>
                <div className="ps-section__content">
                  <TableOrdersItems
                    usrOrderItems={usrOrderItemsSpliced}
                    err={err}
                  />
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
