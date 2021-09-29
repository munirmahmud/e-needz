import { Form, Input } from "antd";
import Router from "next/router";
import React, { useRef, useState } from "react";
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

  const handleMobileNumber = (e) => {
    emailRef.current.checked = false;
    mobileRef.current.checked = true;

    setMobileHidden(true);
    setEmailHidden(false);
  };

  const handleEmail = (e) => {
    emailRef.current.checked = true;
    mobileRef.current.checked = false;

    setMobileHidden(true);
    setEmailHidden(false);
  };

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
                      checked={true}
                      ref={mobileRef}
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
                    />
                    Email
                  </label>
                </div>

                {!isEmailHidden && (
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
