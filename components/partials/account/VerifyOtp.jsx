import { Form, Input } from "antd";
import Link from "next/link";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VerifyOtp = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    var formdata = new FormData();
    formdata.append("customer_mobile", phone);
    formdata.append("password", password);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/customer_login`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.response_status === 0) {
          toast.error(result.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        if (result.response_status === 200) {
          toast.success(result.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="ps-my-account">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ToastContainer />
      <div className="container">
        <Form className="ps-form--account">
          <ul className="ps-tab-list">
            <li className="active">
              <Link href="/account/login">
                <a>OTP Verification</a>
              </Link>
            </li>
            <li></li>
          </ul>
          <div className="ps-tab active pb-4" id="sign-in">
            <div className="ps-form__content">
              <h5>Enter Your OTP Code</h5>
              <div className="form-group">
                <Form.Item
                  name="otp_code"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your OTP code!",
                    },
                  ]}
                >
                  <Input
                    className="form-control"
                    type="text"
                    placeholder="OTP Code"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Form.Item>
              </div>

              <div className="form-group submit">
                <button
                  type="submit"
                  className="ps-btn ps-btn--fullwidth"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default VerifyOtp;
