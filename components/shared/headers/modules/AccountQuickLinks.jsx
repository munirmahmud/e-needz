import { remove } from "js-cookie";
import Link from "next/link";
import Router from "next/router";
import { useCookies } from "react-cookie";
import { connect, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { logOutSuccess } from "~/store/auth/action";

const AccountQuickLinks = (props) => {
  const dispatch = useDispatch();
  const [authCookie, setAuthCookie, removeCookie] = useCookies(["auth"]);

  const handleLogout = (e) => {
    e.preventDefault();
    removeCookie("auth");
    dispatch(logOutSuccess());
    // dispatch(logOut());
    remove("auth");
    toast.success("You successfully logged out!");
    localStorage.removeItem("paymentInfo");
    localStorage.removeItem("paymentGateway");
    localStorage.removeItem("p_info");
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
      text: "Track Order",
      url: "/account/order-tracking",
    },
    {
      text: "Payment History",
      url: "/account/payment-history",
    },
    {
      text: "Wishlist",
      url: "/account/wishlist",
    },
    {
      text: "Address",
      url: "/account/address",
    },
    {
      text: "Change Password",
      url: "/account/change-password",
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

  if (isLoggedIn) {
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
