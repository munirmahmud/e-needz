import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { connect } from "react-redux";
import { toast } from "react-toastify";

const Payment = () => {
  const [authCookie] = useCookies(["auth"]);
  const Router = useRouter();

  const [paymentGateways, setPaymentGateways] = useState([]);
  const [paymentData, setPaymentData] = useState({});

  useEffect(() => {
    setPaymentData(JSON.parse(localStorage.getItem("paymentInfo")));

    const getPaymentGateway = async () => {
      let formData = new FormData();

      formData.append("customer_id", authCookie.auth);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CUSTOMER_DASHBOARD}/payment_gateway_list`,
        {
          method: "POST",
          body: formData,
        }
      );
      const result = await response.json();

      if (result?.response_status === 200) {
        const paymentGateways = result?.data.filter(
          (item) => item.customer_dashboard_status === "1"
        );
        setPaymentGateways(paymentGateways);
      } else {
        toast.error(result.message);
      }
    };

    getPaymentGateway();
  }, []);

  const handlePaymentGateway = async (e) => {
    const bankInLowercase = e.currentTarget.dataset.bankname.toLowerCase();
    const bankName = bankInLowercase.split(" ")[0];

    if (bankName === "bank") {
      localStorage.setItem("bankName", bankName);
      Router.push(`/account/payment/${bankName}-${paymentData.order_no}`);
      return;
    }

    let formData = new FormData();

    formData.append("payment_amount", paymentData.total_amount);
    formData.append("payment_method", bankName);
    formData.append("customer_id", authCookie.auth);
    formData.append("order_id", paymentData.order_id);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CUSTOMER_DASHBOARD}/make_payment_submit`,
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();

    if (result?.response_status === 200) {
      if (bankName === "nagad") {
        window.open(`${result.data.url}`);
      } else if (bankName === "sslcommerz") {
        window.open(`https://${result.data.url}`);
      }
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="ps-checkout ps-section--shopping">
      <div className="container">
        <div className="section-white">
          <div className="ps-section__header justify-content-center">
            <h1>Payment Gateways</h1>
          </div>

          <div className="ps-section__content">
            <div className="row">
              <div className="col-xl-7 col-lg-7 col-md-7 col-sm-12">
                <div className="payments-wrapper">
                  {/* <ModulePaymentShipping /> */}
                  {/* <ModulePaymentMethods /> */}

                  <div className="payment-methods">
                    {Array.isArray(paymentGateways) &&
                      paymentGateways.length > 0 &&
                      paymentGateways.map((item) => (
                        <div
                          key={item.id}
                          className="payment-gateway d-flex align-items-center justify-content-center"
                          data-bankname={item.agent}
                          onClick={handlePaymentGateway}
                        >
                          <div className="agent-logo mr-3">
                            {item.agent === "Bank Payment" && (
                              <img
                                src="/static/payments/bank.jpg"
                                alt={item.agent}
                              />
                            )}
                            {item.agent === "Nagad Payment" && (
                              <img
                                src="/static/payments/nagad.png"
                                alt={item.agent}
                              />
                            )}
                            {item.agent === "SSLCOMMERZ" && (
                              <img
                                src="/static/payments/sslcommerz.png"
                                alt={item.agent}
                              />
                            )}
                          </div>

                          <h4>{item.agent}</h4>
                        </div>
                      ))}
                  </div>

                  <div className="ps-block__footer mt-5">
                    <Link href="/account/checkout">
                      <a>
                        <i className="icon-arrow-left mr-2"></i>
                        Return to checkout
                      </a>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 ">
                <div className="ps-form__orders">
                  <div className="ps-block--checkout-order">
                    <div className="ps-block__content">
                      <figure>
                        <figcaption>
                          <strong>Order No</strong>
                          <small>{paymentData?.order_no}</small>
                        </figcaption>
                      </figure>

                      <figure>
                        <figcaption>
                          <strong>Subtotal</strong>
                          <small>
                            <img
                              src="/static/icons/currency-bdt.svg"
                              alt="bdt"
                            />{" "}
                            {paymentData?.total_amount}
                          </small>
                        </figcaption>
                      </figure>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect()(Payment);
