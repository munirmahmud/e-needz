import React from 'react'
import BreadCrumb from '~/components/elements/BreadCrumb'
import PageContainer from '~/components/layouts/PageContainer'
import HomeDefaultDealOfDayFP from '~/components/partials/homepage/home-default/HomeDefaultDealOfDayFP'

const ShopDefaultPage = () => {
  const breadCrumb = [
    {
      text: 'Home',
      url: '/',
    },
    {
      text: 'Recommended Products',
    },
  ]

  return (
    <PageContainer title='Shop'>
      <div className='ps-page--shop'>
        <BreadCrumb breacrumb={breadCrumb} layout='fullwidth' />
        {/* <div className='ps-container page-shop'>
          <div className='ps-layout--shop'>
            <div className='ps-layout__left'>
              <WidgetShopCategories />
              <WidgetShopBrands />
              <WidgetShopFilterByPriceRange />
            </div>
            <div className='ps-layout__right'>
              <ProductGroupByCarousel
                collectionSlug='shop-best-seller-items'
                title='Best Sale Items'
              />
              <ProductGroupByCarousel
                collectionSlug='shop-recommend-items'
                title='Recommended Items'
              />
              <ShopItems columns={6} pageSize={18} />
            </div>
          </div>
        </div> */}

        <div className='mb-5' />

        <HomeDefaultDealOfDayFP
          endPoint='/recommended_products'
          dealTitle='Recommended Products'
          carousel
        />

        <div className='mb-5' />
      </div>
    </PageContainer>
  )
}
export default ShopDefaultPage
