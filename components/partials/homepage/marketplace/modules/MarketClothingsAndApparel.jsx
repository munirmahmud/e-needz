import Link from 'next/link';
import React, { useEffect } from 'react';
import Slider from 'react-slick';
import ProductSimple from '~/components/elements/products/ProductSimple';
import useGetProducts from '~/hooks/useGetProducts';
import { carouselSingle } from '~/utilities/carousel-helpers';

const MarketClothingsAndApparel = ({ collectionSlug }) => {
    const { productItems, loading, getProductsByCollection } = useGetProducts();

    useEffect(() => {
        getProductsByCollection(collectionSlug);
    }, [collectionSlug]);

    // Views
    let productItemsView;
    if (!loading) {
        if (productItems && productItems.length > 0) {
            productItemsView = productItems.map((item, index) => {
                if (index < 6) {
                    return <ProductSimple product={item} key={item.id} />;
                }
            });
        } else {
            productItemsView = <p>No product found.</p>;
        }
    } else {
        productItemsView = productItemsView = <p>Loading...</p>;
    }

    return (
        <div className="ps-block--products-of-category">
            <div className="ps-block__categories">
                <h3>
                    Clothing & <br /> Apparel
                </h3>
                <ul>
                    <li>
                        <Link href="/shop" as="/shop/best-seller">
                            <a>Best Seller</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/shop" as="/shop/new-arrivals">
                            <a>New Arrivals</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/shop" as="/shop/women">
                            <a>Women</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/shop" as="/shop/men">
                            <a>Men</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/shop" as="/shop/girls">
                            <a>Girls</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/shop" as="/shop/boys">
                            <a>Boys</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/shop" as="/shop/baby">
                            <a>Baby</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/shop" as="/shop/sale-and-deal">
                            <a>Sales & Deals</a>
                        </Link>
                    </li>
                </ul>
                <Link href="/shop">
                    <a className="ps-block__more-link">View All</a>
                </Link>
            </div>
            <div className="ps-block__slider">
                <Slider {...carouselSingle} className="ps-carousel">
                    <a>
                        <img
                            src="/static/img/slider/home-3/clothing-1.jpg"
                            alt="E-needz"
                        />
                    </a>
                    <a>
                        <img
                            src="/static/img/slider/home-3/clothing-2.jpg"
                            alt="E-needz"
                        />
                    </a>
                    <a>
                        <img
                            src="/static/img/slider/home-3/clothing-3.jpg"
                            alt="E-needz"
                        />
                    </a>
                </Slider>
            </div>
            <div className="ps-block__product-box">{productItemsView}</div>
        </div>
    );
};

export default MarketClothingsAndApparel;
