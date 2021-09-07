import Link from 'next/link';
import React from 'react';
import { connect } from 'react-redux';
import ModuleProductActions from '~/components/elements/products/modules/ModuleProductActions';
import useProduct from '~/hooks/useProduct';
import { StrapiProductPriceExpanded } from '~/utilities/product-helper';
import Rating from '../Rating';

const ProductDealOfDay = ({ product }) => {
    const { thumbnailImage, badge, title } = useProduct();

    return (
        <div className="ps-product ps-product--inner">
            <div className="ps-product__thumbnail">
                <Link
                    href="/product/[pid]"
                    as={`/product/${product.product_id}-${product.category_id}`}>
                    <a>{thumbnailImage(product)}</a>
                </Link>
                {/* {badge(product)} */}
                {product.on_sale === 1 ? (
                    <small className="product-offer-badge">x% off</small>
                ) : (
                    ''
                )}
                <ModuleProductActions product={product} />
            </div>
            <div className="ps-product__container">
                <Link href="/shop">
                    <a className="ps-product__vendor">
                        {product.seller_store_name}
                    </a>
                </Link>
                <div className="ps-product__content">
                    {StrapiProductPriceExpanded(product)}
                    {/* {title(product)} */}
                    {product.title}
                    <div className="ps-product__rating">
                        <Rating />
                        <span>{product.ratingCount}</span>
                    </div>
                    <button className="ps-btn btn-small">Buy Now</button>
                </div>
            </div>
        </div>
    );
};

export default connect()(ProductDealOfDay);
