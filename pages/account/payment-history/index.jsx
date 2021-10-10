import { Alert } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import PageContainer from "~/components/layouts/PageContainer";
import AccountMenuSidebar from "~/components/partials/account/modules/AccountMenuSidebar";
import FooterFullwidth from "~/components/shared/footers/FooterFullwidth";
import { toggleDrawerMenu } from "~/store/app/action";

const PaymentHistory = ({ auth }) => {
  const dispatch = useDispatch();
  const Router = useRouter();
  const authUser = useSelector((state) => state);

  const [paymentHistory, setPaymentHistory] = useState([]);
  const [paymentHistorySpliced, setPaymentHistorySpliced] = useState([]);
  const [len, setLen] = useState(0);
  const [offset, setOffset] = useState(0);
  const [spliceNO, setSpliceNO] = useState(10);
  const [err, setErr] = useState(false);
  const [authCookie] = useCookies(["auth"]);

  const redirectUser = () => {
    Router.push("/account/login");
  };

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
      `${process.env.NEXT_PUBLIC_CUSTOMER_DASHBOARD}/payment_history`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.response_status === 200) {
          setPaymentHistory(result.data);

          // Filter the array based on order_no
          const unique = [
            ...new Map(
              result.data.map((item) => [item["order_no"], item])
            ).values(),
          ];

          setPaymentHistorySpliced(unique);
          setLen(result.data.length);
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

  const handlePaymentDetails = (e) => {
    localStorage.setItem("order_no", e.target.getAttribute("data-orderno"));
  };

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
          <strong>{item.order_no}</strong>
        </td>
        <td>
          <strong>{item.customer_name}</strong>
        </td>
        <td>
          <strong>৳ {item.payment_amount}</strong>
        </td>

        <td>
          <Link href={`/account/payment-history/${item.order_id}`}>
            <a
              className="ps-btn ps-btn--sm"
              onClick={handlePaymentDetails}
              data-orderno={item.order_no}
            >
              Details
            </a>
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
      text: "Track Order",
      url: "/account/order-tracking",
      icon: "icon-papers",
    },
    {
      text: "Payment History",
      url: "/account/payment-history",
      icon: "icon-cog",
      active: true,
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
    <>
      {auth ? (
        <PageContainer footer={<FooterFullwidth />} title="Payment History">
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
                                <th>Order No</th>
                                <th>Name</th>
                                <th>Amount</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody className="text-center">
                              {tableItemsView}
                            </tbody>
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

export default PaymentHistory;
