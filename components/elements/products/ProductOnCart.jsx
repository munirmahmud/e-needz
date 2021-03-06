import React from 'react'
import Link from 'next/link'
import useProduct from '~/hooks/useProduct'

const ProductOnCart = ({ product, children }) => {
  const { thumbnailImage, title } = useProduct()

  return (
    <div className='ps-product--cart-mobile'>
      <div className='ps-product__thumbnail'>
        <Link
          href='/product/[pid]'
          as={`/product/${product.product_id}-${product.category_id}`}
        >
          <a>{thumbnailImage(product)}</a>
        </Link>
      </div>
      <div className='ps-product__content'>
        {title(product)}
        <p>
          <small>
            ৳ {product.on_sale === '1' ? product.offer_price : product.price} x
            {product.quantity}
          </small>
        </p>{' '}
        {children}
      </div>
    </div>
  )
}

export default ProductOnCart
