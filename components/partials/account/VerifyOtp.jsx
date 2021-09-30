import { Form, Input } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VerifyOtp = () => {
  const router = useRouter();
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (localStorage.getItem("_p") === null) {
      return router.push("/");
    } else {
      setPhone(localStorage.getItem("_p"));
    }
  }, []);

  const [otp, setOtp] = useState("");

  const handleSubmit = () => {
    var formdata = new FormData();
    formdata.append("customer_mobile", phone);
    formdata.append("otp", otp);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/submit_otp_validation`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.response_status === 0) {
          toast.error(result.message);
        } else if (result.response_status === 200) {
          localStorage.removeItem("_p");

          toast.success(result.message);

          router.push("/account/login");
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="ps-my-account">
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
                    onChange={(e) => setOtp(e.target.value)}
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
