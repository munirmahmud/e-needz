import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import HomeDefaultDealOfDay from '~/components/partials/homepage/home-default/HomeDefaultDealOfDay';
import ShopBrands from '~/components/partials/shop/ShopBrands';

const ShopDefaultPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Shop',
        },
    ];

    return (
        <PageContainer title="Shop">
            <div className="ps-page--shop">
                <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />
                <div className="ps-container page-shop">
                    {/* <ShopBanner /> */}
                    <ShopBrands title="Shop By Brand" />

                    {/* <div className="ps-layout--shop">
                        <div className="ps-layout__left">
                            <WidgetShopCategories />
                            <WidgetShopBrands />
                            <WidgetShopFilterByPriceRange />
                        </div>
                        <div className="ps-layout__right">
                            <ProductGroupByCarousel
                                collectionSlug="shop-best-seller-items"
                                title="Best Sale Items"
                            />
                            <ProductGroupByCarousel
                                collectionSlug="shop-recommend-items"
                                title="Recommended Items"
                            />
                            <ShopItems columns={6} pageSize={18} />
                        </div>
                    </div> */}
                </div>

                <HomeDefaultDealOfDay
                    collectionSlug="deal-of-the-day"
                    dealTitle="All Products"
                    carousel
                />
                <div className="mb-5" />

                <div className="page-shop">
                    <HomeDefaultDealOfDay
                        collectionSlug="deal-of-the-day"
                        dealTitle="Customers who bought this item also bought"
                    />
                </div>
                <div className="mb-5" />
                <HomeDefaultDealOfDay
                    collectionSlug="deal-of-the-day"
                    dealTitle="New Arrival"
                />
                <div className="mb-5" />
            </div>
        </PageContainer>
    );
};
export default ShopDefaultPage;
