import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import BreadCrumb from "~/components/elements/BreadCrumb";
import PageContainer from "~/components/layouts/PageContainer";
import ProductItems from "~/components/partials/product/ProductItems";
import FooterDefault from "~/components/shared/footers/FooterDefault";
import ProductRepository from "~/repositories/ProductRepository";

const ProductCategoryScreen = () => {
  const Router = useRouter();
  const { slug } = Router.query;
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  async function getCategry() {
    setLoading(true);
    if (slug) {
      const responseData = await ProductRepository.getProductsByCategory(slug);
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/category_wise_product`, {
        method: "post",
        body: JSON.stringify({
          per_page: 10,
          page_offset: 0,
          category_id: slug,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.response_status === 200) {
            setCategory(data);
            setLoading(false);
          }
          // setFilterProds(data.data)
        });

      // if (responseData) {
      //   setCategory(responseData)
      //   setTimeout(
      //     function () {
      //       setLoading(false)
      //     }.bind(this),
      //     250
      //   )
      // }
    } else {
      await Router.push("/top-categories");
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
      text: "Top Categories",
      url: "/top-categories",
    },
    {
      text: category?.info
        ? category.info.category_name
        : "Top Category Product ",
    },
  ];

  //Views
  let productItemsViews;

  if (!loading) {
    if (category) {
      productItemsViews = <ProductItems columns={4} products={category.data} />;
    } else {
      productItemsViews = <p>No Product found</p>;
    }
  } else {
    productItemsViews = <p>Loading...</p>;
  }

  return (
    <PageContainer
      footer={<FooterDefault />}
      title={category ? category.info.category_name : "Top Category Products"}
      boxed={true}
    >
      <div className="ps-page--shop">
        <BreadCrumb breacrumb={breadCrumb} />
        <div className="ps-container">
          <div className="ps-shop--category pt-4">
            {/* <div className="ps-layout__left">
              <WidgetShopCategories />
              <WidgetShopBrands />
              <WidgetShopFilterByPriceRange />
            </div> */}
            {/* <div className="ps-layout__right"> */}
            <h3 className="ps-shop__heading">
              {category && category.info.category_name}
            </h3>
            {productItemsViews}
            {/* </div> */}
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
export default ProductCategoryScreen;
