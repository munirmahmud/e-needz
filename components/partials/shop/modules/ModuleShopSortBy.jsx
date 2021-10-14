const ModuleShopSortBy = ({ setProductItems, isCampaign, categoryId }) => {
  const filterMyProduct = (val) => {
    let bodyReq = "";

    if (val == 1) {
      bodyReq = JSON.stringify({
        per_page: 1000,
        page_offset: 0,
        category_id: categoryId,
        latest: "1",
        price: "",
      });
    } else if (val == 2) {
      bodyReq = JSON.stringify({
        per_page: 1000,
        page_offset: 0,
        category_id: categoryId,
        latest: "",
        price: "low_to_high",
      });
    } else if (val == 3) {
      bodyReq = JSON.stringify({
        per_page: 1000,
        page_offset: 0,
        category_id: categoryId,
        latest: "",
        price: "high_to_low",
      });
    }

    if (isCampaign) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/campaign_products`, {
        method: "POST",
        body: bodyReq,
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.response_status === 200) {
            setProductItems(result.data);
          }
        })
        .catch((error) => console.log("error", error));
    } else {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/category_wise_product`, {
        method: "POST",
        body: bodyReq,
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.response_status === 200) {
            setProductItems(result.data);
          }
        })
        .catch((error) => console.log("error", error));
    }
  };

  return (
    <select
      className="ps-select form-control mr-3"
      data-placeholder="Sort Items"
      onChange={(e) => {
        filterMyProduct(e.target.value);
      }}
    >
      <option value={1}>Sort by latest</option>
      <option value={2}>Sort by price: low to high</option>
      <option value={3}>Sort by price: high to low</option>
    </select>
  );
};

export default ModuleShopSortBy;
