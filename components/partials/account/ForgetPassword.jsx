import { Form, Input } from "antd";
import Router from "next/router";
import React, { useCallback, useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";

const ForgetPassword = () => {
  const [mobileNo, setMobileNo] = useState("");
  const [email, setEmail] = useState("");

  const [isMobileHidden, setMobileHidden] = useState(false);
  const [isEmailHidden, setEmailHidden] = useState(true);
  const [isMobileChecked, setMobileChecked] = useState(true);
  const [isEmailChecked, setEmailChecked] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);

  const getDerivedStateFromProps = (props) => {
    if (props.isLoggedIn === true) {
      Router.push("/");
    }
    return false;
  };

  const handleMobileNumber = useCallback(() => {
    setEmailChecked(false);
    setMobileChecked(true);
    setMobileHidden(false);
    setEmailHidden(true);
  }, [isMobileHidden]);

  const handleEmail = useCallback(() => {
    setEmailChecked(true);
    setMobileChecked(false);
    setMobileHidden(true);
    setEmailHidden(false);
  }, [isEmailHidden]);

  const handleResetPassword = async (e) => {
    setSubmitted(true);
    const formData = new FormData();
    const reset_option = isMobileChecked ? "mobile" : isEmailChecked && "email";

    formData.append("reset_option", reset_option);
    formData.append("customer_mobile", mobileNo);
    formData.append("customer_email", email);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/password_reset`,
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();

    if (result?.response_status === 200) {
      if (reset_option === "mobile") {
        toast.success(
          "An OTP was sent to your mobile no please check and follow the steps!"
        );
      } else if (reset_option === "email") {
        toast.success(
          "An OTP was sent to your email address please check and follow the steps!"
        );
      }

      localStorage.setItem("_p", mobileNo);
      setTimeout(() => {
        setSubmitted(false);
        Router.push("/account/reset-password");
      }, 1000);
    } else {
      toast.error(result.message);
      setSubmitted(false);
    }
  };

  return (
    <div className="ps-my-account">
      <div className="container">
        <Form
          className="ps-form--account"
          onSubmitCapture={handleResetPassword}
        >
          <div className="ps-tab active pb-4" id="sign-in">
            <div className="ps-form__content forget-password">
              <h5>Select Option</h5>

              <div className="mb-3">
                <div className="d-flex align-items-center mb-3">
                  <label
                    htmlFor="mobile"
                    className="d-flex align-items-center"
                    onClick={handleMobileNumber}
                  >
                    <input
                      className="form-control radio-btn mr-3"
                      type="radio"
                      id="mobile"
                      name="recoverPassword"
                      value="mobile"
                      checked={isMobileChecked}
                      onChange={() => {}}
                    />
                    Mobile
                  </label>
                </div>
                {!isMobileHidden && (
                  <Form.Item
                    name="mobile"
                    rules={[
                      {
                        required: true,
                        message: "Please insert your mobile number!",
                      },
                    ]}
                  >
                    <Input
                      className="form-control"
                      type="number"
                      placeholder="Mobile Number"
                      value={mobileNo}
                      onChange={(e) => setMobileNo(e.target.value)}
                    />
                  </Form.Item>
                )}
              </div>

              <div className="mb-5">
                <div className="mb-3">
                  <label
                    htmlFor="email"
                    className="d-flex align-items-center"
                    onClick={handleEmail}
                  >
                    <input
                      className="form-control radio-btn mr-3"
                      type="radio"
                      id="email"
                      name="recoverPassword"
                      value="email"
                      checked={isEmailChecked}
                      onChange={() => {}}
                    />
                    Email
                  </label>
                </div>
                {!isEmailHidden && (
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Please insert your email!",
                      },
                    ]}
                  >
                    <Input
                      className="form-control"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Item>
                )}
              </div>

              <div className="form-group submit">
                <button
                  type="submit"
                  className="ps-btn ps-btn--fullwidth"
                  disabled={isSubmitted}
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

const mapStateToProps = (state) => {
  return state.auth;
};
export default connect(mapStateToProps)(ForgetPassword);
