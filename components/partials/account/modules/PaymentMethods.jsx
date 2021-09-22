import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const PaymentMethods = () => {
  const [authCookie] = useCookies(["auth"]);
  const [paymentLists, setPaymentLists] = useState([]);

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
      console.log("list", apiData);

      if (apiData.data.response_status === 200) {
        setPaymentLists(apiData.data);
      } else {
        console.log("Payment gateway list");
      }
    };

    getPaymentMethodLists();
  }, []);

  return (
    <div>
      {paymentLists.length &&
        paymentLists.map((payment) => (
          <div key={payment.id} className="form-group">
            <input type="radio" id="html" name="fav_language" value="HTML" />
            <label htmlFor="html">{payment.agent}</label>
          </div>
        ))}
    </div>
  );
};

export default PaymentMethods;
