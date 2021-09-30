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

  const [isOpenModal, setOpenModal] = useState(false);
  const [isPaymentAmountSubmitted, setPaymentAmountSubmitted] = useState(false);

  useEffect(() => {
    setPaymentInformation(JSON.parse(localStorage.getItem("p_info")));

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
  }, [authCookie.auth]);

  const handlePayment = (e) => {
    e.preventDefault();

    const bankInLowercase = e.currentTarget.dataset.bankname.toLowerCase();
    const bankName = bankInLowercase.split(" ")[0];

    if (bankName === "bank") {
      localStorage.setItem("paymentGateway", bankName);
      Router.push(
        `/account/payment/${bankName}-${paymentInformation.order_id}`
      );
      return;
    } else {
      localStorage.setItem("paymentGateway", bankName);
      setOpenModal(true);
    }
  };

  const destroyModal = () => {
    Modal.destroyAll();
  };
  const handlePaymentGateway = async (e) => {
    setPaymentAmountSubmitted(true);

    if (!payableAmount || isNaN(Number(payableAmount))) {
      toast.error("Please enter the amount that you want to pay");
      setPaymentAmountSubmitted(false);
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
    formData.append("customer_id", authCookie.auth);
    formData.append("order_id", paymentInformation.order_id);

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
        setPaymentAmountSubmitted(false);
      } else if (paymentGatewayName === "sslcommerz") {
        window.open(`https://${result.data.url}`);
        setOpenModal(false);
        destroyModal();
        setPayableAmount("");
        setPaymentAmountSubmitted(false);
      }
    } else {
      toast.error(result.message);
      setPaymentAmountSubmitted(false);
    }
  };

  return (
    <>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        title="Pay the amount"
        centered
        visible={isOpenModal}
        onOk={() => setOpenModal(false)}
        onCancel={() => setOpenModal(false)}
        footer={null}
        destroyOnClose={true}
      >
        <div className="form-group">
          <label htmlFor="grand_total">Grand Total</label>
          <input
            type="text"
            value={paymentInformation?.total_amount}
            readOnly
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="paidAmount">Paid amount</label>
          <input
            type="text"
            value={paymentInformation?.paid_amount}
            readOnly
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="due">Due</label>
          <input
            type="text"
            value={paymentInformation?.due_amount}
            readOnly
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="due">
            Paying Amount <span>*</span>
          </label>
          <input
            type="number"
            className="form-control"
            value={payableAmount}
            onChange={(e) => setPayableAmount(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="ps-btn"
          onClick={handlePaymentGateway}
          disabled={isPaymentAmountSubmitted}
        >
          Pay Now
        </button>
      </Modal>
    </>
  );
};

export default connect()(Payment);
