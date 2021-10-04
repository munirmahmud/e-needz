import { Dropdown, Menu } from "antd";
import Link from "next/link";
import React, { Component } from "react";
import { connect } from "react-redux";
import { logOut } from "../../../../store/auth/action";
class AccountQuickLinks extends Component {
  constructor(props) {
    super(props);
  }

  handleLogout = (e) => {
    e.preventDefault();
    this.props.dispatch(logOut());
  };

  render() {
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
        icon: "icon-papers",
      },
      {
        text: "Wishlist",
        url: "/account/wishlist",
        icon: "icon-heart",
      },
      {
        text: "Change Password",
        url: "/account/change-password",
        icon: "icon-heart",
      },
    ];

    const menu = (
      <Menu>
        {accountLinks.map((link) => (
          <Menu.Item key={link.url}>
            <Link href={link.url}>
              <a>{link.text}</a>
            </Link>
          </Menu.Item>
        ))}

        <Menu.Item>
          <a href="#" onClick={this.handleLogout.bind(this)}>
            Logout
          </a>
        </Menu.Item>
      </Menu>
    );

    return (
      <Dropdown overlay={menu} placement="bottomLeft">
        <a href="#" className="header__extra ps-user--mobile">
          <i className="icon-user"></i>
        </a>
      </Dropdown>
    );
  }
}
const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps)(AccountQuickLinks);
