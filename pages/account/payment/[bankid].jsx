import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { connect } from "react-redux";
import ModulePaymentOptions from "~/components/ecomerce/modules/ModulePaymentOptions";
import PageContainer from "~/components/layouts/PageContainer";
import FooterFullwidth from "~/components/shared/footers/FooterFullwidth";

const Payment = () => {
  const Router = useRouter();
  const { bankid } = Router.query;
  const [paymentData, setPaymentData] = useState({});
  const [authCookie] = useCookies(["auth"]);

  useEffect(() => {
    const paymentInfo = localStorage.getItem("p_info");

    if (paymentInfo === null || paymentInfo === undefined) {
      Router.push("/account/invoices");
    }
    setPaymentData(JSON.parse(paymentInfo));
  }, [bankid]);

  console.log("paymentData", paymentData);

  return (
    <PageContainer footer={<FooterFullwidth />} title="Bank Payment">
      <div className="ps-page--my-account">
        {/* <ModulePaymentMethods /> */}
        <div className="ps-checkout ps-section--shopping">
          <div className="container">
            {/* <div className="section-white"> */}
            <div className="d-flex justify-content-center mb-4">
              <h2>Payment</h2>
            </div>

            <div className="ps-section__content">
              <div className="row">
                <div className="col-lg-8 col-sm-12">
                  <div className="ps-block--shipping card">
                    <div className="p-5">
                      <ModulePaymentOptions paymentInfo={paymentData} />

                      <div className="ps-block__footer mt-5">
                        <Link href="/account/invoices">
                          <a>
                            <i className="icon-arrow-left mr-2"></i>
                            Return to shipping
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-sm-12">
                  <div className="ps-form__orders">
                    <div className="ps-block--checkout-order">
                      <div className="ps-block__content">
                        <figure>
                          <figcaption>
                            <strong>Order No:</strong>
                            <small>{paymentData?.order_no}</small>
                          </figcaption>
                        </figure>

                        <figure>
                          <figcaption>
                            <strong>Paid Amount: </strong>
                            <small className="d-flex">
                              <img
                                src="/static/icons/currency-bdt.svg"
                                alt="bdt"
                              />{" "}
                              {paymentData?.paid_amount}
                            </small>
                          </figcaption>
                        </figure>
                        <figure>
                          <figcaption>
                            <strong>Due: </strong>
                            <small className="d-flex">
                              <img
                                src="/static/icons/currency-bdt.svg"
                                alt="bdt"
                              />{" "}
                              {paymentData?.due_amount}.00
                            </small>
                          </figcaption>
                        </figure>
                        <figure>
                          <figcaption>
                            <strong>Subtotal: </strong>
                            <small className="d-flex">
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
            {/* </div> */}
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default connect()(Payment);
