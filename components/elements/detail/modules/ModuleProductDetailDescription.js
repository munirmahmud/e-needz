import { useEffect, useState } from 'react';
import Link from 'next/link';

const ModuleProductDetailDescription = ({ product }) => {
    const [details, setDeatils] = useState();

    useEffect(() => {
        if (product.product_id) {
            fetch(
                `http://178.128.30.38/api/react/website_api/product_description`,
                {
                    method: 'POST',
                    body: JSON.stringify({
                        product_id: product.product_id,
                    }),
                }
            )
                .then((res) => res.json())
                .then((res) => {
                    console.log(res);
                    setDeatils(res.data[0].description);
                });
        }
    }, [product]);

    return (
        <div className="ps-product__desc">
            <p>
                Sold By: {product.seller_store_name}
                <Link href="/shop">
                    <a>
                        <strong> {product.vendor}</strong>
                    </a>
                </Link>
            </p>
            <ul className="ps-list--dot">
                <div dangerouslySetInnerHTML={{ __html: details }}></div>
            </ul>
        </div>
    );
};

export default ModuleProductDetailDescription;
