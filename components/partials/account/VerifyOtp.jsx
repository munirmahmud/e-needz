import { Form, Input } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const VerifyOtp = () => {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isSubmitted, setSubmitted] = useState(false);
  const [isResendOtpClicked, setResendOtpClicked] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("_p") === null) {
      // return router.push("/");
    } else {
      setPhone(localStorage.getItem("_p"));
    }
  }, []);

  const handleSubmit = () => {
    setSubmitted(true);

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
          // setTimeout(() => {
          //   return router.push("/");
          // }, 2000);
        } else if (result.response_status === 200) {
          localStorage.removeItem("_p");
          setSubmitted(false);

          toast.success(result.message);

          router.push("/account/login");
        }
      })
      .catch((error) => console.log("error", error));
  };

  const OtpResendTimer = () => {
    const total = Date.parse(new Date()) - Date.parse(new Date());
    console.log(total);
  };
  OtpResendTimer();

  const handleResendOtp = (e) => {
    e.preventDefault();
    setResendOtpClicked(true);
    console.log(new Date() + 60000);

    var formdata = new FormData();
    formdata.append("customer_mobile", phone);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    setTimeout(() => setResendOtpClicked(false), 60000);
    // fetch(
    //   `${process.env.NEXT_PUBLIC_API_URL}/customer_otp_validation_mobile`,
    //   requestOptions
    // )
    //   .then((response) => response.json())
    //   .then((result) => {
    //     if (result.response_status === 0) {
    //       toast.error(
    //         "Sorry you can not verify your account. Please contact to the admin!"
    //       );
    //     } else if (result.response_status === 200) {
    //       toast.success(result.message);
    //     }
    //   })
    //   .catch((error) => console.log("error", error));
  };

  return (
    <div className="ps-my-account">
      <div className="container">
        <Form className="ps-form--account">
          <h3 className="text-center mb-5">OTP Verification</h3>

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
                  className="ps-btn ps-btn--fullwidth mb-3"
                  onClick={handleSubmit}
                  disabled={isSubmitted}
                >
                  Submit
                </button>
                {!isResendOtpClicked && (
                  <a href="#" className="pull-right" onClick={handleResendOtp}>
                    Resend OTP
                  </a>
                )}

                {/* {isResendOtpClicked &&
                  setInterval(() => {
                    console.log("Hello");
                  }, 1000)} */}
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default VerifyOtp;
