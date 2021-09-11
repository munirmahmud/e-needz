import Link from "next/link";
import React from "react";

const MenuDropdown = ({ source }) => {
  return (
    <li className="menu-item-has-children dropdown">
      {
        <Link href={source.category_id}>
          <a>{source.category_name}</a>
        </Link>
      }
      {source.sub_items && (
        <ul className={source.subClass}>
          {source.sub_items.map((subMenuItem, index) => (
            <MenuDropdown source={subMenuItem} key={index} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default MenuDropdown;
