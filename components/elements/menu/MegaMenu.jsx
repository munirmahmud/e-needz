import Link from "next/link";
import React from "react";

const MegaMenu = ({ source }) => {
  let megaContentView;

  if (source) {
    megaContentView = (
      <ul className="mega-menu__list">
        {source?.sub_items?.map((item) => (
          <li key={item.category_id}>
            <Link href={item.category_id} as={item.category_id}>
              <a>{item.category_name}</a>
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <li className="menu-item-has-children has-mega-menu">
      <Link href={source.category_id !== "" ? source.category_id : "/"}>
        <a>
          {/* {source.icon && <img src={source.icon} alt={source.text} />} */}
          {source.category_name}
        </a>
      </Link>
      <div className="mega-menu">{megaContentView}</div>
    </li>
  );
};

export default MegaMenu;
