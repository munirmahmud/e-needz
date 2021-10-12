import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { connect } from "react-redux";
import ModuleCartSummary from "~/components/ecomerce/modules/ModuleCartSummary";
import ModuleEcomerceCartItems from "~/components/ecomerce/modules/ModuleEcomerceCartItems";
import BreadCrumb from "~/components/elements/BreadCrumb";
import PageContainer from "~/components/layouts/PageContainer";
import FooterFullwidth from "~/components/shared/footers/FooterFullwidth";
import useEcomerce from "~/hooks/useEcomerce";

const ShoppingCartScreen = ({ ecomerce }) => {
  const { products, getProducts } = useEcomerce();
  const Router = useRouter();
  const [authCookie] = useCookies(["auth"]);

  useEffect(() => {
    if (ecomerce.cartItems) {
      getProducts(ecomerce.cartItems, "cart");
    }
  }, [ecomerce]);

  const handleConfirmOrder = () => {
    if (authCookie.auth?.id !== undefined && authCookie.auth?.id !== "") {
      Router.push("/account/checkout");
      return;
    }
    localStorage.setItem("p_url", location.pathname);
    Router.push("/account/login");
  };

  const breadCrumb = [
    {
      text: "Home",
      url: "/",
    },
    {
      text: "Shopping Cart",
    },
  ];

  // View
  let contentView;
  if (products) {
    if (products.length > 0) {
      contentView = (
        <>
          <div className="ps-section__content">
            <ModuleEcomerceCartItems cartItems={products} />
            <div className="ps-section__cart-actions">
              <Link href="/shop">
                <a className="ps-btn">Continue Shopping</a>
              </Link>
            </div>
          </div>
          <div className="ps-section__footer">
            <div className="row justify-space-between">
              <div className="col-xl-8 col-lg-4 col-md-12 col-sm-12 col-12 ">
                <div className="row">
                  <div className="col-lg-6">
                    {/* <figure>
                      <figcaption>Coupon Discount</figcaption>
                      <div className="form-group">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Enter coupon here..."
                        />
                      </div>
                      <div className="form-group">
                        <button className="ps-btn ps-btn--outline">
                          Apply
                        </button>
                      </div>
                    </figure> */}
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 ">
                <ModuleCartSummary source={products} />
                <button
                  type="button"
                  className="ps-btn ps-btn--fullwidth"
                  onClick={handleConfirmOrder}
                >
                  Confirm Order
                </button>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      contentView = (
        <>
          <div className="ps-section__content">
            <div className="alert alert-info">
              <p className="mb-0">Your cart is currently empty.</p>
            </div>

            <div className="ps-section__cart-actions">
              <Link href="/shop">
                <a className="ps-btn">Back to Shop</a>
              </Link>
            </div>
          </div>
        </>
      );
    }
  } else {
  }

  return (
    <>
      <PageContainer footer={<FooterFullwidth />} title="Shopping Cart">
        <div className="ps-page--simple">
          <BreadCrumb breacrumb={breadCrumb} />
          <div className="ps-section--shopping ps-shopping-cart">
            <div className="container">
              <div className="section-white">
                <div className="ps-section__header justify-content-center">
                  <h1>Shopping Cart</h1>
                </div>
                {contentView}
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </>
  );
};

export default connect((state) => state)(ShoppingCartScreen);
