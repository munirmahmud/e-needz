import { Form, Input } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { connect, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { loginSuccess } from "~/store/auth/action";

const Login = ({ auth }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [authCookie, setAuthCookie] = useCookies(["auth"]);

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const prevUrl = localStorage.getItem("p_url");
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
          toast.success(result.message);
          const profileInfo = {
            id: result.data.customer_id,
            email: result.data.customer_email,
            mobile: result.data.customer_mobile,
            name: result.data.customer_name,
            image: result.data.image,
          };
          setAuthCookie("auth", profileInfo, { path: "/" });

          setTimeout(() => {
            dispatch(loginSuccess());

            localStorage.removeItem("p_url");

            console.log("prevUrl", prevUrl);
            // prevUrl !== undefined ||
            if (prevUrl !== null) {
              router.push(prevUrl);
            } else {
              router.push("/");
            }
            // router.push("/");
          }, 100);

          // setTimeout(() => {
          //   if (prevUrl !== undefined) {
          //     router.push(prevUrl);
          //   } else {
          //     router.push("/");
          //   }
          // }, [])
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="ps-my-account">
      <div className="container">
        <Form className="ps-form--account">
          <ul className="ps-tab-list">
            <li className="active">
              <Link href="/account/login">
                <a>Login</a>
              </Link>
            </li>
            <li>
              <Link href="/account/register">
                <a>Register</a>
              </Link>
            </li>
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
