import Link from "next/link";
import React from "react";

const BreadCrumb = ({ breacrumb, layout, campaign_name }) => {
  return (
    <div className="ps-breadcrumb">
      <div className={layout === "fullwidth" ? "ps-container" : "container"}>
        <ul className="breadcrumb">
          {breacrumb.map((item, index) => {
            if (!item.url) {
              return <li key={index}>{item.text}</li>;
            } else {
              return (
                <li key={item.text}>
                  <Link href={item.url}>
                    <a>{item.text}</a>
                  </Link>
                </li>
              );
            }
          })}

          {campaign_name && (
            <li>
              <strong>{campaign_name}</strong>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default BreadCrumb;
