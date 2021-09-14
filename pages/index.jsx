import React from "react";
import PageContainer from "~/components/layouts/PageContainer";
import HomeDefaultBanner from "~/components/partials/homepage/home-default/HomeDefaultBanner";
import HomeDefaultDealOfDay from "~/components/partials/homepage/home-default/HomeDefaultDealOfDay";
import HomeDefaultTopCategories from "~/components/partials/homepage/home-default/HomeDefaultTopCategories";

const HomepageDefaultPage = () => {
  return (
    <PageContainer title="Multi vendor biggest ecommerce platform in Bangladesh">
      <main id="homepage-1">
        <HomeDefaultBanner />

        <HomeDefaultDealOfDay
          collectionSlug="deal-of-the-day"
          endPoint="featured_products"
          dealTitle="Features Products"
          _link="product/features-product"
        />

        <HomeDefaultDealOfDay
          collectionSlug="deal-of-the-day"
          endPoint="best_selling"
          dealTitle="Best Selling"
          _link="product/best-selling"
        />

        <HomeDefaultDealOfDay
          collectionSlug="deal-of-the-day"
          endPoint="new_arrival"
          dealTitle="New Arrival"
          _link="product/new-arrival"
        />

        <HomeDefaultTopCategories
          title="Top Categories Of The Month"
          endpoint="top_categories_of_the_month"
          _link="top-categories"
        />

        <HomeDefaultTopCategories
          title="Shop By Store"
          endpoint="shop_by_store"
          _link="shop-by-store"
        />

        <HomeDefaultTopCategories
          title="Shop By Brand"
          endpoint="brand_list"
          _link="shop-by-brand"
        />

        <HomeDefaultDealOfDay
          collectionSlug="deal-of-the-day"
          endPoint="recommended_products"
          dealTitle="Recommended For You"
          _link="product/recommended-product"
        />
      </main>
    </PageContainer>
  );
};

export default HomepageDefaultPage;
