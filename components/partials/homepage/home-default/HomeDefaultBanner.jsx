import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import NextArrow from '~/components/elements/carousel/NextArrow';
import PrevArrow from '~/components/elements/carousel/PrevArrow';
import MediaRepository from '~/repositories/MediaRepository';
import { getItemBySlug } from '~/utilities/product-helper';

const HomeDefaultBanner = () => {
    const [bannerItems, setBannerItems] = useState(null);
    const [promotion1, setPromotion1] = useState(null);
    const [promotion2, setPromotion2] = useState(null);

    async function getBannerItems() {
        const response = await fetch(
            'https://e-needz.com/api/react/website_api/slider_list'
        );
        const { data } = await response.json();

        if (data) {
            setBannerItems(data);
        }
    }

    async function getPromotions() {
        const responseData = await MediaRepository.getPromotionsBySlug(
            'home_fullwidth_promotions'
        );
        if (responseData) {
            setPromotion1(getItemBySlug(responseData, 'main_1'));
            setPromotion2(getItemBySlug(responseData, 'main_2'));
        }
    }

    useEffect(() => {
        getBannerItems();
        getPromotions();
    }, []);

    const carouselSetting = {
        dots: false,
        infinite: true,
        speed: 750,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    // Views
    let mainCarouselView;
    if (bannerItems) {
        const carouseItems = bannerItems.map((item) => (
            <div className="slide-item" key={item.slider_id}>
                <Link href={item.slider_link}>
                    <a
                        className="ps-banner-item--default bg--cover"
                        style={{
                            backgroundImage: `url(${item.slider_image})`,
                        }}
                    />
                </Link>
            </div>
        ));
        mainCarouselView = (
            <Slider {...carouselSetting} className="ps-carousel">
                {carouseItems}
            </Slider>
        );
    }
    return (
        <>
            <div className="ps-home-banner ps-home-banner--1">
                <div className="ps-container">
                    <div style={{ width: '100%', height: '100%' }}>
                        {mainCarouselView}
                    </div>
                </div>
            </div>

            <div className="ps-container small-banners">
                <div className="row">
                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                        <Link href="/shop">
                            <a>
                                <img
                                    src="/static/banners/banner-1.png"
                                    alt="E-needz"
                                />
                            </a>
                        </Link>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                        <Link href="/shop">
                            <a>
                                <img
                                    src="/static/banners/banner-2.png"
                                    alt="E-needz"
                                />
                            </a>
                        </Link>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                        <Link href="/shop">
                            <a>
                                <img
                                    src="/static/banners/banner-3.png"
                                    alt="E-needz"
                                />
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeDefaultBanner;
