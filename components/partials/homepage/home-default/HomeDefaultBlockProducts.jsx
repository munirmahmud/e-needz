import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import ProductDealOfDay from '~/components/elements/products/ProductDealOfDay'
import SkeletonProduct from '~/components/elements/skeletons/SkeletonProduct'
import useGetProducts from '~/hooks/useGetProducts'
import { carouselFullwidth } from '~/utilities/carousel-helpers'
import { generateTempArray } from '~/utilities/common-helpers'

const HomeDefaultBlockProducts = ({ dealTitle, products, _link, _cat }) => {
  const { loading, getProductsByCollection } = useGetProducts()
  const [prod, setProd] = useState()
  const [deviceLayout, setDeviceLayout] = useState(null)

  useEffect(() => {
    setDeviceLayout(window.screen.width)
  }, [deviceLayout])

  // Views
  let productItemsView

  if (!loading) {
    if (products?.length > 0) {
      const slideItems = products?.map((item, id) => (
        <ProductDealOfDay product={item} key={id} />
      ))
      productItemsView = (
        <Slider {...carouselFullwidth} className='ps-carousel outside'>
          {slideItems}
        </Slider>
      )
    } else {
      productItemsView = <p>No product(s) found.</p>
    }
  } else {
    const skeletons = generateTempArray(6).map((item, id) => (
      <div className='col-xl-2 col-lg-3 col-sm-3 col-6' key={id}>
        <SkeletonProduct />
      </div>
    ))
    productItemsView = <div className='row'>{skeletons}</div>
  }

  return (
    <div className='ps-deal-of-day'>
      <div className='ps-container'>
        <div className='section-white'>
          <div className='ps-section__header'>
            {dealTitle && (
              <div className='ps-block--countdown-deal'>
                <div className='ps-block__left'>
                  <h3>{dealTitle}</h3>
                </div>
              </div>
            )}

            <div className='search-products'>
              <Link href={`${_link}`}>
                <a className='ps-btn view-all'>View all</a>
              </Link>
            </div>
          </div>

          {/* Showing the products */}

          <div className='ps-section__content special-cat-section'>
            {deviceLayout > 768 ? (
              productItemsView
            ) : (
              <div className='row mobile-layout'>
                {products?.length > 0 &&
                  products?.map((item, id) => (
                    <div className='col-6 mb-4' key={id}>
                      <ProductDealOfDay product={item} />
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeDefaultBlockProducts
