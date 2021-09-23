import React, { useEffect, useState } from "react";
import AccountMenuSidebar from "./modules/AccountMenuSidebar";
import TableInvoices from "./modules/TableInvoices";

const Invoices = () => {
  const [usrOrderItems, setUsrOrderItems] = useState([]);
  const [usrOrderItemsSpliced, setUsrOrderItemsSpliced] = useState([]);
  const [len, setLen] = useState(0);
  const [offset, setOffset] = useState(0);
  const [spliceNO, setSpliceNO] = useState(10);
  const [err, setErr] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(toggleDrawerMenu(false));
  }, []);

  useEffect(() => {
    var formdata = new FormData();
    formdata.append("customer_id", "1508"); /** It has to be dynamic */

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(
      `${process.env.NEXT_PUBLIC_CUSTOMER_DASHBOARD}/manage_order`, /** @TODO Change this into .env file */,
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
  }, []);

  useEffect(() => {
    if (usrOrderItems.length > 0) {
      const temps = usrOrderItems.map((data, index) => {
        if (index > offset && index < spliceNO) return data;
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

          <div className="col-lg-7">
            <div className="ps-page__content">
              <div className="ps-section--account-setting">
                <div className="ps-section__header">
                  <h3>Invoices</h3>
                </div>
                <div className="ps-section__content">
                  <TableInvoices />
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
