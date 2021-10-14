import { Menu } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

const { SubMenu } = Menu;

const PanelMenu = ({ handleDrawerClose }) => {
  const [rootSubmenuKeys] = useState(["sub1", "sub2", "sub4"]);
  const [openKeys, setOpenKeys] = useState([]);
  const [primaryMenus, setPrimaryMenus] = useState([]);

  const onOpenChange = (myOpenKeys) => {
    const latestOpenKey = myOpenKeys.find(
      (key) => openKeys.indexOf(key) === -1
    );

    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(myOpenKeys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const getHeaderTopInfo = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/mega_menu`,
      {
        method: "POST",
        body: JSON.stringify({}),
      }
    );

    const result = await response.json();

    const mobileMenus = [];

    if (result?.response_status === 200) {
      result.data.map((menu) => {
        const data = {
          text: menu.category_name,
          url: menu.category_id,
          extraClass: "menu-item-has-children has-mega-menu",
          subClass: "sub-menu",
          mega: "true",
          megaContent: menu.sub_items,
        };
        mobileMenus.push(data);
      });

      setPrimaryMenus(mobileMenus);
    }
  };

  useEffect(() => {
    getHeaderTopInfo();
  }, []);

  return (
    <Menu
      mode="inline"
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      className="menu--mobile-2"
    >
      {primaryMenus.map((item, index) => {
        if (item?.subMenu) {
          return (
            <SubMenu
              key={`item-${index}`}
              title={
                <Link href={`/category/${item.url}`}>
                  <a>{item.text}</a>
                </Link>
              }
            >
              {item.subMenu.map((subItem, index) => (
                <Menu.Item key={`subitem-${index}`}>
                  <Link href={`/category/${subItem.url}`}>
                    <a>{subItem.text}</a>
                  </Link>
                </Menu.Item>
              ))}
            </SubMenu>
          );
        } else if (item.megaContent.length > 0) {
          return (
            <SubMenu
              key={item.text}
              title={
                <Link href={`/category/${item.url}`}>
                  <a onClick={() => handleDrawerClose()}>{item.text}</a>
                </Link>
              }
            >
              {/* {console.log("item.megaContent", item.megaContent)} */}
              {item.megaContent.map((megaItem, index) => (
                <SubMenu
                  key={`megaitem-${index + 1}`}
                  title={<span>{megaItem.category_name}</span>}
                >
                  {/* {megaItem.megaItems.map((megaSubItem) => ( */}
                  <Menu.Item>
                    <Link href={`/category/${item.url}`}>
                      <a onClick={() => handleDrawerClose()}>
                        {megaItem.category_name}
                      </a>
                    </Link>
                  </Menu.Item>
                  {/* ))} */}
                </SubMenu>
              ))}
            </SubMenu>
          );
        } else {
          return (
            <Menu.Item key={item.text}>
              {item.type === "dynamic" ? (
                <Link
                  href={`/category/${item.url}/[pid]`}
                  as={`${item.url}/${item.endPoint}`}
                >
                  l<a>{item.text}</a>
                </Link>
              ) : (
                <Link href={`/category/${item.url}`} as={item.alias}>
                  <a onClick={() => handleDrawerClose()}>{item.text}</a>
                </Link>
              )}
            </Menu.Item>
          );
        }
      })}
    </Menu>
  );
};

const mapStateToProps = (state) => {
  return state.setting;
};

export default connect(mapStateToProps)(PanelMenu);
