import React, { useEffect } from "react";
import { CookiesProvider, useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MasterLayout from "~/components/layouts/MasterLayout";
import "~/public/static/css/bootstrap.min.css";
import "~/public/static/css/slick.min.css";
import "~/public/static/fonts/font-awesome/css/font-awesome.min.css";
import "~/public/static/fonts/Linearicons/Font/demo-files/demo.css";
import "~/scss/autopart.scss";
import "~/scss/electronic.scss";
import "~/scss/furniture.scss";
import "~/scss/home-default.scss";
import "~/scss/market-place-1.scss";
import "~/scss/market-place-2.scss";
import "~/scss/market-place-3.scss";
import "~/scss/market-place-4.scss";
import "~/scss/organic.scss";
import "~/scss/style.scss";
import "~/scss/technology.scss";
import { loginSuccess } from "~/store/auth/action";
import { wrapper } from "~/store/store";

function App({ Component, pageProps }) {
  const [authCookie] = useCookies(["auth"]);
  const dispatch = useDispatch();

  useEffect(() => {
    document.querySelector("body").classList.add("loaded");

    if (authCookie.auth?.id !== undefined) {
      let formdata = new FormData();
      formdata.append("customer_id", authCookie.auth?.id);
      fetch(`${process.env.NEXT_PUBLIC_CUSTOMER_DASHBOARD}/is_valid_customer`, {
        method: "POST",
        body: formdata,
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.response_status === 200) {
            dispatch(loginSuccess());
          }
        });
    }
  });

  return (
    <CookiesProvider>
      <ToastContainer />
      <MasterLayout>
        <Component {...pageProps} />
      </MasterLayout>
    </CookiesProvider>
  );
}

export default wrapper.withRedux(App);
