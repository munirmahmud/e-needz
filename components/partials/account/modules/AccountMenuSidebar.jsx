import { remove } from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { logOutSuccess } from "~/store/auth/action";

const AccountMenuSidebar = ({ data }) => {
  const dispatch = useDispatch();

  const [authCookie, removeCookie] = useCookies(["auth"]);
  const Router = useRouter();

  const handleLogout = (e) => {
    e.preventDefault();
    removeCookie("auth");
    dispatch(logOutSuccess());
    remove("auth");
    toast.success("You successfully logged out!");
    localStorage.removeItem("paymentInfo");
    localStorage.removeItem("paymentGateway");
    localStorage.removeItem("p_info");
    Router.push("/");
  };

  return (
    <aside className="ps-widget--account-dashboard">
      <div className="ps-widget__header">
        <div className="profile-image">
          {authCookie?.auth ? (
            <img src={authCookie.auth?.image} alt={authCookie.auth?.name} />
          ) : (
            <img src="/static/img/users/3.jpg" alt={authCookie.auth?.name} />
          )}
        </div>
        <figure>
          <figcaption>{authCookie.auth?.name}</figcaption>
          <p>{authCookie.auth?.email}</p>
        </figure>
      </div>
      <div className="ps-widget__content">
        <ul>
          {data.map((link) => (
            <li key={link.text} className={link.active ? "active" : ""}>
              <Link href={link.url}>
                <a>
                  <i className={link.icon}></i>
                  {link.text}
                </a>
              </Link>
            </li>
          ))}
          <li>
            <Link href="#">
              <a onClick={handleLogout}>Logout</a>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default AccountMenuSidebar;
