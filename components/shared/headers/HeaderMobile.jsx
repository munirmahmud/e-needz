import Link from "next/link";
import React, { useEffect, useState } from "react";
import MobileHeaderActions from "./modules/MobileHeaderActions";

const HeaderMobile = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");

  const getHeaderTopInfo = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/header_top`,
      {
        method: "POST",
        body: JSON.stringify({}),
      }
    );

    const apiData = await response.json();

    if (apiData?.response_status === 200) {
      setMobileNumber(apiData?.data?.mobile);
      setEmail(apiData?.data?.email);
    }
  };

  useEffect(() => {
    getHeaderTopInfo();

    // if (process.browser) {
    //   window.addEventListener("scroll", stickyHeader);
    // }
  }, [mobileNumber, email]);

  return (
    <header className="header header--mobile">
      <div className="header__top">
        <div className="header__left">
          <ul className="header__top-links d-flex align-items-center">
            {mobileNumber && (
              <li className="mr-3">
                <Link href={`tel:${mobileNumber}`}>
                  <a className="d-flex align-items-center">
                    <img src="/static/icons/call.svg" alt="Call now" />
                    <span className="ml-2">{mobileNumber}</span>
                  </a>
                </Link>
              </li>
            )}

            {email && (
              <li>
                <Link href={`mailto:${email}`}>
                  <a className="d-flex align-items-center">
                    <img src="/static/icons/envelope.svg" alt="Support mail" />
                    <span className="ml-2">{email}</span>
                  </a>
                </Link>
              </li>
            )}
          </ul>
        </div>

        <div className="header__right">
          <ul className="navigation__extra">
            <li>
              <Link href="/vendor/become-a-vendor">
                <a>Sell on E-needz</a>
              </Link>
            </li>
            <li>
              <Link href="/account/order-tracking">
                <a>Tract your order</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="navigation--mobile">
        <div className="navigation__left">
          <Link href="/">
            <a className="ps-logo">
              <img src="/static/icons/logo.svg" alt="E-needz" />
            </a>
          </Link>
        </div>
        <MobileHeaderActions />
      </div>
      <div className="ps-search--mobile">
        <form className="ps-form--search-mobile" action="/" method="get">
          <div className="form-group--nest">
            <input
              className="form-control"
              type="text"
              placeholder="Search..."
            />
            <button>
              <i className="icon-magnifier"></i>
            </button>
          </div>
        </form>
      </div>
    </header>
  );
};

export default HeaderMobile;
