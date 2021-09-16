import React from 'react'
import WidgetProductFeatures from '~/components/shared/widgets/WidgetProductFeatures'
import WidgetSaleOnSite from '~/components/shared/widgets/WidgetSaleOnSite'

const ProductWidgets = () => {
  return (
    <section>
      <WidgetProductFeatures />
      <WidgetSaleOnSite />
      {/* <WidgetShopAds /> */}
      {/* <WidgetProductSameBrands collectionSlug="shop-same-brand" /> */}
    </section>
  )
}

export default ProductWidgets
