import Link from 'next/link';
import React from 'react';
import Rating from '~/components/elements/Rating';

const ModuleDetailTopInformation = ({ product }) => {
    // Views
    let priceView;
    console.log('pop up - ', product);
    if (product.is_sale) {
        priceView = (
            <h4 className="ps-product__price sale">
                <span className="mr-3">{product.price} TK</span>
                <del>{product.sale_price}</del>
            </h4>
        );
    } else {
        priceView = <h4 className="ps-product__price">{product.price} TK</h4>;
    }
    return (
        <header>
            <h1>{product.title}</h1>
            <div className="ps-product__meta">
                <p>
                    Brand:
                    <Link href="/shop">
                        <a className="ml-2 text-capitalize">
                            {product.category_name}
                        </a>
                    </Link>
                </p>
                <div className="ps-product__rating">
                    <Rating />
                    <span>(* review)</span>
                </div>
            </div>
            {priceView}
        </header>
    );
};

export default ModuleDetailTopInformation;
