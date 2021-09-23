import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const PaymentMethods = () => {
  const [authCookie] = useCookies(["auth"]);
  const [paymentLists, setPaymentLists] = useState([]);
  const [paymentCode, setPaymentCode] = useState("");

  useEffect(() => {
    const getPaymentMethodLists = async () => {
      let formData = new FormData();

      formData.append("customer_id", authCookie.auth);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CUSTOMER_DASHBOARD}/payment_gateway_list`,
        {
          method: "POST",
          body: formData,
        }
      );

      const apiData = await response.json();
      if (apiData.response_status === 200) {
        setPaymentLists(apiData.data);
      } else {
        console.log("Payment gateway list", apiData.message);
      }
    };

    getPaymentMethodLists();
  }, []);

  useEffect(() => {
    localStorage.setItem("p_code", paymentCode);
  }, [paymentCode]);

  return (
    <div>
      {paymentLists.map((payment) => (
        <div key={payment.id} className="mb-2">
          <input
            className="mr-2"
            type="radio"
            id={payment.code}
            name="payment_method"
            value={payment.code}
            onChange={(e) => setPaymentCode(e.target.value)}
          />
          <label htmlFor={payment.code}>{payment.agent}</label>
        </div>
      ))}
    </div>
  );
};

export default PaymentMethods;
