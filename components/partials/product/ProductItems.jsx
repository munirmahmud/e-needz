import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import ModuleProductActions from '~/components/elements/products/modules/ModuleProductActions'
import ProductWide from '~/components/elements/products/ProductWide'
import Rating from '~/components/elements/Rating'
import SkeletonProduct from '~/components/elements/skeletons/SkeletonProduct'
import ModuleShopSortBy from '~/components/partials/shop/modules/ModuleShopSortBy'
import useProduct from '~/hooks/useProduct'
import { generateTempArray } from '~/utilities/common-helpers'
import { StrapiProductPriceExpanded } from '~/utilities/product-helper'

/*
 * NOTICE!
 * This component just dipslay product items, not fetching data.
 * */

const ProductItems = ({ products, columns = 4 }) => {
  const { thumbnailImage } = useProduct()
  const [listView, setListView] = useState(true)
  const [productItems, setProductItems] = useState(null)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [classes, setClasses] = useState(
    'col-xl-4 col-lg-4 col-md-3 col-sm-6 col-6'
  )

  function handleChangeViewMode(e) {
    e.preventDefault()
    setListView(!listView)
  }

  function handleSetColumns() {
    switch (columns) {
      case 2:
        setClasses('col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 ')
        return 3
        break
      case 4:
        setClasses('col-xl-3 col-lg-4 col-md-6 col-sm-6 col-6')
        return 4
        break
      case 6:
        setClasses('col-xl-2 col-lg-4 col-md-6 col-sm-6 col-6')
        return 6
        break

      default:
        setClasses('col-xl-4 col-lg-4 col-md-3 col-sm-6 col-6')
    }
  }

  useEffect(() => {
    handleSetColumns()
    setTotal(products.length)
    setProductItems(products)
  }, [products])

  // Views
  let productItemsView
  if (!loading) {
    if (productItems && productItems.length > 0) {
      if (listView) {
        const items = productItems.map((product) => (
          <div className='col-xl-2 col-lg-3 col-sm-3 col-6' key={product.id}>
            {/* <Product product={item} /> */}
            <div className='ps-product ps-product--inner'>
              <div className='ps-product__thumbnail'>
                <Link
                  href='/product/[pid]'
                  as={`/product/${product.product_id}-${product.category_id}`}
                >
                  <a>{thumbnailImage(product)}</a>
                </Link>
                {/* {badge(product)} */}
                {product.on_sale === '1' ? (
                  <small className='product-offer-badge'>
                    off ৳ {product.discount_amount}
                  </small>
                ) : (
                  ''
                )}
                <ModuleProductActions product={product} />
              </div>
              <div className='ps-product__container'>
                <Link href={`/store/${product.seller_id}`}>
                  <a
                    className='ps-product__vendor'
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    {' '}
                    <span>{product.seller_store_name}</span>
                    {product.quantity === '0' ? (
                      <span style={{ color: 'red' }}>Out Of stock</span>
                    ) : (
                      ''
                    )}
                  </a>
                </Link>
                <div className='ps-product__content'>
                  {StrapiProductPriceExpanded(product)}
                  {/* {title(product)} */}
                  <Link
                    href='/product/[pid]'
                    as={`/product/${product.product_id}-${product.category_id}`}
                  >
                    <a>{product.title}</a>
                  </Link>
                  <div className='ps-product__rating'>
                    <Rating />
                    <span>{product.ratingCount}</span>
                  </div>
                  <button
                    className='ps-btn btn-small'
                    onClick={() => {
                      handleBuynow()
                    }}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
        productItemsView = (
          <div className='ps-shop-items'>
            <div className='row'>{items}</div>
          </div>
        )
      } else {
        productItemsView = productItems.map((item) => (
          <ProductWide product={item} />
        ))
      }
    } else {
      productItemsView = <p>No product found.</p>
    }
  } else {
    const skeletonItems = generateTempArray(12).map((item) => (
      <div className={classes} key={item}>
        <SkeletonProduct />
      </div>
    ))
    productItemsView = <div className='row'>{skeletonItems}</div>
  }

  return (
    <div className='ps-shopping pb-5'>
      <div className='ps-shopping__header mt-4 mb-4'>
        <p>
          <strong className='mr-2'>{total}</strong>
          Products found
        </p>

        <div className='ps-shopping__actions'>
          <ModuleShopSortBy />
          <div className='ps-shopping__view'>
            <p>View</p>
            <ul className='ps-tab-list'>
              <li className={listView === true ? 'active' : ''}>
                <a href='#' onClick={(e) => handleChangeViewMode(e)}>
                  <i className='icon-grid'></i>
                </a>
              </li>
              <li className={listView !== true ? 'active' : ''}>
                <a href='#' onClick={(e) => handleChangeViewMode(e)}>
                  <i className='icon-list4'></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className='section-white'>{productItemsView}</div>
      {/* <div className="ps-shopping__content"></div> */}
    </div>
  )
}

export default ProductItems
