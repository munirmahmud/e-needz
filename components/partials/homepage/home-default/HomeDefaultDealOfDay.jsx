import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import ProductDealOfDay from '~/components/elements/products/ProductDealOfDay'
import SkeletonProduct from '~/components/elements/skeletons/SkeletonProduct'
import useGetProducts from '~/hooks/useGetProducts'
import { carouselFullwidth } from '~/utilities/carousel-helpers'
import { generateTempArray } from '~/utilities/common-helpers'

const HomeDefaultDealOfDay = ({ dealTitle, endPoint, _link, _cat }) => {
  const { productItems, loading, getProductsByCollection } = useGetProducts()
  const [prod, setProd] = useState()

  useEffect(() => {
    getProductsByCollection({ endPoint: endPoint, perPage: 10, cat_id: _cat })
  }, [endPoint])

  useEffect(() => {
    setProd(productItems)
  }, [productItems])

  // Views
  let productItemsView

  if (!loading) {
    if (productItems && prod.length > 0) {
      const slideItems = prod.map((item, id) => (
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
              <div className='ps-form__input'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Search...'
                  onChange={(e) => {
                    setProd(
                      productItems.filter((data) =>
                        data.title
                          .toLowerCase()
                          .includes(e.target.value.toLowerCase())
                      )
                    )
                  }}
                />
              </div>
              <button className='ps-btn'>
                <img
                  src='/static/icons/magnifiying-glass.svg'
                  alt='Search Products'
                />
              </button>
              <Link href={`${_link}`}>
                <a className='ps-btn view-all'>View all</a>
              </Link>
            </div>
          </div>

          {/* Showing the products */}

          <div className='ps-section__content'>{productItemsView}</div>
        </div>
      </div>
    </div>
  )
}

export default HomeDefaultDealOfDay
