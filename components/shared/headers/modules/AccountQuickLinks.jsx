import { remove } from "js-cookie";
import Link from "next/link";
import Router from "next/router";
import { useCookies } from "react-cookie";
import { connect, useDispatch } from "react-redux";
import { logOut } from "~/store/auth/action";

const AccountQuickLinks = (props) => {
  const dispatch = useDispatch();
  const [authCookie, setAuthCookie, removeCookie] = useCookies(["auth"]);

  const handleLogout = (e) => {
    e.preventDefault();
    removeCookie("auth");
    dispatch(logOut());
    remove("auth");
    Router.push("/");
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
  const { isLoggedIn } = props;

  // View
  const linksView = accountLinks.map((item) => (
    <li key={item.text}>
      <Link href={item.url}>
        <a>{item.text}</a>
      </Link>
    </li>
  ));

  if (isLoggedIn === true) {
    return (
      <div className="ps-block--user-account">
        <i className="icon-user"></i>
        <div className="ps-block__content">
          <ul className="ps-list--arrow">
            {linksView}
            <li className="ps-block__footer">
              <a href="#" onClick={(e) => handleLogout(e)}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div className="ps-block--user-header">
        <div className="ps-block__left">
          <i className="icon-user"></i>
        </div>
        <div className="ps-block__right">
          <Link href="/account/login">
            <a>Login</a>
          </Link>
          <Link href="/account/register">
            <a>Register</a>
          </Link>
        </div>
      </div>
    );
  }
};

export default connect((state) => state)(AccountQuickLinks);
