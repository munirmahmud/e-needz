import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import PageContainer from "~/components/layouts/PageContainer";
import FooterFullwidth from "~/components/shared/footers/FooterFullwidth";
import { toggleDrawerMenu } from "~/store/app/action";

const PaymentHistory = () => {
  const dispatch = useDispatch();
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [paymentHistorySpliced, setPaymentHistorySpliced] = useState([]);
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
    // formdata.append("customer_id", authCookie.auth);
    formdata.append("customer_id", "BMJUCC22X54NZCN");

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(
      `${process.env.NEXT_PUBLIC_CUSTOMER_DASHBOARD}/payment_history`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("payment_history", result);
        if (result.response_status === 200) {
          setPaymentHistory(result.data);
          setPaymentHistorySpliced(result.data);
          setLen(result.data.length);

          //   setUsrOrderItems(result.data);
          //   setUsrOrderItemsSpliced(result.data);
        } else {
          setErr(true);
        }
      })
      .catch((error) => console.log("error", error));
  }, [authCookie.auth]);

  useEffect(() => {
    if (paymentHistory.length > 0) {
      const temps = paymentHistory.map((data, index) => {
        if (index >= offset && index < spliceNO) return data;
      });
      setPaymentHistorySpliced(temps);
    }
  }, [spliceNO]);

  const tableItemsView = paymentHistorySpliced.map((item, index) => {
    if (item === undefined) return;

    let badgeView, fullfillmentView;

    if (item.order_status === "1") {
      badgeView = <span className="ps-badge success">Pending</span>;
    } else if (item.order_status === "2") {
      badgeView = (
        <span className="ps-badge" style={{ backgroundColor: "yellow" }}>
          Processing
        </span>
      );
    } else if (item.order_status === "3") {
      badgeView = <span className="ps-badge success">Shipping</span>;
    } else if (item.order_status === "4") {
      badgeView = <span className="ps-badge success">Delivered</span>;
    } else if (item.order_status === "5") {
      badgeView = <span className="ps-badge danger">Returned</span>;
    } else if (item.order_status === "6") {
      badgeView = <span className="ps-badge success">Cancelled</span>;
    } else if (item.order_status === "7") {
      badgeView = <span className="ps-badge success">Partial Delivery</span>;
    } else if (item.order_status === "18") {
      badgeView = <span className="ps-badge success">Refunded</span>;
    } else if (item.order_status === "19") {
      badgeView = <span className="ps-badge success">Picked</span>;
    }

    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>
          <strong> {item.payment_id}</strong>
        </td>
        <td>
          <strong> {item.order_id}</strong>
        </td>
        <td>
          <strong> {item.customer_name}</strong>
        </td>
        <td>
          <strong> {item.payment_amount}</strong>
        </td>

        <td>
          <Link href={`/account/payment-history/${item.order_id}`}>
            <a className="ps-badge warning">Details</a>
          </Link>
        </td>
      </tr>
    );
  });

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
    },
    {
      text: "Payment History",
      url: "/account/payment-history",
      icon: "icon-papers",
      active: true,
    },
    {
      text: "Wishlist",
      url: "/account/wishlist",
      icon: "icon-heart",
    },
    {
      text: "Change Password",
      url: "/account/change-password",
      icon: "icon-heart",
    },
  ];

  const accountLinkView = accountLinks.map((item) => (
    <li key={item.text} className={item.active ? "active" : ""}>
      <Link href={item.url}>
        <a>
          <i className={item.icon}></i>
          {item.text}
        </a>
      </Link>
    </li>
  ));

  return (
    <PageContainer footer={<FooterFullwidth />} title="Payment History">
      <section className="ps-my-account ps-page--account">
        <div className="ps-container">
          <div className="row">
            <div className="col-lg-3">
              <div className="ps-page__left">
                <aside className="ps-widget--account-dashboard">
                  <div className="ps-widget__header">
                    <img src="/static/img/users/3.jpg" />
                    <figure>
                      <figcaption>Hello</figcaption>
                      <p>username@gmail.com</p>
                    </figure>
                  </div>
                  <div className="ps-widget__content">
                    <ul className="ps-list--user-links">
                      {accountLinkView}

                      <li>
                        <Link href="/account/my-account">
                          <a>
                            <i className="icon-power-switch"></i>
                            Logout
                          </a>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </aside>
              </div>
            </div>

            <div className="col-lg-9">
              <div className="ps-page__content">
                <div className="ps-section--account-setting">
                  <div className="ps-section__header">
                    <h3>Payment History</h3>
                  </div>

                  <div className="ps-section__content">
                    {err ? (
                      <Alert message="Failed to fetch data" type="error" />
                    ) : (
                      ""
                    )}
                    <div className="table-responsive">
                      <table className="table ps-table">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Payment ID</th>
                            <th>Order ID</th>
                            <th>Name</th>
                            <th>Amount</th>
                            <th>See Details</th>
                          </tr>
                        </thead>
                        <tbody className="text-center">{tableItemsView}</tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageContainer>
  );
};

export default PaymentHistory;
