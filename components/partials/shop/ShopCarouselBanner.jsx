import Link from 'next/link';
import React from 'react';
import Slider from 'react-slick';
import { carouselSingle } from '~/utilities/carousel-helpers';

const ShopCarouselBanner = () => {
    return (
        <div className="ps-shop-banner">
            <Slider {...carouselSingle} className="ps-carousel inside">
                <div className="item">
                    <Link href="/shop">
                        <img
                            src="/static/img/slider/shop-default/1.jpg"
                            alt="E-needz"
                        />
                    </Link>
                </div>
                <div className="item">
                    <Link href="/shop">
                        <img
                            src="/static/img/slider/shop-default/2.jpg"
                            alt="E-needz"
                        />
                    </Link>
                </div>
            </Slider>
        </div>
    );
};

export default ShopCarouselBanner;
