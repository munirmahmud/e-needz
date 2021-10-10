import Link from "next/link";
import React from "react";
import MegaMenu from "~/components/elements/menu/MegaMenu";
import PrimaryMegaMenu from "./PrimaryMegaMenu";

const PrimaryMenu = ({ source, className }) => {
  let menuView;
  if (source) {
    menuView = source.map((item, index) => {
      if (item?.sub_items?.length) {
        return <PrimaryMegaMenu source={item} key={index} />;
      } else if (item.megaContent) {
        return <MegaMenu source={item} key={index} />;
      } else {
        return (
          <li key={index}>
            <Link href={`/category/${item.category_id}`}>
              <a>
                {/* {item.cat_image && (
                  <img
                    src={item.cat_image}
                    alt={item.category_name}
                    className="mr-3"
                  />
                )} */}
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

export default PrimaryMenu;
