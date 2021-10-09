import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import BreadCrumb from "~/components/elements/BreadCrumb";
import PageContainer from "~/components/layouts/PageContainer";
import ProductItems from "~/components/partials/product/ProductItems";
import FooterDefault from "~/components/shared/footers/FooterDefault";
import ProductRepository from "~/repositories/ProductRepository";

const ProductsByCategory = () => {
  const Router = useRouter();
  const { id } = Router.query;
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categoryInfo, setcategoryInfo] = useState(null);

  async function getCategry() {
    setLoading(true);
    if (id) {
      const responseData = await ProductRepository.getProductsByCategory(id);
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/category_wise_product`, {
        method: "post",
        body: JSON.stringify({
          per_page: 50000,
          page_offset: 0,
          category_id: id,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.response_status === 200) {
            setCategory(result.data);
            setcategoryInfo(result?.info);
            setLoading(false);
          } else if (result.response_status === 204) {
            setLoading(false);
          }
        })
        .catch((error) => {
          setLoading(false);
          console.log("category_wise_product error", error);
        });
    } else {
      await Router.push("/");
    }
  }

  useEffect(() => {
    getCategry();
  }, [id]);

  const breadCrumb = [
    {
      text: "Home",
      url: "/",
    },
    {
      text: "Categories",
      url: "/category",
    },
    {
      text: categoryInfo ? categoryInfo.category_name : "Products by Category",
    },
  ];

  //Views
  let productItemsViews;

  if (!loading) {
    if (category) {
      productItemsViews = (
        <ProductItems columns={4} products={category} categoryId={id} />
      );
    } else {
      productItemsViews = (
        <div className="ps-shopping py-4 ">
          <div
            className="section-white d-flex align-items-center justify-content-center"
            style={{ minHeight: 300 }}
          >
            <p>No Product found with this category</p>
          </div>
        </div>
      );
    }
  } else {
    productItemsViews = (
      <div className="ps-shopping py-4 ">
        <div
          className="section-white d-flex align-items-center justify-content-center"
          style={{ minHeight: 300 }}
        >
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <PageContainer
      footer={<FooterDefault />}
      title={categoryInfo ? categoryInfo.category_name : "Category Products"}
      boxed={true}
    >
      <div className="ps-page--shop">
        <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />
        <div className="ps-container">{productItemsViews}</div>
      </div>
    </PageContainer>
  );
};
export default ProductsByCategory;
