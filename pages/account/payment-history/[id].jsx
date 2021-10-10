import { Alert } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import PageContainer from "~/components/layouts/PageContainer";
import AccountMenuSidebar from "~/components/partials/account/modules/AccountMenuSidebar";
import FooterFullwidth from "~/components/shared/footers/FooterFullwidth";

const PaymentHistoryDetails = ({ auth }) => {
  const Router = useRouter();
  const { id } = Router.query;

  const [paymentInfo, setpaymentInfo] = useState([]);
  const [orderNo, setOrderNo] = useState("");

  const redirectUser = () => {
    Router.push("/account/login");
  };

  const getPaymentDetails = async () => {
    let formData = new FormData();

    formData.append("order_no", orderNo);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CUSTOMER_DASHBOARD}/payment_details`,
      {
        method: "POST",
        body: formData,
      }
    );
    const result = await response.json();

    if (result?.response_status === 200) {
      setpaymentInfo(result.data);
    }
  };

  useEffect(() => {
    const order_no = localStorage.getItem("order_no");

    if (order_no !== null || order_no !== undefined) {
      setOrderNo(order_no);
    }

    getPaymentDetails();
  }, [orderNo]);

  // status: 1 = pending,2 = approved, 3= cancel
  const getPaymentStatus = (status) => {
    let paymentStatus;
    if (status === "1") {
      //pending
      paymentStatus = <span className="badge-btn alert-info">Pending</span>;
    } else if (status === "2") {
      //approved
      paymentStatus = <span className="badge-btn alert-success">Approved</span>;
    } else if (status === "3") {
      // cancelled
      paymentStatus = <span className="badge-btn alert-error">Cancelled</span>;
    }
    return paymentStatus;
  };

  const handleBankInfo = () => {};

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
        <PageContainer
          footer={<FooterFullwidth />}
          title="Payment History Details"
        >
          <div className="ps-page--my-account">
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
                          <h3>Payment ID #{id}</h3>
                        </div>

                        <div className="ps-section__content">
                          <div className="table-responsive">
                            {Array.isArray(paymentInfo) &&
                            paymentInfo.length > 0 ? (
                              <table className="table">
                                <thead>
                                  <tr>
                                    <th>ID</th>
                                    <th>Payment ID</th>
                                    <th>Date</th>
                                    <th>Order ID</th>
                                    <th>Name</th>
                                    <th>Status</th>
                                    <th>Method</th>
                                    <th>Amount</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {paymentInfo?.map((payment, index) => (
                                    <tr key={payment.payment_id_no}>
                                      <td>{index + 1}</td>
                                      <td>{payment.payment_id_no}</td>
                                      <td>{payment.date}</td>
                                      <td>{payment.order_id}</td>
                                      <td>{payment.customer_name}</td>
                                      <td>
                                        {getPaymentStatus(
                                          payment.payment_status
                                        )}
                                      </td>
                                      <td>{payment.payment_method}</td>
                                      <td>৳ {payment.payment_amount}</td>
                                      {/* <td>
                                      <button
                                        className="ps-btn ps-btn--sm"
                                      >
                                        Payment Details
                                      </button>
                                    </td> */}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            ) : (
                              <Alert
                                message="Sorry no payment history details found"
                                type="info"
                              />
                            )}
                          </div>

                          <Link href="/account/payment-history">
                            <a className="ps-btn ps-btn--sm mt-4">
                              Back to Payment History
                            </a>
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* <TrackOrders order_id={orderInfo?.order_id} /> */}
                  </div>
                </div>
              </div>
            </section>
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

export default PaymentHistoryDetails;
