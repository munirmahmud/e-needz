import Link from "next/link";
import React from "react";

const PrimaryMegaMenu = ({ source }) => {
  let megaContentView;

  if (source) {
    megaContentView = (
      <ul className="mega-menu__column">
        {source?.sub_items?.map((item, index) => (
          <li key={index}>
            <Link href={`/category/${item.category_id}`}>
              <a>{item.category_name}</a>
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <li className="menu-item-has-children has-mega-menu">
      <Link href={`/category/${source.category_id}`}>
        <a>
          {/* {source.cat_image && (
            <img src={source.cat_image} alt={source.category_name} />
          )} */}
          {source.category_name}
        </a>
      </Link>
      <ul className="mega-menu">{megaContentView}</ul>
    </li>
  );
};

export default PrimaryMegaMenu;
