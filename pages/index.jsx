import React from 'react';
import PageContainer from '~/components/layouts/PageContainer';
import HomeDefaultBanner from '~/components/partials/homepage/home-default/HomeDefaultBanner';
import HomeDefaultDealOfDay from '~/components/partials/homepage/home-default/HomeDefaultDealOfDay';
import HomeDefaultTopCategories from '~/components/partials/homepage/home-default/HomeDefaultTopCategories';

const HomepageDefaultPage = () => {
    return (
        <PageContainer title="Multipurpose Marketplace React Ecommerce Template">
            <main id="homepage-1">
                <HomeDefaultBanner />
                {/* <SiteFeatures /> */}
                <HomeDefaultDealOfDay
                    collectionSlug="deal-of-the-day"
                    dealTitle="Features Products"
                />
                <HomeDefaultDealOfDay
                    collectionSlug="deal-of-the-day"
                    dealTitle="Best Selling"
                />
                <HomeDefaultDealOfDay
                    collectionSlug="deal-of-the-day"
                    dealTitle="New Arrivale"
                />

                {/* <HomeAdsColumns /> */}

                <HomeDefaultTopCategories title="Top Categories Of The Month" />
                <HomeDefaultTopCategories title="Shop By Store" />

                {/* <HomeDefaultProductListing
                    collectionSlug="consumer-electronics"
                    title="Consumer Electronics"
                />
                <HomeDefaultProductListing
                    collectionSlug="clothings"
                    title="Clothings"
                />
                <HomeDefaultProductListing
                    collectionSlug="garden-and-kitchen"
                    title="Garden & Kitchen"
                /> */}
                {/* <HomeAds /> */}
                <HomeDefaultDealOfDay
                    collectionSlug="deal-of-the-day"
                    dealTitle="Recommended For You"
                />
                {/* <DownLoadApp /> */}
                {/* <NewArrivals collectionSlug="new-arrivals-products" /> */}
                {/* <Newletters /> */}
            </main>
        </PageContainer>
    );
};

export default HomepageDefaultPage;
