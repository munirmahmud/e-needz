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
  const [paymentInfo, setpaymentInfo] = useState([]);

  const getPaymentDetails = async () => {
    let formData = new FormData();

    formData.append("order_id", bankid);
    // formData.append("order_no", "252471");
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
    setPaymentData(JSON.parse(localStorage.getItem("paymentInfo")));

    getPaymentDetails();
  }, [bankid]);

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

  return (
    <PageContainer footer={<FooterFullwidth />} title="Bank Payment">
      <div className="ps-page--my-account">
        {/* <ModulePaymentMethods /> */}
        <div className="ps-checkout ps-section--shopping">
          <div className="container">
            {/* <div className="section-white"> */}
            <div className="ps-section__header justify-content-center">
              <h1>Payment</h1>
            </div>

            <div className="ps-section__content">
              <div className="row">
                <div className="col-lg-9 col-sm-12">
                  <div className="ps-block--shipping card">
                    <div className="p-5">
                      <ModulePaymentOptions />
                      <div className="ps-block__footer">
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

                <div className="col-lg-3 col-sm-12 ">
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
            {/* </div> */}
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default connect()(Payment);
