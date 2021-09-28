import { useRouter } from "next/router";
import React, { useState } from "react";

const ModulePaymentOptions = () => {
  const Router = useRouter();
  const [method, setMethod] = useState(1);
  const [attachment, setAttachment] = useState(null);
  const [values, setValues] = useState({
    bankName: "",
    bankAccountNo: "",
    paySlip: "",
  });

  function handleChangeMethod(e) {
    setMethod(e.target.value); //e.target.value
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();

    formData.append("payment_amount", "150");
    formData.append("payment_method", "sslcommerz");
    formData.append("customer_id", authCookie.auth);
    formData.append("order_id", paymentData.order_id);
    // formData.append("bank_name", bankName);
    // formData.append("bank_ac_no", authCookie.auth);
    // formData.append("payment_slip", authCookie.auth);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CUSTOMER_DASHBOARD}/make_payment_submit`,
      {
        method: "POST",
        body: formData,
      }
    );
    const result = await response.json();

    if (result?.response_status === 200) {
      setpaymentInfo(result.data);
    }

    // Router.push("/account/payment-success");
  };

  return (
    <>
      <h4 className="mb-5">Pay with Bank</h4>

      <div className="ps-block__content">
        <div className="ps-block__tab">
          <div className="form-group">
            <label htmlFor="bankName">Bank Name</label>
            <input
              id="bankName"
              name="bankName"
              type="text"
              className="form-control"
              placeholder="Enter your bank name"
              value={values.bankName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="bankAccountNo">Account No</label>
            <input
              id="bankAccountNo"
              name="bankAccountNo"
              type="text"
              className="form-control"
              value={values.bankAccountNo}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="paySlip">Pay slip</label>
            <input
              id="paySlip"
              name="paySlip"
              type="file"
              className="form-control"
              onChange={(e) => setAttachment(e.target.files[0])}
            />
          </div>

          <div className="form-group">
            <button
              className="ps-btn ps-btn--fullwidth"
              onClick={(e) => handleSubmit(e)}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModulePaymentOptions;
