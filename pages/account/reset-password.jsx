import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import PageContainer from "~/components/layouts/PageContainer";
import FooterFullwidth from "~/components/shared/footers/FooterFullwidth";

const ResetPassword = () => {
  const [authCookie] = useCookies(["auth"]);
  const [isLoading, setLoading] = useState(false);
  const [customerMobile, setCustomerMobile] = useState("");
  const Router = useRouter();

  const [values, setValues] = useState({
    otpCode: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const mobileNo = localStorage.getItem("_p");
    if (mobileNo !== null || mobileNo !== undefined) {
      setCustomerMobile(mobileNo);
    } else {
      return Router.push("/");
    }
  }, [customerMobile]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues({ ...values, [name]: value });
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    var formdata = new FormData();
    formdata.append("customer_mobile", customerMobile);
    formdata.append("otp", values.otpCode);
    formdata.append("password", values.newPassword);
    formdata.append("cpassword", values.confirmPassword);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/confirm_otp_password`,
      requestOptions
    );

    const result = await response.json();
    console.log("confirm_otp_password", result);
    if (result.response_status === 200) {
      toast.success(result.message);

      setLoading(false);

      // Clear the input fields
      setValues({
        otpCode: "",
        newPassword: "",
        confirmPassword: "",
      });

      Router.push("/account/login");
    } else {
      toast.error(result.message);
      setLoading(false);
      setValues({
        otpCode: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  };

  return (
    <PageContainer footer={<FooterFullwidth />} title="Reset Password">
      <section className="ps-my-account ps-page--account">
        <div className="ps-container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="ps-page__content">
                <form
                  className="ps-form--account-setting"
                  onSubmit={handleChangePassword}
                  autoComplete="off"
                >
                  <div className="ps-form__header">
                    <h3 className="text-center">Reset Password</h3>
                  </div>

                  <div className="ps-form__content">
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label htmlFor="otpCode">OTP Code</label>
                          <input
                            id="otpCode"
                            name="otpCode"
                            className="form-control"
                            type="text"
                            placeholder="OTP Code"
                            value={values.otpCode}
                            onChange={handleChange}
                          />
                        </div>
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
                        <div className="form-group">
                          <label htmlFor="confirmPassword">
                            Retype Password
                          </label>
                          <input
                            id="confirmPassword"
                            name="confirmPassword"
                            className="form-control"
                            type="password"
                            placeholder="Confirm Password"
                            value={values.confirmPassword}
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
                        Reset Password
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
  );
};

export default ResetPassword;
