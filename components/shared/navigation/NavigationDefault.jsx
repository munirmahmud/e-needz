import { notification } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PrimaryMenu from "~/components/elements/menu/PrimaryMenu";
import MenuCategoriesDropdown from "~/components/shared/menus/MenuCategoriesDropdown";

const NavigationDefault = () => {
  const [parentMenu, setparentMenu] = useState([]);
  const userAuth = useSelector((state) => state.auth);

  useEffect(() => {
    getTopMenu();
  }, []);

  async function getTopMenu() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/top_menu`,
      {
        method: "POST",
      }
    );
    const result = await response.json();

    if (result.response_status === 200) {
      setparentMenu(result.data);
    } else {
      console.log("top menu error", result);
    }
  }

  const handleFeatureWillUpdate = (e) => {
    e.preventDefault();
    notification.open({
      message: "Opp! Something went wrong.",
      description: "This feature has been updated later!",
      duration: 500,
    });
  };

  return (
    <nav className="navigation">
      <div className="ps-container nav-container">
        <div className="navigation__left">
          <MenuCategoriesDropdown />
        </div>
        <div className="navigation__right">
          <PrimaryMenu source={parentMenu} className="menu" />

          <ul className="navigation__extra">
            <li className="navigation-text">
              <Link href="/account/order-tracking">
                <a>Tract your order</a>
              </Link>
            </li>
            {/* <li>
                <LanguageSwicher />
              </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavigationDefault;
