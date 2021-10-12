import Link from "next/link";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import MediaRepository from "~/repositories/MediaRepository";
import { campaignCarousel } from "~/utilities/carousel-helpers";
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
    autoplay: true,
  };

  // Main Slider
  let mainCarouselView;
  if (bannerItems) {
    const carouseItems = bannerItems.map((item, id) => (
      <div className="slide-item" key={id}>
        <Link href={`${item.slider_link}`}>
          <a
            className="ps-banner-item--default bg--cover"
            target="_blank"
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
    const carouseItems = campaignItems.map((item, index) => (
      <div className="slide-item" key={item.campaign_id}>
        <Link href={`/campaign/${item.campaign_id}`}>
          <a className="campaign-banner-item">
            <img src={item.campaign_bannar} alt={item.campaign_name} />
          </a>
        </Link>
      </div>
    ));
    campaignCarouselView = (
      <Slider {...campaignCarousel} className="ps-carousel campaign-carousel">
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
        <div className="ps-container">
          <div className="campaign-carousel-wrapepr">
            {campaignCarouselView}
          </div>
        </div>
      )}
    </>
  );
};

export default HomeDefaultBanner;
