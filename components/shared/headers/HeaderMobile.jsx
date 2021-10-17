import Link from "next/link";
import React, { Component } from "react";
import MobileHeaderActions from "./modules/MobileHeaderActions";

class HeaderMobile extends Component {
  constructor({ props }) {
    super(props);
  }

  render() {
    return (
      <header className="header header--mobile">
        {/* <div className="header__top">
                    <div className="header__left">
                        <p>Welcome to E-needz Online Shopping Store !</p>
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
                                    <a>Track your order</a>
                                </Link>
                            </li>
                            <li>
                                <CurrencyDropdown />
                            </li>
                            <li>
                                <LanguageSwicher />
                            </li>
                        </ul>
                    </div>
                </div> */}

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
            {/* <div className="form-group--nest">
              <input
                className="form-control"
                type="text"
                placeholder="Search..."
              />
              <button>
                <i className="icon-magnifier"></i>
              </button>
            </div> */}
          </form>
        </div>
      </header>
    );
  }
}

export default HeaderMobile;
