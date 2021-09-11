import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import BreadCrumb from '~/components/elements/BreadCrumb'
import DefaultDescription from '~/components/elements/detail/description/DefaultDescription'
import ProductDetailFullwidth from '~/components/elements/detail/ProductDetailFullwidth'
import SkeletonProductDetail from '~/components/elements/skeletons/SkeletonProductDetail'
import PageContainer from '~/components/layouts/PageContainer'
import HomeDefaultDealOfDay from '~/components/partials/homepage/home-default/HomeDefaultDealOfDay'
import CustomerBought from '~/components/partials/product/CustomerBought'
import ProductWidgets from '~/components/partials/product/ProductWidgets'
import HeaderMobileProduct from '~/components/shared/header-mobile/HeaderMobileProduct'
import HeaderDefault from '~/components/shared/headers/HeaderDefault'
import HeaderMarketPlace2 from '~/components/shared/headers/HeaderMarketPlace2'
import ProductRepository from '~/repositories/ProductRepository'

const ProductDefaultPage = () => {
  const router = useRouter()
  const { pid } = router.query
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(false)

  async function getProduct(pid) {
    setLoading(true)

    if (pid) {
      let responseData = await fetch(
        `http://178.128.30.38/api/react/website_api/product_details`,
        {
          method: 'POST',
          body: JSON.stringify({
            product_id: pid.split('-')[0],
            category_id: pid.split('-')[1],
          }),
        }
      )

      responseData = await responseData.json()

      if (responseData) {
        if (responseData.response_status !== 0) {
          setProduct(responseData.data[0])
        }
        setTimeout(
          function () {
            setLoading(false)
          }.bind(this),
          250
        )
      }
    }
  }

  useEffect(() => {
    if (pid) getProduct(pid)
  }, [pid])

  const breadCrumb = [
    {
      text: 'Home',
      url: '/',
    },
    {
      text: 'Shop',
      url: '/shop',
    },
    {
      text: product ? product.title : 'Loading...',
    },
  ]
  // Views
  let productView, headerView
  if (!loading) {
    if (product) {
      productView = <ProductDetailFullwidth product={product} />
      headerView = (
        <>
          <HeaderMarketPlace2 />
          <HeaderMobileProduct />
        </>
      )
    } else {
      headerView = (
        <>
          <HeaderDefault />
          <HeaderMobileProduct />
        </>
      )
    }
  } else {
    productView = <SkeletonProductDetail />
  }

  return (
    <>
      {/* <HeaderMarketPlace2 /> */}
      <PageContainer
        header={headerView}
        title={product ? product.title : 'Loading...'}
      >
        <BreadCrumb breacrumb={breadCrumb} layout='fullwidth' />
        <div className='ps-page--product'>
          <div className='ps-container'>
            <div className='ps-page__container section-white mb-5'>
              <div className='ps-page__left'>{productView}</div>
              <div className='ps-page__right'>
                <ProductWidgets />
              </div>
            </div>
            <div className='ps-page__container section-white mb-5'>
              <DefaultDescription />
            </div>

            {/* <RelatedProduct collectionSlug="shop-recommend-items" /> */}
          </div>
          <HomeDefaultDealOfDay
            collectionSlug='deal-of-the-day'
            dealTitle='Related Products'
          />
          <div className='ps-container mt-5'>
            <div className='ps-page__container section-white mb-5'>
              <CustomerBought
                layout='fullwidth'
                collectionSlug='deal-of-the-day'
              />
            </div>
          </div>
        </div>
      </PageContainer>
    </>
  )
}

export default ProductDefaultPage
