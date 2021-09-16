import { Menu } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

const { SubMenu } = Menu;

const PanelMenu = () => {
  const [rootSubmenuKeys] = useState(["sub1", "sub2", "sub4"]);
  const [openKeys, setOpenKeys] = useState([]);
  const [primaryMenus, setPrimaryMenus] = useState([]);

  const onOpenChange = (e) => {
    const latestOpenKey = primaryMenus.find(
      (key) => primaryMenus.indexOf(key) === -1
    );
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setPrimaryMenus(primaryMenus);
    } else {
      setPrimaryMenus(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const getHeaderTopInfo = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/top_menu`,
      {
        method: "POST",
        body: JSON.stringify({}),
      }
    );

    const apiData = await response.json();

    if (apiData?.response_status === 200) {
      setPrimaryMenus(apiData.data);
    }
  };

  useEffect(() => {
    getHeaderTopInfo();
  }, []);

  return (
    <Menu
      mode="inline"
      openKeys={primaryMenus}
      onOpenChange={onOpenChange}
      className="menu--mobile-2"
    >
      {primaryMenus.map((item, index) => {
        if (item.sub_items) {
          return (
            <SubMenu
              key={index}
              title={
                <Link href={`/category/${item.category_id}`}>
                  <a>{item.category_name}</a>
                </Link>
              }
            >
              {item.sub_items.map((subItem, index) => (
                <Menu.Item key={subItem.category_id}>
                  <Link href={`/category/${subItem.category_id}`}>
                    <a>{subItem.category_name}</a>
                  </Link>
                </Menu.Item>
              ))}
            </SubMenu>
          );
        } else if (item.megaContent) {
          return (
            <SubMenu
              key={index}
              title={
                <Link href={item.url}>
                  <a>{item.text}</a>
                </Link>
              }
            >
              {item.megaContent.map((megaItem) => (
                <SubMenu
                  key={megaItem.heading}
                  title={<span>{megaItem.heading}</span>}
                >
                  {megaItem.megaItems.map((megaSubItem) => (
                    <Menu.Item key={megaSubItem.text}>
                      <Link href={item.url}>
                        <a>{megaSubItem.text}</a>
                      </Link>
                    </Menu.Item>
                  ))}
                </SubMenu>
              ))}
            </SubMenu>
          );
        } else {
          return (
            <Menu.Item key={index}>
              {item.type === "dynamic" ? (
                <Link href={`/category/${item.category_id}/[pid]`}>
                  l<a>{item.category_name}</a>
                </Link>
              ) : (
                <Link href={item.category_id} as={item.alias}>
                  <a>{item.category_name}</a>
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
