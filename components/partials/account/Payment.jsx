import { Modal } from "antd";
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
  const [payableAmount, setPayableAmount] = useState("");
  const [paymentInformation, setPaymentInformation] = useState({});

  useEffect(() => {
    setPaymentInformation(JSON.parse(localStorage.getItem("_p_a_")));

    const getPaymentGateway = async () => {
      let formData = new FormData();

      formData.append("customer_id", authCookie.auth?.id);
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
  }, [authCookie.auth]);
  const handlePayment = async (e) => {
    e.preventDefault();

    const bankInLowercase = e.currentTarget.dataset.bankname.toLowerCase();
    const paymentGatewayName = bankInLowercase.split(" ")[0];

    if (paymentGatewayName === "bank") {
      localStorage.setItem("paymentGateway", paymentGatewayName);
      Router.push(
        `/account/payment/${paymentGatewayName}-${paymentInformation.order_id}`
      );
      return;
    } else {
      // if (!payableAmount || isNaN(Number(payableAmount))) {
      //   toast.error("Please enter the amount that you want to pay");
      //   setPaymentAmountSubmitted(false);
      //   return;
      // }
      // else if (isNaN(Number(payableAmount))) {
      //   toast.error("2 Please enter the amount that you want to pay");
      //   setPaymentAmountSubmitted(false);
      //   return;
      // }

      // const paymentGatewayName = localStorage.getItem("paymentGateway");

      let formData = new FormData();

      formData.append("payment_amount", paymentInformation.amount);
      formData.append("payment_method", paymentGatewayName);
      formData.append("customer_id", authCookie.auth?.id);
      formData.append("order_id", paymentInformation.order_id);
      formData.append("response_url", `${location.origin}/account/invoices`);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CUSTOMER_DASHBOARD}/make_payment_submit`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (result?.response_status === 200) {
        if (paymentGatewayName === "nagad") {
          window.open(`${result.data.url}`);
          setOpenModal(false);
          destroyModal();
          setPayableAmount("");
        } else if (paymentGatewayName === "sslcommerz") {
          window.open(`https://${result.data.url}`);
          setOpenModal(false);
          destroyModal();
          setPayableAmount("");
        }
      } else {
        toast.error(result.message);
      }
    }
  };

  const destroyModal = () => {
    Modal.destroyAll();
  };

  const handlePaymentGateway = async (e) => {
    if (!payableAmount || isNaN(Number(payableAmount))) {
      toast.error("Please enter the amount that you want to pay");
      return;
    }
    // else if (isNaN(Number(payableAmount))) {
    //   toast.error("2 Please enter the amount that you want to pay");
    //   setPaymentAmountSubmitted(false);
    //   return;
    // }

    const paymentGatewayName = localStorage.getItem("paymentGateway");

    let formData = new FormData();

    formData.append("payment_amount", payableAmount);
    formData.append("payment_method", paymentGatewayName);
    formData.append("customer_id", authCookie.auth?.id);
    formData.append("order_id", paymentInformation.order_id);
    formData.append("response_url", `${location.origin}/account/invoices`);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CUSTOMER_DASHBOARD}/make_payment_submit`,
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();

    if (result?.response_status === 200) {
      if (paymentGatewayName === "nagad") {
        window.open(`${result.data.url}`);
        setOpenModal(false);
        destroyModal();
        setPayableAmount("");
      } else if (paymentGatewayName === "sslcommerz") {
        window.open(`https://${result.data.url}`);
        setOpenModal(false);
        destroyModal();
        setPayableAmount("");
      }
    } else {
      toast.error(result.message);
    }
  };

  return (
    <>
      <div className="ps-checkout ps-section--shopping">
        <div className="container">
          {/* <div className="section-white"> */}
          <div className="ps-section__header pb-5 justify-content-center">
            <h1>Payment Gateways</h1>
          </div>

          <div className="ps-section__content">
            <div className="row">
              <div className="col-xl-6 offset-xl-3">
                {/* <div className="col-xl-6 offset-xl-3 col-lg-7 col-md-7 col-sm-12"> */}
                <div
                  className="payments-wrapper"
                  style={{ background: "white", padding: 40 }}
                >
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
                          onClick={handlePayment}
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
                    <Link href="/account/invoices">
                      <a>
                        <i className="icon-arrow-left mr-2"></i>
                        Return to Invoice
                      </a>
                    </Link>
                  </div>
                </div>
              </div>

              {/* <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 ">
                  <div className="ps-form__orders">
                    <div className="ps-block--checkout-order">
                      <div className="ps-block__content">
                        <figure>
                          <figcaption>
                            <strong>Order No</strong>
                            <small>{paymentInformation?.order_no}</small>
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
                              {paymentInformation?.total_amount}
                            </small>
                          </figcaption>
                        </figure>

                        <figure>
                          <figcaption>
                            <strong>Paid Amount</strong>
                            <small>
                              <img
                                src="/static/icons/currency-bdt.svg"
                                alt="bdt"
                              />{" "}
                              {paymentInformation?.paid_amount}
                            </small>
                          </figcaption>
                        </figure>
                        <figure>
                          <figcaption>
                            <strong>Due Amount</strong>
                            <small>
                              <img
                                src="/static/icons/currency-bdt.svg"
                                alt="bdt"
                              />{" "}
                              {paymentInformation?.due_amount}
                            </small>
                          </figcaption>
                        </figure>
                      </div>
                    </div>
                  </div>
                </div> */}
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default connect()(Payment);
