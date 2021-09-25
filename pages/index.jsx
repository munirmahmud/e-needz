import { useEffect, useState } from "react";
import PageContainer from "~/components/layouts/PageContainer";
import HomeDefaultBanner from "~/components/partials/homepage/home-default/HomeDefaultBanner";
import HomeDefaultBlockProducts from "~/components/partials/homepage/home-default/HomeDefaultBlockProducts";
import HomeDefaultDealOfDay from "~/components/partials/homepage/home-default/HomeDefaultDealOfDay";
import HomeDefaultTopCategories from "~/components/partials/homepage/home-default/HomeDefaultTopCategories";

const HomepageDefaultPage = () => {
  const [blockItems, setBlockItems] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // Block Products
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/block_products`, {
      method: "POST",
      body: JSON.stringify({
        per_page: 20,
        page_offset: 0,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.response_status === 200) {
          setLoading(!isLoading);
          setBlockItems(res.data);
        }
      });
  }, []);

  return (
    <PageContainer title="Multi vendor biggest ecommerce platform in Bangladesh">
      <main id="homepage-1">
        <HomeDefaultBanner />

        <HomeDefaultDealOfDay
          collectionSlug="deal-of-the-day"
          endPoint="featured_products"
          dealTitle="Featured Products"
          _link="/product/featured"
        />

        <HomeDefaultDealOfDay
          collectionSlug="deal-of-the-day"
          endPoint="best_selling"
          dealTitle="Best Selling"
          _link="/product/best-selling"
        />

        <HomeDefaultDealOfDay
          collectionSlug="deal-of-the-day"
          endPoint="new_arrival"
          dealTitle="New Arrival"
          _link="/product/new-arrival"
        />

        <HomeDefaultTopCategories
          title="Top Categories Of The Month"
          endpoint="top_categories_of_the_month"
          _link="/top-categories"
        />

        <HomeDefaultTopCategories
          title="Shop By Store"
          endpoint="shop_by_store"
          _link="/store"
        />

        <HomeDefaultTopCategories
          title="Shop By Brand"
          endpoint="brand_list"
          _link="/brand"
        />

        {Array.isArray(blockItems) &&
          blockItems?.length &&
          blockItems.map((item) => (
            <HomeDefaultBlockProducts
              key={item?.block_id}
              collectionSlug="deal-of-the-day"
              products={item.product_list}
              dealTitle={item.block_name}
              _link={`/category/${item.block_cat_id}`}
            />
          ))}

        <HomeDefaultDealOfDay
          collectionSlug="deal-of-the-day"
          endPoint="recommended_products"
          dealTitle="Recommended For You"
          _link="/product/recommended-product"
        />
      </main>
    </PageContainer>
  );
};

export default HomepageDefaultPage;
