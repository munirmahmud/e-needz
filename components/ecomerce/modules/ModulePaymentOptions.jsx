import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

const ModulePaymentOptions = ({ paymentInfo }) => {
  const Router = useRouter();
  const [authCookie] = useCookies(["auth"]);
  const paySlipRef = useRef(null);

  const [isPaymentSubmitted, setPaymentSubmitted] = useState(false);
  const [method, setMethod] = useState(1);
  const [attachment, setAttachment] = useState(null);
  const [values, setValues] = useState({
    bankName: "",
    bankAccountNo: "",
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
    setPaymentSubmitted(true);
    let formData = new FormData();

    formData.append("payment_amount", paymentInfo.amount);
    formData.append("payment_method", "bank");
    formData.append("customer_id", authCookie.auth?.id);
    formData.append("order_id", paymentInfo.order_id);
    formData.append("bank_name", values.bankName);
    formData.append("bank_ac_no", values.bankAccountNo);
    formData.append("payment_slip", attachment);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CUSTOMER_DASHBOARD}/make_payment_submit`,
      {
        method: "POST",
        body: formData,
      }
    );
    const result = await response.json();

    if (result?.response_status === 200) {
      toast.success("Your payment has been submitted successfully.");
      setValues({ bankName: "", bankAccountNo: "" });
      setAttachment(null);
      paySlipRef.current.value = "";
      setPaymentSubmitted(false);
      Router.push(`/account/invoice-details/${paymentInfo.order_id}`);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <>
      <h4 className="mb-4">Pay with Bank</h4>

      <div className="ps-block__content">
        <div className="ps-block__tab">
          <form onSubmit={handleSubmit}>
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
                placeholder="Bank Account No"
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
                ref={paySlipRef}
                className="form-control"
                onChange={(e) => setAttachment(e.target.files[0])}
              />
            </div>

            <div className="form-group">
              <button
                type="submit"
                className="ps-btn ps-btn--fullwidth"
                disabled={isPaymentSubmitted}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ModulePaymentOptions;
