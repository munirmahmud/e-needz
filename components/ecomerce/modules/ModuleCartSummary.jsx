import Link from "next/link";
import React from "react";
import { calculateAmount } from "~/utilities/ecomerce-helpers";

const ModuleCartSummary = ({ source }) => {
  // View
  let productItemsView, amount;
  if (source && source.length > 0) {
    amount = calculateAmount(source);
    productItemsView = source.map((item, index) => (
      <li key={index}>
        <span className="ps-block__estimate">
          <Link
            href="/product/[pid]"
            as={`/product/${item.product_id}-${item.campaign_id}`}
          >
            <a className="ps-product__title">
              {item.title}
              <br /> x {item.quantity}
            </a>
          </Link>
        </span>
      </li>
    ));
  }

  return (
    <>
      <div className="ps-block--shopping-total">
        <div className="ps-block__header">
          <p>
            Subtotal{" "}
            <span>
              {" "}
              <img src="/static/icons/currency-bdt.svg" alt="bdt" /> {amount}
            </span>
          </p>
        </div>
        <div className="ps-block__content">
          {/* <ul className="ps-block__product">{productItemsView}</ul> */}
          <h3>
            Total{" "}
            <span className="d-flex align-items-center">
              <img src="/static/icons/currency-bdt.svg" alt="bdt" height="26" />
              {amount}
            </span>
          </h3>
        </div>
      </div>
    </>
  );
};

export default ModuleCartSummary;
