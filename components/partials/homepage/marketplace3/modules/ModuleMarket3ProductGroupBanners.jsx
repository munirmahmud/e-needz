import Link from 'next/link';
import React from 'react';
import Slider from 'react-slick';
import { carouselSingle } from '~/utilities/carousel-helpers';

const ModuleMarket3ProductGroupBanners = ({ type }) => {
    if (type === 'electronic') {
        return (
            <Slider {...carouselSingle} fade={true} className="ps-carousel">
                <div className="item">
                    <Link href="/shop">
                        <a>
                            <img
                                src="/static/img/promotions/home-5/electronic-1.jpg"
                                alt="E-needz"
                            />
                        </a>
                    </Link>
                </div>
                <div className="item">
                    <Link href="/shop">
                        <a>
                            <img
                                src="/static/img/promotions/home-5/electronic-2.jpg"
                                alt="E-needz"
                            />
                        </a>
                    </Link>
                </div>
            </Slider>
        );
    }
    if (type === 'clothing') {
        return (
            <Slider {...carouselSingle} fade={true} className="ps-carousel">
                <div className="item">
                    <Link href="/shop">
                        <a>
                            <img
                                src="/static/img/promotions/home-5/clothing-1.jpg"
                                alt="E-needz"
                            />
                        </a>
                    </Link>
                </div>
                <div className="item">
                    <Link href="/shop">
                        <a>
                            <img
                                src="/static/img/promotions/home-5/clothing-2.jpg"
                                alt="E-needz"
                            />
                        </a>
                    </Link>
                </div>
            </Slider>
        );
    }
    if (type === 'garden') {
        return (
            <Slider {...carouselSingle} fade={true} className="ps-carousel">
                <div className="item">
                    <Link href="/shop">
                        <a>
                            <img
                                src="/static/img/promotions/home-5/kitchen-1.jpg"
                                alt="E-needz"
                            />
                        </a>
                    </Link>
                </div>
                <div className="item">
                    <Link href="/shop">
                        <a>
                            <img
                                src="/static/img/promotions/home-5/kitchen-2.jpg"
                                alt="E-needz"
                            />
                        </a>
                    </Link>
                </div>
            </Slider>
        );
    }
};

export default ModuleMarket3ProductGroupBanners;
