import Link from "next/link";
import React, { useEffect, useState } from "react";
import BreadCrumb from "~/components/elements/BreadCrumb";
import PageContainer from "~/components/layouts/PageContainer";
import FooterDefault from "~/components/shared/footers/FooterDefault";

const Campaign = () => {
  const [campaigns, setCampaigns] = useState(null);
  const [loading, setLoading] = useState(false);

  async function getCategry() {
    setLoading(true);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/campaign_slider_list`, {
      method: "POST",
      body: JSON.stringify({
        per_page: 200,
        page_offset: 0,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        setCampaigns(result.data);
        setLoading(false);
      })
      .catch((error) => console.log("error", error));

    // const responseData = await ProductRepository.getProductsByCategory(slug);
    // if (responseData) {
    //   setCampaigns(responseData);
    //   setTimeout(
    //     function () {
    //       setLoading(false);
    //     }.bind(this),
    //     250
    //   );
    // }
  }

  useEffect(() => {
    getCategry();
  }, []);

  const breadCrumb = [
    {
      text: "Home",
      url: "/",
    },
    {
      text: "All Current Campaigns",
      url: null,
    },
  ];

  //Views
  let productItemsViews;

  if (!loading) {
    if (campaigns && campaigns.length > 0) {
      productItemsViews = campaigns.map((item) => (
        <div
          key={item.campaign_id}
          className="col-xl-3 col-lg-4 col-sm-6 col-12 mb-4"
        >
          <Link href={`/campaign/${item.campaign_id}`}>
            <a className="campaign-banner-item">
              <img src={item.campaign_bannar} alt={item.campaign_name} />
            </a>
          </Link>
        </div>
      ));
    } else {
      productItemsViews = <p>No Product found</p>;
    }
  } else {
    productItemsViews = <p>Loading...</p>;
  }

  return (
    <PageContainer
      footer={<FooterDefault />}
      title={campaigns ? campaigns.category_name : "Category"}
      boxed={true}
    >
      <div className="ps-page--shop">
        <BreadCrumb breacrumb={breadCrumb} />

        <div className="ps-container my-4">
          <div className="row">{productItemsViews}</div>
        </div>

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

export default Campaign;
