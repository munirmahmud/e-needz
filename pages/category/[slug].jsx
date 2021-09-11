import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import BreadCrumb from "~/components/elements/BreadCrumb";
import PageContainer from "~/components/layouts/PageContainer";
import Newletters from "~/components/partials/commons/Newletters";
import ProductItems from "~/components/partials/product/ProductItems";
import FooterDefault from "~/components/shared/footers/FooterDefault";
import WidgetShopBrands from "~/components/shared/widgets/WidgetShopBrands";
import WidgetShopCategories from "~/components/shared/widgets/WidgetShopCategories";
import WidgetShopFilterByPriceRange from "~/components/shared/widgets/WidgetShopFilterByPriceRange";
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
      if (responseData) {
        setCategory(responseData);
        setTimeout(
          function () {
            setLoading(false);
          }.bind(this),
          250
        );
      }
    } else {
      await Router.push("/shop");
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
      text: "Shop",
      url: "/",
    },
    {
      text: category ? category.name : "Product category",
    },
  ];

  //Views
  let productItemsViews;

  if (!loading) {
    if (category && category.products.length > 0) {
      productItemsViews = (
        <ProductItems columns={4} products={category.products} />
      );
    } else {
      productItemsViews = <p>No Product found</p>;
    }
  } else {
    productItemsViews = <p>Loading...</p>;
  }

  return (
    <PageContainer
      footer={<FooterDefault />}
      title={category ? category.name : "Category"}
      boxed={true}
    >
      <div className="ps-page--shop">
        <BreadCrumb breacrumb={breadCrumb} />
        <div className="container">
          <div className="ps-layout--shop ps-shop--category">
            <div className="ps-layout__left">
              <WidgetShopCategories />
              <WidgetShopBrands />
              <WidgetShopFilterByPriceRange />
            </div>
            <div className="ps-layout__right">
              <h3 className="ps-shop__heading">{category && category.name}</h3>
              {productItemsViews}
            </div>
          </div>
        </div>
      </div>
      <Newletters layout="container" />
    </PageContainer>
  );
};
export default ProductCategoryScreen;
