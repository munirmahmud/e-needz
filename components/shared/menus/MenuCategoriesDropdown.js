import Link from "next/link";
import React, { useEffect, useState } from "react";
import MegaMenu from "~/components/elements/menu/MegaMenu";

const MenuCategoriesDropdown = () => {
  const [mData, setMdata] = useState([]);
  const [megaMenuData, setMegaMenu] = useState([]);

  const getCategoryMegaMenu = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/mega_menu`,
      {
        method: "POST",
        body: JSON.stringify({
          per_page: 20,
        }),
      }
    );

    const apiData = await response.json();

    if (apiData?.response_status === 200) {
      setMegaMenu(apiData?.data);
    }
  };

  useEffect(() => {
    getCategoryMegaMenu();

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/category_list`, {
      method: "post",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.response_status === 200) {
          setMdata(res.data);
        }
      });
  }, []);

  return (
    <div className="menu--product-categories">
      <div className="menu__toggle">
        <i className="icon-menu"></i>
        <span>Categories</span>
      </div>
      <div className="menu__content">
        <Menu source={megaMenuData} className="menu--dropdown" />
      </div>
    </div>
  );
};

export default MenuCategoriesDropdown;

const Menu = ({ source, className }) => {
  let menuView;
  if (source) {
    menuView = source.map((item, index) => {
      if (item?.sub_items?.length) {
        return <MegaMenu source={item} key={index} />;
      } else {
        return (
          <li key={index}>
            <Link href={`/category/${item.category_id}`}>
              <a>
                {item.cat_image && (
                  <img
                    src={item.cat_image}
                    alt={item.category_name}
                    className="mr-3"
                  />
                )}
                {item.category_name}
              </a>
            </Link>
          </li>
        );
      }
    });
  } else {
    menuView = (
      <li>
        <a href="#" onClick={(e) => e.preventDefault()}>
          No menu item.
        </a>
      </li>
    );
  }
  return <ul className={className}>{menuView}</ul>;
};

// export default Menu;
