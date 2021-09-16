import React, { useEffect, useState } from 'react'
import BreadCrumb from '~/components/elements/BreadCrumb'
import PageContainer from '~/components/layouts/PageContainer'
import ProductItems from '~/components/partials/product/ProductItems'
import FooterDefault from '~/components/shared/footers/FooterDefault'

const Campaign = () => {
  const [category, setCategory] = useState(null)
  const [loading, setLoading] = useState(false)

  async function getCategry() {
    setLoading(true)

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/campaign_slider_list`, {
      method: 'POST',
      body: JSON.stringify({
        per_page: 200,
        page_offset: 0,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        setCategory(result.data)
        setLoading(false)
      })
      .catch((error) => console.log('error', error))

    // const responseData = await ProductRepository.getProductsByCategory(slug);
    // if (responseData) {
    //   setCategory(responseData);
    //   setTimeout(
    //     function () {
    //       setLoading(false);
    //     }.bind(this),
    //     250
    //   );
    // }
  }

  useEffect(() => {
    getCategry()
  }, [])

  const breadCrumb = [
    {
      text: 'Home',
      url: '/',
    },
    {
      text: 'Campaigns',
      url: '/',
    },
    {
      text: category ? category.name : 'Current Campaigns',
    },
  ]

  //Views
  let productItemsViews

  if (!loading) {
    if (category && category.length > 0) {
      productItemsViews = <ProductItems columns={4} products={category} />
    } else {
      productItemsViews = <p>No Product found</p>
    }
  } else {
    productItemsViews = <p>Loading...</p>
  }

  return (
    <PageContainer
      footer={<FooterDefault />}
      title={category ? category.category_name : 'Category'}
      boxed={true}
    >
      <div className='ps-page--shop'>
        <BreadCrumb breacrumb={breadCrumb} />

        <div className='ps-container'>{productItemsViews}</div>

        {/* <div className="container">
          <div className="ps-layout--shop ps-shop--category">
            <div className="ps-layout__left">
              <WidgetShopCategories />
              <WidgetShopBrands />
              <WidgetShopFilterByPriceRange />
            </div>

            <div className="ps-layout__right">
              <h3 className="ps-shop__heading">
                {category && category.category_name}
              </h3>
              {productItemsViews}
            </div>
          </div>
        </div> */}
      </div>
    </PageContainer>
  )
}

export default Campaign
