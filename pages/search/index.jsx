import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import BreadCrumb from "~/components/elements/BreadCrumb";
import ProductDealOfDay from "~/components/elements/products/ProductDealOfDay";
import PageContainer from "~/components/layouts/PageContainer";
import ProductGroupGridItems from "~/components/partials/product/ProductGroupGridItems";
import useGetProducts from "~/hooks/useGetProducts";

const SearchPage = () => {
  const [pageSize] = useState(100);
  const [keyword, setKeyword] = useState("");
  const { productItems, loading, getProducts } = useGetProducts();
  const Router = useRouter();
  const { query } = Router;

  function handleSetKeyword() {
    if (query && query.keyword !== "") {
      setKeyword(query.keyword);
    } else {
      setKeyword("");
    }
  }

  useEffect(() => {
    if (query && query.keyword) {
      handleSetKeyword(query.keyword);
      const queries = {
        _limit: pageSize,
        title_contains: query.keyword,
      };
      getProducts(queries);
    }
  }, [query]);

  const breadcrumb = [
    {
      text: "Home",
      url: "/",
    },
    {
      text: "Search Results",
    },
  ];

  let shopItemsView, statusView;

  if (!loading) {
    if (productItems) {
      shopItemsView = <ProductGroupGridItems columns={6} pageSize={pageSize} />;
      if (productItems.length > 0) {
        const items = productItems.map((item) => {
          return (
            <div className="col-xl-2 col-lg-3 col-sm-4 col-6" key={item.id}>
              <ProductDealOfDay product={item} />
            </div>
          );
        });
        shopItemsView = <div className="ps-product-items row">{items}</div>;
        statusView = (
          <p>
            <strong style={{ color: "#000" }}>{productItems.length}</strong>{" "}
            record(s) found.
          </p>
        );
      } else {
        shopItemsView = <p>No product(s) found.</p>;
      }
    } else {
      shopItemsView = <p>No product(s) found.</p>;
    }
  } else {
    statusView = <p>Searching...</p>;
  }

  return (
    <PageContainer title={`Search results for: "${keyword}" `}>
      <div className="ps-page">
        <BreadCrumb breacrumb={breadcrumb} />
      </div>

      <div className="ps-container mb-4">
        <div className="ps-shop ps-shop--search">
          <div className="ps-shop__header">
            <div className="section-white">
              <h1 className="mb-0">
                Search result for: "<strong>{keyword}</strong>"
              </h1>
            </div>
          </div>

          <div className="section-white box-layout">
            <div className="ps-shop__content ">
              {statusView}
              {shopItemsView}
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default SearchPage;
