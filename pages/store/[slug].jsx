import { Rate } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import BreadCrumb from "~/components/elements/BreadCrumb";
import PageContainer from "~/components/layouts/PageContainer";
import ProductItems from "~/components/partials/product/ProductItems";
import FooterDefault from "~/components/shared/footers/FooterDefault";
import ProductRepository from "~/repositories/ProductRepository";

const ProductsByStore = () => {
  const Router = useRouter();
  const { slug } = Router.query;
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [storeInfo, setstoreInfo] = useState(null);

  async function getCategry() {
    setLoading(true);
    if (slug) {
      const responseData = await ProductRepository.getProductsByCategory(slug);
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/store_wise_products`, {
        method: "post",
        body: JSON.stringify({
          per_page: 200,
          page_offset: 0,
          seller_id: slug,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.response_status === 200) {
            setCategory(data);
            setstoreInfo(data?.info);
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
      await Router.push("/store");
    }
  }
  console.log("storeInfo", storeInfo);
  useEffect(() => {
    getCategry();
  }, [slug]);

  const breadCrumb = [
    {
      text: "Home",
      url: "/",
    },
    {
      text: "All Stores",
      url: "/",
    },
    {
      text: storeInfo ? storeInfo.business_name : "Shop By Store",
    },
  ];

  //Views
  let productItemsViews;

  if (!loading) {
    if (category) {
      productItemsViews = (
        <ProductItems
          columns={4}
          products={category.data}
          sellerID={storeInfo.seller_id}
        />
      );
    } else {
      productItemsViews = <p>No Product found</p>;
    }
  } else {
    productItemsViews = <p>Loading...</p>;
  }

  const rating = Number(Number(storeInfo?.store_rating).toFixed());

  return (
    <PageContainer
      footer={<FooterDefault />}
      title={storeInfo ? storeInfo.business_name : "Vendor Page"}
      boxed={true}
    >
      <div className="ps-page--shop">
        <BreadCrumb breacrumb={breadCrumb} />
        <div className="ps-container">
          <div className="ps-shop--category">
            <div className="ps-shopping__header p-4 mb-4 bg-white rounded shop-header">
              <div className="brand-wrapper">
                {storeInfo?.image && (
                  <div className="brand-logo">
                    <img
                      src={storeInfo?.image}
                      alt={storeInfo?.business_name}
                    />
                  </div>
                )}
                <div className="d-flex flex-column brand-info">
                  <h3 className="ps-shop__heading">
                    {storeInfo && storeInfo.seller_store_name}
                  </h3>
                  {storeInfo && <p>{storeInfo.address}</p>}
                  {storeInfo?.store_rating && (
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
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
export default ProductsByStore;
