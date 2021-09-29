import Link from "next/link";
import { useEffect, useState } from "react";

const ModuleProductDetailDescription = ({ product }) => {
  const [details, setDeatils] = useState();

  useEffect(() => {
    if (product.product_id) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/product_description`, {
        method: "POST",
        body: JSON.stringify({
          product_id: product.product_id,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          setDeatils(res.data[0].description);
        });
    }
  }, [product]);

  return (
    <div className="ps-product__desc">
      <p>
        <strong>Sold BY: </strong>
        <Link href={`/store/${product.seller_id}`}>
          <a> {product.seller_store_name}</a>
        </Link>

        {/* <Link href={`/brands/${product.seller_id}`}>
          <a>
            <strong> {product.vendor}</strong>
          </a>
        </Link> */}
      </p>
      <ul className="ps-list--dot">
        <div dangerouslySetInnerHTML={{ __html: details }}></div>
      </ul>
    </div>
  );
};

export default ModuleProductDetailDescription;
