import { Form, Input } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { connect, useDispatch } from "react-redux";
import { toast } from "react-toastify";

const MerchantLogin = ({ auth }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [authCookie, setAuthCookie] = useCookies(["auth"]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    var formdata = new FormData();
    formdata.append("email", email);
    formdata.append("password", password);
    formdata.append("request_url", location.href);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/seller_login`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.response_status === 0) {
          toast.error(result.message);
        }
        if (result.response_status === 200) {
          toast.success(result.message);
          router.push(result.data.url);
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="ps-my-account">
      <div className="container">
        <Form className="ps-form--account">
          <ul className="ps-tab-list">
            <li>
              <Link href="/account/merchant-account/login">
                <a>Login</a>
              </Link>
            </li>
            {/* <li className="active">
              <Link href="/account/merchant-account/register">
                <a>Register</a>
              </Link>
            </li> */}
          </ul>
          <div className="ps-tab active pb-4" id="sign-in">
            <div className="ps-form__content">
              <h4>Merchant Login</h4>
              <div className="form-group">
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your email!",
                    },
                  ]}
                >
                  <Input
                    className="form-control"
                    id="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Item>
              </div>
              <div className="form-group form-forgot">
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your password!",
                    },
                  ]}
                >
                  <Input
                    className="form-control"
                    type="password"
                    placeholder="Password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                <button
                  type="submit"
                  className="ps-btn ps-btn--fullwidth"
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
  );
};

export default connect((state) => state)(MerchantLogin);
