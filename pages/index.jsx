import React from "react";
import PageContainer from "~/components/layouts/PageContainer";
import HomeDefaultBanner from "~/components/partials/homepage/home-default/HomeDefaultBanner";
import HomeDefaultDealOfDay from "~/components/partials/homepage/home-default/HomeDefaultDealOfDay";
import HomeDefaultTopCategories from "~/components/partials/homepage/home-default/HomeDefaultTopCategories";

const HomepageDefaultPage = () => {
  return (
    <PageContainer title="E-needz | Multi vendor ecommerce platform">
      <main id="homepage-1">
        <HomeDefaultBanner />

        <HomeDefaultDealOfDay
          collectionSlug="deal-of-the-day"
          endPoint="api/react/website_api/featured_products"
          dealTitle="Features Products"
          _link="/FProducts"
        />

        <HomeDefaultDealOfDay
          collectionSlug="deal-of-the-day"
          endPoint="api/react/website_api/best_selling"
          dealTitle="Best Selling"
          _link="/BestSelling"
        />

        <HomeDefaultDealOfDay
          collectionSlug="deal-of-the-day"
          endPoint="api/react/website_api/new_arrival"
          dealTitle="New Arrival"
          _link="/New-arrival"
        />

        <HomeDefaultTopCategories
          title="Top Categories Of The Month"
          endpoint="top_categories_of_the_month"
        />

        <HomeDefaultTopCategories
          title="Shop By Store"
          endpoint="shop_by_store"
        />

        <HomeDefaultTopCategories title="Shop By Brand" endpoint="brand_list" />

        <HomeDefaultDealOfDay
          collectionSlug="deal-of-the-day"
          endPoint="api/react/website_api/recommended_products"
          dealTitle="Recommended For You"
          _link="/Recommended"
        />
      </main>
    </PageContainer>
  );
};

export default HomepageDefaultPage;
