import Link from "next/link";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import NextArrow from "~/components/elements/carousel/NextArrow";
import PrevArrow from "~/components/elements/carousel/PrevArrow";
import MediaRepository from "~/repositories/MediaRepository";
import { getItemBySlug } from "~/utilities/product-helper";

const HomeDefaultBanner = () => {
  const [bannerItems, setBannerItems] = useState(null);
  const [campaignItems, setCampaignItems] = useState(null);
  const [promotion1, setPromotion1] = useState(null);
  const [promotion2, setPromotion2] = useState(null);

  async function getBannerItems() {
    const apiCall = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/slider_list`,
      {
        method: "post",
        body: JSON.stringify({
          per_page: "10",
        }),
      }
    );

    const { data } = await apiCall.json();
    if (data) {
      setBannerItems(data);
    }
  }

  async function getCampaignItems() {
    const apiCall = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/campaign_slider_list`,
      {
        method: "POST",
        body: JSON.stringify({
          per_page: "10",
        }),
      }
    );

    const { data } = await apiCall.json();

    if (data) {
      setCampaignItems(data);
    }
  }

  async function getPromotions() {
    const responseData = await MediaRepository.getPromotionsBySlug(
      "home_fullwidth_promotions"
    );
    if (responseData) {
      setPromotion1(getItemBySlug(responseData, "main_1"));
      setPromotion2(getItemBySlug(responseData, "main_2"));
    }
  }

  useEffect(() => {
    getBannerItems();
    getPromotions();
    getCampaignItems();
  }, []);

  const carouselSetting = {
    dots: true,
    infinite: true,
    speed: 750,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const campaignCarouselSetting = {
    dots: false,
    infinite: true,
    speed: 750,
    fade: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  // Main Slider
  let mainCarouselView;
  if (bannerItems) {
    const carouseItems = bannerItems.map((item, id) => (
      <div className="slide-item" key={id}>
        <Link href="/shop">
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

  // Campaign carousel
  let campaignCarouselView;
  if (campaignItems) {
    const carouseItems = campaignItems.map((item, id) => (
      <div className="slide-item" key={id}>
        <Link href="/shop">
          <a
            className="ps-banner-item--default bg--cover"
            style={{
              backgroundImage: `url(${item.slider_image})`,
            }}
          />
        </Link>
      </div>
    ));
    campaignCarouselView = (
      <Slider {...campaignCarouselSetting} className="ps-carousel">
        {carouseItems}
      </Slider>
    );
  }

  return (
    <>
      {/* Main Sldier */}
      <div className="ps-home-banner ps-home-banner--1">
        <div className="ps-container">
          <div style={{ width: "100%", height: "100%" }}>
            {mainCarouselView}
          </div>
        </div>
      </div>

      {/* Campaign Carousel */}
      {campaignItems?.length && (
        <div className="ps-home-banner ps-home-banner--1">
          <div className="ps-container">
            <div style={{ width: "100%", height: "100%" }}>
              {campaignCarouselView}
            </div>
          </div>
        </div>
      )}

      <div className="ps-container small-banners">
        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
            <Link href="/shop">
              <a>
                <img src="/static/banners/banner-1.png" alt="E-needz" />
              </a>
            </Link>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
            <Link href="/shop">
              <a>
                <img src="/static/banners/banner-2.png" alt="E-needz" />
              </a>
            </Link>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
            <Link href="/shop">
              <a>
                <img src="/static/banners/banner-3.png" alt="E-needz" />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeDefaultBanner;
