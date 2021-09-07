import { Form, Input } from "antd";
import Link from "next/link";
import Router from "next/router";
import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../../../store/auth/action";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch(login());
        Router.push("/account/login");
      } else {
      }
    });
  };

  render() {
    return (
      <div className="ps-my-account">
        <div className="container">
          <Form className="ps-form--account" onSubmit={this.handleSubmit}>
            <ul className="ps-tab-list">
              <li>
                <Link href="/account/login">
                  <a>Login</a>
                </Link>
              </li>
              <li className="active">
                <Link href="/account/register">
                  <a>Register</a>
                </Link>
              </li>
            </ul>
            <div className="ps-tab active" id="register">
              <div className="ps-form__content pb-4">
                <h5>Register An Account</h5>
                <div className="form-group">
                  <Form.Item
                    name="fullName"
                    rules={[
                      {
                        required: true,
                        message: "Please insert your full name!",
                      },
                    ]}
                  >
                    <Input
                      className="form-control"
                      type="text"
                      placeholder="Full Name"
                    />
                  </Form.Item>
                </div>
                <div className="form-group">
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
                      placeholder="Email address"
                    />
                  </Form.Item>
                </div>
                <div className="form-group form-forgot">
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Password is required!",
                      },
                    ]}
                  >
                    <Input
                      className="form-control"
                      type="password"
                      placeholder="Password..."
                    />
                  </Form.Item>
                </div>
                <div className="form-group">
                  <Form.Item
                    name="phone"
                    rules={[
                      {
                        required: true,
                        message: "Phone number is required!",
                      },
                    ]}
                  >
                    <Input
                      className="form-control"
                      type="number"
                      placeholder="Phone Number"
                    />
                  </Form.Item>
                </div>
                <div className="form-group submit">
                  <button type="submit" className="ps-btn ps-btn--fullwidth">
                    Register
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
export default connect(mapStateToProps)(Register);
