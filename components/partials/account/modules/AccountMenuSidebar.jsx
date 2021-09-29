import { remove } from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { logOut } from "~/store/auth/action";

const AccountMenuSidebar = ({ data }) => {
  console.log("data", data);
  const dispatch = useDispatch();

  const [authCookie, removeCookie] = useCookies(["auth"]);
  const Router = useRouter();

  const handleLogout = (e) => {
    e.preventDefault();
    removeCookie("auth");
    dispatch(logOut());
    remove("auth");
    Router.push("/");
  };

  return (
    <aside className="ps-widget--account-dashboard">
      <div className="ps-widget__header">
        <img src="/static/img/users/3.jpg" />
        <figure>
          <figcaption>Hello</figcaption>
          <p>username@gmail.com</p>
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
