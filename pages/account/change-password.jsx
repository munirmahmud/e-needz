import { useRouter } from "next/router";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import PageContainer from "~/components/layouts/PageContainer";
import AccountMenuSidebar from "~/components/partials/account/modules/AccountMenuSidebar";
import FooterFullwidth from "~/components/shared/footers/FooterFullwidth";

const ChangePassword = ({ auth }) => {
  const Router = useRouter();

  const [authCookie] = useCookies(["auth"]);
  const [isLoading, setLoading] = useState(false);

  const [values, setValues] = useState({
    email: "",
    password: "",
    newPassword: "",
    retypePassword: "",
  });

  const redirectUser = () => {
    Router.push("/account/login");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues({ ...values, [name]: value });
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    var formdata = new FormData();
    formdata.append("customer_id", authCookie.auth?.id);
    formdata.append("email", values.email);
    formdata.append("password", values.password);
    formdata.append("newpassword", values.newPassword);
    formdata.append("retypepassword", values.retypePassword);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CUSTOMER_DASHBOARD}/change_password`,
      requestOptions
    );

    const result = await response.json();

    if (result.response_status === 200) {
      toast.success("Password has been updated successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setLoading(false);

      // Clear the input fields
      setValues({
        email: "",
        password: "",
        newPassword: "",
        retypePassword: "",
      });
    } else {
      toast.error(result.message);
      setLoading(false);
      setValues({
        password: "",
        newPassword: "",
        retypePassword: "",
      });
    }
  };

  const accountLinks = [
    {
      text: "Account Information",
      url: "/account/user-information",
      icon: "icon-user",
    },
    {
      text: "Invoices",
      url: "/account/invoices",
      icon: "icon-papers",
    },
    {
      text: "Track Order",
      url: "/account/order-tracking",
      icon: "icon-papers",
    },
    {
      text: "Payment History",
      url: "/account/payment-history",
      icon: "icon-cog",
    },
    {
      text: "Address",
      url: "/account/address",
      icon: "icon-map-marker",
    },
    {
      text: "Change Password",
      url: "/account/change-password",
      icon: "icon-lock",
      active: true,
    },
  ];

  return (
    <>
      {auth ? (
        <PageContainer footer={<FooterFullwidth />} title="Change Password">
          <section className="ps-my-account ps-page--account">
            <div className="ps-container">
              <div className="row">
                <div className="col-lg-3">
                  <div className="ps-page__left">
                    <AccountMenuSidebar data={accountLinks} />
                  </div>
                </div>

                <div className="col-lg-9">
                  <div className="ps-page__content">
                    <form
                      className="ps-form--account-setting"
                      onSubmit={handleChangePassword}
                      autoComplete="off"
                    >
                      <div className="ps-form__header">
                        <h3>Change Password</h3>
                      </div>

                      <div className="ps-form__content">
                        <div className="row">
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label htmlFor="email">Email</label>
                              <input
                                id="email"
                                name="email"
                                className="form-control"
                                type="text"
                                placeholder="Email"
                                value={values.email}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label htmlFor="password">Old Password</label>
                              <input
                                id="password"
                                name="password"
                                className="form-control"
                                type="password"
                                placeholder="Password"
                                value={values.password}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label htmlFor="newPassword">New Password</label>
                              <input
                                id="newPassword"
                                name="newPassword"
                                className="form-control"
                                type="password"
                                placeholder="New Password"
                                value={values.newPassword}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label htmlFor="retypePassword">
                                Confirm Password
                              </label>
                              <input
                                id="retypePassword"
                                name="retypePassword"
                                className="form-control"
                                type="password"
                                placeholder="Confirm Password"
                                value={values.retypePassword}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="ps-form__submit">
                          <button
                            className="ps-btn success"
                            type="submit"
                            disabled={isLoading}
                          >
                            Update Password
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </PageContainer>
      ) : (
        redirectUser()
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  const cookies = context.req.cookies["auth"];

  let authUser = false;
  if (cookies !== undefined) {
    const auth = JSON.parse(cookies);
    if (auth.id) {
      authUser = true;
    } else {
      authUser = false;
    }
  } else {
    authUser = false;
  }

  return {
    props: {
      auth: authUser,
    },
  };
}

export default ChangePassword;
