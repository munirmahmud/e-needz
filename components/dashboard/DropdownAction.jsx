import { Dropdown, Menu } from "antd";
import Link from "next/link";
import React from "react";

const DropdownAction = () => {
  const menuView = (
    <Menu className="mr-3">
      <Menu.Item key={0}>
        <Link href="/orders/order-detail/1">
          <a className="dropdown-item">
            <i className="icon-pencil mr-2"></i>
            Edit
          </a>
        </Link>
      </Menu.Item>
      <Menu.Item key={0}>
        <a className="dropdown-item" href="#">
          <i className="icon-trash2 mr-2"></i>
          Delete
        </a>
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={menuView} className="ps-dropdown mr-4">
      <a onClick={(e) => e.preventDefault()} className="ps-dropdown__toggle">
        <i className="icon-ellipsis"></i>
      </a>
    </Dropdown>
  );
};

export default DropdownAction;
