import { Form, Input } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { connect, useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { loginSuccess } from "~/store/auth/action";

const Login = ({ auth }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [authCookie, setAuthCookie] = useCookies(["auth"]);

  const [phone, setPhone] = useState("01776967480");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    var formdata = new FormData();
    formdata.append("customer_mobile", phone);
    formdata.append("password", password);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/customer_login`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.response_status === 0) {
          toast.error(result.message);
        }
        if (result.response_status === 200) {
          toast.success("Login successful");
          setAuthCookie("auth", result.data.customer_id, { path: "/" });
          setTimeout(() => {
            dispatch(loginSuccess());
            router.push("/");
          }, 3000);
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="ps-my-account">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
      />
      <div className="container">
        <Form className="ps-form--account">
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
                      message: "Please input your phone number!",
                    },
                  ]}
                >
                  <Input
                    className="form-control"
                    type="text"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
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

export default connect((state) => state)(Login);
