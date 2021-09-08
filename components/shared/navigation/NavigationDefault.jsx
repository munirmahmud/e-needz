import { notification } from "antd";
import Link from "next/link";
import React, { Component } from "react";
import MenuCategoriesDropdown from "~/components/shared/menus/MenuCategoriesDropdown";
import Menu from "../../elements/menu/Menu";
import LanguageSwicher from "../headers/modules/LanguageSwicher";

// const menuMarket2 = [
//     {
//         text: 'Bikes',
//         url: '/category/bikes',
//         icon: '/static/icons/motorcycle.svg',
//     },
//     {
//         text: 'Mobile Phone',
//         url: '/category/bikes',
//         icon: '/static/icons/smartphone.svg',
//     },
//     {
//         text: 'Television',
//         url: '/category/bikes',
//         icon: '/static/icons/television.svg',
//     },
//     {
//         text: 'Gadget',
//         url: '/category/bikes',
//         icon: '/static/icons/webcam.svg',
//     },
// ];

class NavigationDefault extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    parentMenu: [],
  };

  handleFeatureWillUpdate(e) {
    e.preventDefault();
    notification.open({
      message: "Opp! Something went wrong.",
      description: "This feature has been updated later!",
      duration: 500,
    });
  }

  componentDidMount() {
    fetch(`http://178.128.30.38/api/react/website_api/top_menu`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then(({ data }) => {
        this.setState({ parentMenu: data });
      });
  }

  render() {
    return (
      <nav className="navigation">
        <div className="ps-container nav-container">
          <div className="navigation__left">
            <MenuCategoriesDropdown />
          </div>
          <div className="navigation__right">
            <Menu source={this.state.parentMenu} className="menu" />

            <ul className="navigation__extra">
              <li className="navigation-text">
                <Link href="/account/order-tracking">
                  <a>Tract your order</a>
                </Link>
              </li>
              <li>
                <LanguageSwicher />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavigationDefault;
