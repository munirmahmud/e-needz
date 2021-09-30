import { Form, Input } from "antd";
import Router from "next/router";
import React, { useCallback, useRef, useState } from "react";
import { connect } from "react-redux";
import { login } from "../../../store/auth/action";

const ForgetPassword = () => {
  const mobileRef = useRef();
  const emailRef = useRef();

  const [isMobileHidden, setMobileHidden] = useState(false);
  const [isEmailHidden, setEmailHidden] = useState(true);

  const getDerivedStateFromProps = (props) => {
    if (props.isLoggedIn === true) {
      Router.push("/");
    }
    return false;
  };

  const handleMobileNumber = useCallback(() => {
    emailRef.current.checked = false;
    mobileRef.current.checked = true;
    console.log("mobile", isMobileHidden);

    setMobileHidden(true);
    setEmailHidden(false);
  }, [isMobileHidden]);

  const handleEmail = useCallback(() => {
    emailRef.current.checked = true;
    mobileRef.current.checked = false;
    console.log("email", isEmailHidden);

    setMobileHidden(true);
    setEmailHidden(false);
  }, [isEmailHidden]);

  const handleLoginSubmit = (e) => {
    this.props.dispatch(login());
    Router.push("/");
  };

  return (
    <div className="ps-my-account">
      <div className="container">
        <Form className="ps-form--account" onFinish={handleLoginSubmit}>
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
                      checked
                      ref={mobileRef}
                      onChange={() => setEmailHidden(false)}
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
                      ref={emailRef}
                      onChange={() => setMobileHidden(false)}
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
                    />
                  </Form.Item>
                )}
              </div>

              <div className="form-group submit">
                <button type="submit" className="ps-btn ps-btn--fullwidth">
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
