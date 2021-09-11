<<<<<<< HEAD
import { Form, Input } from 'antd'
import Link from 'next/link'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Login = () => {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = () => {
    var formdata = new FormData()
    formdata.append('customer_mobile', phone)
    formdata.append('password', password)

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    }

    fetch(
      'http://178.128.30.38/api/react/website_api/customer_login',
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        if (result.response_status === 0) {
          toast.error(result.message, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        }
        if (result.response_status === 200) {
          toast.success(result.message, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        }
      })
      .catch((error) => console.log('error', error))
  }

  return (
    <div className='ps-my-account'>
      <ToastContainer
        position='top-right'
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
      <div className='container'>
        <Form className='ps-form--account'>
          <ul className='ps-tab-list'>
            <li className='active'>
              <Link href='/account/login'>
                <a>Login</a>
              </Link>
            </li>
            <li></li>
          </ul>
          <div className='ps-tab active pb-4' id='sign-in'>
            <div className='ps-form__content'>
              <h5>Log In Your Account</h5>
              <div className='form-group'>
                <Form.Item
                  name='username'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your phone number!',
                    },
                  ]}
                >
                  <Input
                    className='form-control'
                    type='text'
                    placeholder='Phone Number'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Form.Item>
              </div>
              <div className='form-group form-forgot'>
                <Form.Item
                  name='password'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                  ]}
                >
                  <Input
                    className='form-control'
                    type='password'
                    placeholder='Password...'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Item>
              </div>
              <div className='form-group d-flex justify-content-between'>
                <div className='ps-checkbox'>
                  <input
                    className='form-control'
                    type='checkbox'
                    id='remember-me'
                    name='remember-me'
                  />
                  <label htmlFor='remember-me'>Rememeber me</label>
                </div>
                <div className='ps-checkbox'>
                  <Link href='/account/forget-password'>
                    <a>Forget Password</a>
                  </Link>
                </div>
              </div>
              <div className='form-group submit'>
                <button
                  type='submit'
                  className='ps-btn ps-btn--fullwidth'
                  onClick={handleSubmit}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default Login
=======
import { Form, Input, notification } from "antd";
import Link from "next/link";
import Router from "next/router";
import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../../../store/auth/action";

class Login extends Component {
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
            <ul className="ps-tab-list">
              <li className="active">
                <Link href="/account/login">
                  <a>Login</a>
                </Link>
              </li>
              <li></li>
            </ul>
            <div className="ps-tab active pb-4" id="sign-in">
              <div className="ps-form__content">
                <h5>Log In Your Account</h5>
                <div className="form-group">
                  <Form.Item
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
                  </Form.Item>
                </div>
                <div className="form-group form-forgot">
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
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
                <div className="form-group d-flex justify-content-between">
                  <div className="ps-checkbox">
                    <input
                      className="form-control"
                      type="checkbox"
                      id="remember-me"
                      name="remember-me"
                    />
                    <label htmlFor="remember-me">Rememeber me</label>
                  </div>
                  <div className="ps-checkbox">
                    <Link href="/account/forget-password">
                      <a>Forget Password</a>
                    </Link>
                  </div>
                </div>
                <div className="form-group submit">
                  <button type="submit" className="ps-btn ps-btn--fullwidth">
                    Login
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
export default connect(mapStateToProps)(Login);
>>>>>>> master
