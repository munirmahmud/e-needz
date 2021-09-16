import { Rate } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import PageContainer from "~/components/layouts/PageContainer";
import ProductItems from "~/components/partials/product/ProductItems";
import FooterDefault from "~/components/shared/footers/FooterDefault";

const ProductsByBrand = () => {
  const Router = useRouter();
  const { slug } = Router.query;
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [brandInfo, setBrandInfo] = useState(null);

  async function getCategry() {
    setLoading(true);
    if (slug) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/brand_wise_products`, {
        method: "POST",
        body: JSON.stringify({ brand_id: slug, per_page: 2000 }),
      })
        .then((response) => response.json())
        .then((result) => {
          setCategory(result.data);
          setBrandInfo(result?.info);
          setLoading(false);
        })
        .catch((error) => console.log("error", error));

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
    } else {
      await Router.push("/brand");
    }
  }

  useEffect(() => {
    getCategry();
  }, [slug]);

  const breadCrumb = [
    {
      text: "Home",
      url: "/",
    },
    {
      text: "Brand",
      url: "/brand",
    },
    {
      text: category ? category.name : "Product category",
    },
  ];

  //Views
  let productItemsViews;

  if (!loading) {
    if (category && category.length > 0) {
      productItemsViews = <ProductItems columns={4} products={category} />;
    } else {
      productItemsViews = <p>No Product found</p>;
    }
  } else {
    productItemsViews = <p>Loading...</p>;
  }

  // const rating = Number(Number(brandInfo?.store_rating).toFixed());
  const rating = 3;

  return (
    <PageContainer
      footer={<FooterDefault />}
      title={category ? category.category_name : "Category"}
      boxed={true}
    >
      <div className="ps-page--shop">
        {/* <BreadCrumb breacrumb={breadCrumb} /> */}

        <div className="ps-shop--category">
          <div className="ps-container">
            <div className="ps-shopping__header p-4 mb-4 bg-white rounded shop-header">
              <div className="brand-wrapper">
                {brandInfo?.brand_image && (
                  <div className="brand-logo">
                    <img
                      src={brandInfo?.brand_image}
                      alt={brandInfo?.brand_name}
                    />
                  </div>
                )}
                <div className="d-flex flex-column brand-info">
                  <h3 className="ps-shop__heading">
                    {brandInfo && brandInfo.brand_name}
                  </h3>
                  {brandInfo && (
                    <p>
                      <Link href={brandInfo.website}>
                        <a target="_blank">Visit Us</a>
                      </Link>
                    </p>
                  )}
                  {brandInfo?.store_rating && (
                    <Rate
                      allowHalf
                      defaultValue={rating}
                      disabled
                      style={{ color: "#fd8b01" }}
                    />
                  )}
                </div>
              </div>

              {/* <div className="ps-shopping__actions">
                <div className="ps-shopping__view">
                </div>
              </div> */}
            </div>
            <h3>All Products</h3>

            {productItemsViews}

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
        </div>
      </div>
    </PageContainer>
  );
};
export default ProductsByBrand;
