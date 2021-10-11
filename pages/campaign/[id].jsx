import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import BreadCrumb from "~/components/elements/BreadCrumb";
import PageContainer from "~/components/layouts/PageContainer";
import ProductItems from "~/components/partials/product/ProductItems";
import FooterDefault from "~/components/shared/footers/FooterDefault";

const CampaignProducts = () => {
  const Router = useRouter();
  const { id } = Router.query;
  const [campaignProducts, setCampaignProducts] = useState(null);
  const [campaignInfo, setCampaignInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  async function getCategry() {
    setLoading(true);
    if (id) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/campaign_products`, {
        method: "POST",
        body: JSON.stringify({
          campaign_id: id,
          per_page: 5000,
          page_offset: 0,
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          setCampaignProducts(result.data);
          setCampaignInfo(result.info);
          setLoading(false);
        })
        .catch((error) => console.log("error", error));
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
      text: "Campaigns",
      url: "/campaign",
    },
  ];

  //Views
  let productItemsViews;

  if (!loading) {
    if (campaignProducts && campaignProducts.length > 0) {
      productItemsViews = (
        <ProductItems columns={4} products={campaignProducts} campaignID={id} />
      );
    } else {
      productItemsViews = <p>No Product found</p>;
    }
  } else {
    productItemsViews = <p>Loading...</p>;
  }

  // console.log("cmapaign prod", campaignProducts);

  return (
    <PageContainer
      footer={<FooterDefault />}
      title={
        campaignInfo
          ? `Campaign for ${campaignInfo?.campaign_name}`
          : "Campaign Products"
      }
      boxed={true}
    >
      <div className="ps-page--shop">
        <BreadCrumb
          breacrumb={breadCrumb}
          campaign_name={campaignInfo?.campaign_name}
        />

        <div className="ps-container">{productItemsViews}</div>

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
  );
};

export default CampaignProducts;
