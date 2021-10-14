import Link from "next/link";
import React, { useEffect, useState } from "react";
import ElectronicHeaderActions from "~/components/shared/headers/modules/ElectronicHeaderActions";
import SearchHeader from "~/components/shared/headers/modules/SearchHeader";
import { stickyHeader } from "~/utilities/common-helpers";
import NavigationDefault from "../navigation/NavigationDefault";

const HeaderMarketPlace2 = () => {
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

    const result = await response.json();

    if (result?.response_status === 200) {
      setMobileNumber(result?.data?.mobile);
      setEmail(result?.data?.email);
    }
  };

  useEffect(() => {
    getHeaderTopInfo();

    if (process.browser) {
      window.addEventListener("scroll", stickyHeader);
    }
  }, [mobileNumber, email]);

  return (
    <header
      className="header header--standard header--market-place-2"
      id="headerSticky"
    >
      <div className="header__top">
        <div className="ps-container">
          <div className="header__left">
            <ul className="header__top-links d-flex align-items-center">
              {mobileNumber && (
                <li>
                  <Link href={`tel:${mobileNumber}`}>
                    <a className="d-flex align-items-center">
                      <img src="/static/icons/call.svg" alt="Call now" />
                      <span>{mobileNumber}</span>
                    </a>
                  </Link>
                </li>
              )}

              {email && (
                <li>
                  <Link href={`mailto:${email}`}>
                    <a className="d-flex align-items-center">
                      <img
                        src="/static/icons/envelope.svg"
                        alt="Support mail"
                      />
                      <span>{email}</span>
                    </a>
                  </Link>
                </li>
              )}
            </ul>
          </div>

          <div className="header__right">
            <Link href="/account/merchant-account/login">
              <a className="mb-0" style={{ cursor: "pointer" }}>
                <span className="mr-2">
                  <i className="icon-user"></i>
                </span>
                Merchant Account
              </a>
            </Link>
          </div>
        </div>
      </div>

      <div className="header__content">
        <div className="ps-container">
          <div className="header__content-left">
            <Link href="/">
              <a className="ps-logo">
                <img src="/static/icons/logo.svg" alt="E-needz" />
              </a>
            </Link>
          </div>
          <div className="header__content-center">
            <SearchHeader />
          </div>
          <div className="header__content-right">
            <ElectronicHeaderActions />
          </div>
        </div>
      </div>

      <NavigationDefault />
    </header>
  );
};

export default HeaderMarketPlace2;
