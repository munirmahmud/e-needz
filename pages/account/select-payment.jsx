import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { connect } from "react-redux";
import PageContainer from "~/components/layouts/PageContainer";
import FooterFullwidth from "~/components/shared/footers/FooterFullwidth";
import useEcomerce from "~/hooks/useEcomerce";

const SelectPayment = ({ ecomerce }) => {
  const { products, getProducts } = useEcomerce();
  const Router = useRouter();
  const [authCookie] = useCookies(["auth"]);

  useEffect(() => {
    if (ecomerce.cartItems) {
      getProducts(ecomerce.cartItems, "cart");
    }
  }, [ecomerce]);

  useEffect(() => {
    const getCustomerAddress = async () => {
      let formData = new FormData();

      formData.append("customer_id", authCookie.auth?.id);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CUSTOMER_DASHBOARD}/payment_gateway_list`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();

      //   if (data?.response_status === 200) {
      //     setAddresses(data?.data?.address_list);
      //   }
    };

    getCustomerAddress();
  }, []);

  return (
    <>
      <PageContainer footer={<FooterFullwidth />} title="Shopping Cart">
        <div className="ps-page--simple">
          <div className="ps-section--shopping ps-shopping-cart">
            <div className="container mt-5">
              <h3>Select Payment Method</h3>

              <div className="row">
                <div className="col-lg-7 col-md-7 col-sm-12">
                  <div className="card">
                    <div className="card-body">Pay now</div>
                  </div>
                </div>

                <div className="col-lg-5 col-md-7 col-sm-12">
                  <div className="card">
                    <div className="card-body">
                      <h4>Order Summary</h4>
                      <div className="ps-form__orders">Orders</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </>
  );
};

export default connect((state) => state)(SelectPayment);
