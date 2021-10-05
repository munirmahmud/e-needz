import { Form, Input } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

const Register = () => {
  const route = useRouter();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [disable, setDisable] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setDisable(true);

    if (!name) {
      toast.error("Name is required");
      setDisable(false);
      return;
    } else if (!address) {
      toast.error("Address is required");
      setDisable(false);
      return;
    } else if (!email) {
      toast.error("Email is required");
      setDisable(false);
      return;
    } else if (!phone) {
      toast.error("Phone is required");
      setDisable(false);
      return;
    } else if (!password) {
      toast.error("Password is required");
      setDisable(false);
      return;
    }

    let formData = new FormData();
    formData.append("customer_name", name);
    formData.append("customer_address", address);
    formData.append("customer_mobile", phone);
    formData.append("customer_email", email);
    formData.append("password", password);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/customer_signup`, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log("customer_signup", response);

        if (response.response_status === 0) {
          toast.error(response.message);
          setDisable(false);
        }

        if (response.response_status === 200) {
          localStorage.setItem("_p", phone);

          route.push("/account/otp-verification");
        }
      });
  };

  return (
    <div className="ps-my-account">
      <div className="container">
        <Form className="ps-form--account">
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Item>
              </div>
              <div className="form-group">
                <Form.Item
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: "Please insert your Address!",
                    },
                  ]}
                >
                  <Input
                    className="form-control"
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    type="phone number"
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
                      message: "Password is required!",
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
              <div className="form-group submit">
                <button
                  type="submit"
                  className="ps-btn ps-btn--fullwidth"
                  onClick={handleSubmit}
                  disabled={disable}
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
