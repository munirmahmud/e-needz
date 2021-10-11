import React from "react";
import ModulePaymentOrderSummary from "~/components/partials/account/modules/ModulePaymentOrderSummary";
import FormCheckoutInformation from "./modules/FormCheckoutInformation";

const Checkout = () => {
  return (
    <div className="ps-checkout ps-section--shopping">
      <div className="container">
        <div className="row">
          <div className="col-lg-7 col-md-7 col-sm-12">
            <div className="mb-5">
              <h3>Checkout Information</h3>
            </div>
            <div className="card">
              <div className="card-body">
                <FormCheckoutInformation />
              </div>
            </div>
          </div>

          <div className="col-lg-5 col-md-7 col-sm-12">
            <div className="mb-5">
              <h3>Order Summary</h3>
            </div>
            <div className="card">
              <div className="card-body">
                <div className="ps-form__orders">
                  <ModulePaymentOrderSummary />
                </div>

                <div className="payment-methods">
                  {/* <PaymentMethods /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
