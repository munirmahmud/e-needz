import { Form, Input, notification } from "antd";
import Link from "next/link";
import Router from "next/router";
import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../../../store/auth/action";

class UserConfirmation extends Component {
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
    this.props.dispatch(login());
    Router.push("/");
  };

  render() {
    return (
      <div className="ps-my-account" onClick={(e) => close(e)}>
        <div className="container">
          <Form
            className="ps-form--account"
            onFinish={this.handleLoginSubmit.bind(this)}
          >
            <ul className="ps-tab-list">
              <li className="active">
                <Link href="/account/confirm-registration">
                  <a>Confirm Registration</a>
                </Link>
              </li>
              <li></li>
            </ul>
            <div className="ps-tab active pb-4" id="sign-in">
              <div className="ps-form__content">
                <h5>Enter OTP Code to Verify</h5>
                <div className="form-group">
                  <Form.Item
                    name="username"
                    rules={[
                      {
                        required: true,
                        message:
                          "Please enter the OTP code that was sent to your email!",
                      },
                    ]}
                  >
                    <Input
                      className="form-control"
                      type="text"
                      placeholder="OTP Code"
                    />
                  </Form.Item>
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
export default connect(mapStateToProps)(UserConfirmation);
