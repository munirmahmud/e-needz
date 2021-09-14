import React from 'react'
import BreadCrumb from '~/components/elements/BreadCrumb'
import PageContainer from '~/components/layouts/PageContainer'
import HomeDefaultDealOfDayFP from '~/components/partials/homepage/home-default/HomeDefaultDealOfDayFP'
import ShopBrands from '~/components/partials/shop/ShopBrands'

const ShopDefaultPage = () => {
  const breadCrumb = [
    {
      text: 'Home',
      url: '/',
    },
    {
      text: 'Shop',
    },
  ]

  return (
    <PageContainer title='Shop'>
      <div className='ps-page--shop'>
        <BreadCrumb breacrumb={breadCrumb} layout='fullwidth' />
        {/* <div className='ps-container page-shop'>
          <ShopBrands title='Shop By Brand' />
        </div> */}
        <div className='mb-5' />

        <HomeDefaultDealOfDayFP
          collectionSlug='deal-of-the-day'
          dealTitle='All Products'
          endPoint='/all_products'
          carousel
        />

        <div className='mb-5' />
      </div>
    </PageContainer>
  )
}
export default ShopDefaultPage
