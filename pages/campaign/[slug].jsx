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
      text: "Campaign",
      url: "/",
    },
    {
      text: category ? category.name : "Campaign Product",
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
      title={category ? category.name : "Campaign"}
      boxed={true}
    >
      <div className="ps-page--shop">
        <BreadCrumb breacrumb={breadCrumb} />
        <div className="container">
          <div className="ps-layout--shop ps-shop--category">
            <h3 className="ps-shop__heading">{category && category.name}</h3>
            {productItemsViews}
            {/* <h1>Campaign Products</h1> */}
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
export default ProductCategoryScreen;
