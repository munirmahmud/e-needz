import { Form, notification } from "antd";
import Router from "next/router";
import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../../../store/auth/action";

class ForgetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromProps(props) {
    if (props.isLoggedIn === true) {
      Router.push("/");
    }
    return false;
  }

  handleFeatureWillUpdate(e) {
    e.preventDefault();
    notification.open({
      message: "Opp! Something went wrong.",
      description: "This feature has been updated later!",
      duration: 500,
    });
  }

  handleLoginSubmit = (e) => {
    console.log("test");
    this.props.dispatch(login());
    Router.push("/");
  };

  render() {
    return (
      <div className="ps-my-account">
        <div className="container">
          <Form
            className="ps-form--account"
            onFinish={this.handleLoginSubmit.bind(this)}
          >
            <div className="ps-tab active pb-4" id="sign-in">
              <div className="ps-form__content forget-password">
                <h5>Select Option</h5>
                <div className="mb-3 d-flex align-items-center">
                  <input
                    className="form-control"
                    type="radio"
                    id="mobile"
                    name="recoverPassword"
                    value="mobile"
                    checked
                  />
                  <label htmlFor="mobile">Mobile</label>
                  {/* <div className="ps-checkbox">
                    <input
                      className="form-control"
                      type="radio"
                      id="remember-me"
                      name="remember-me"
                    />
                    <label htmlFor="remember-me">Rememeber me</label>
                  </div> */}

                  {/* <Form.Item
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your email!",
                      },
                    ]}
                  >
                    <Input
                      className="form-control"
                      type="text"
                      placeholder="Username or email address"
                    />
                  </Form.Item> */}
                </div>
                <div className="mb-5 d-flex align-items-center">
                  <input
                    className="form-control"
                    type="radio"
                    id="email"
                    name="recoverPassword"
                    value="email"
                  />
                  <label htmlFor="email">Email</label>
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
  }
}
const mapStateToProps = (state) => {
  return state.auth;
};
export default connect(mapStateToProps)(ForgetPassword);
