import React from 'react';
import PageContainer from '~/components/layouts/PageContainer';
import DownLoadApp from '~/components/partials/commons/DownLoadApp';
import Newletters from '~/components/partials/commons/Newletters';
import HomeAds from '~/components/partials/homepage/home-default/HomeAds';
import HomeAdsColumns from '~/components/partials/homepage/home-default/HomeAdsColumns';
import HomeDefaultBanner from '~/components/partials/homepage/home-default/HomeDefaultBanner';
import HomeDefaultDealOfDay from '~/components/partials/homepage/home-default/HomeDefaultDealOfDay';
import HomeDefaultProductListing from '~/components/partials/homepage/home-default/HomeDefaultProductListing';
import HomeDefaultTopCategories from '~/components/partials/homepage/home-default/HomeDefaultTopCategories';
import NewArrivals from '~/components/partials/homepage/home-default/NewArrivals';
import SiteFeatures from '~/components/partials/homepage/home-default/SiteFeatures';

const HomepageDefaultPage = () => {
    return (
        <PageContainer title="Multipurpose Marketplace React Ecommerce Template">
            <main id="homepage-1">
                <HomeDefaultBanner />
                <SiteFeatures />
                <HomeDefaultDealOfDay collectionSlug="deal-of-the-day" />
                <HomeAdsColumns />
                <HomeDefaultTopCategories />
                <HomeDefaultProductListing
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
                />
                <HomeAds />
                <DownLoadApp />
                <NewArrivals collectionSlug="new-arrivals-products" />
                <Newletters />
            </main>
        </PageContainer>
    );
};

export default HomepageDefaultPage;
