import { Spin } from "antd";
import Router from "next/router";
import React, { useEffect, useRef, useState } from "react";
import ProductSearchResult from "~/components/elements/products/ProductSearchResult";

const exampleCategories = [
  "All",
  "Babies & Moms",
  "Books & Office",
  "Cars & Motocycles",
  "Clothing & Apparel",
  " Accessories",
  "Bags",
  "Kid’s Fashion",
  "Mens",
  "Shoes",
  "Sunglasses",
  "Womens",
  "Computers & Technologies",
  "Desktop PC",
  "Laptop",
  "Smartphones",
  "Consumer Electrics",
  "Air Conditioners",
  "Accessories",
  "Type Hanging Cell",
  "Audios & Theaters",
  "Headphone",
  "Home Theater System",
  "Speakers",
  "Car Electronics",
  "Audio & Video",
  "Car Security",
  "Radar Detector",
  "Vehicle GPS",
  "Office Electronics",
  "Printers",
  "Projectors",
  "Scanners",
  "Store & Business",
  "Refrigerators",
  "TV Televisions",
  "4K Ultra HD TVs",
  "LED TVs",
  "OLED TVs",
  "Washing Machines",
  "Type Drying Clothes",
  "Type Horizontal",
  "Type Vertical",
  "Garden & Kitchen",
  "Cookware",
  "Decoration",
  "Furniture",
  "Garden Tools",
  "Home Improvement",
  "Powers And Hand Tools",
  "Utensil & Gadget",
  "Health & Beauty",
  "Equipments",
  "Hair Care",
  "Perfumer",
  "Wine Cabinets",
];

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Update debounced value after delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const SearchHeader = () => {
  const inputEl = useRef(null);

  const [isSearch, setIsSearch] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [resultItems, setResultItems] = useState(null);
  const [loading, setLoading] = useState(false);
  const debouncedSearchTerm = useDebounce(keyword, 300);

  function handleClearKeyword() {
    setKeyword("");
    setIsSearch(false);
    setLoading(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    Router.push(`/search?keyword=${keyword}`);
  }

  useEffect(() => {
    if (debouncedSearchTerm) {
      setLoading(true);
      if (keyword) {
        // const products = ProductRepository.getSearchRecords(queries)

        // products.then((result) => {
        //   console.log('products -', result)
        //   setLoading(false)
        //   setResultItems(result)
        //   setIsSearch(true)
        // })

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/retrieve_category_product`, {
          method: "POST",
          body: JSON.stringify({
            per_page: 10,
            page_offset: 0,
            product_name: keyword,
            category_id: "",
          }),
        })
          .then((response) => response.json())
          .then((result) => {
            console.log(result);
            if (result.response_status === 200) {
              setLoading(false);
              setResultItems(result.data);
              setIsSearch(true);
            }
          })
          .catch((error) => console.log("error", error));
      } else {
        setIsSearch(false);
        setKeyword("");
      }
      if (loading) {
        setIsSearch(false);
      }
    } else {
      setLoading(false);
      setIsSearch(false);
    }
  }, [debouncedSearchTerm]);

  // Views
  let productItemsView,
    clearTextView,
    selectOptionView,
    loadingView,
    loadMoreView;
  if (!loading) {
    if (resultItems && resultItems.length > 0) {
      // if (resultItems.length > 25) {
      //   loadMoreView = (
      //     <div className='ps-panel__footer text-center'>
      //       <Link href='/search'>
      //         <a>See all results</a>
      //       </Link>
      //     </div>
      //   )
      // }
      productItemsView = resultItems.map((product, index) => (
        <ProductSearchResult product={product} key={index} />
      ));
    } else {
      productItemsView = <p>No product found.</p>;
    }
    if (keyword !== "") {
      clearTextView = (
        <span className="ps-form__action" onClick={handleClearKeyword}>
          <i className="icon icon-cross2"></i>
        </span>
      );
    }
  } else {
    loadingView = (
      <span className="ps-form__action">
        <Spin size="small" />
      </span>
    );
  }

  selectOptionView = exampleCategories.map((option) => (
    <option value={option} key={option}>
      {option}
    </option>
  ));

  return (
    <form className="ps-form--quick-search" onSubmit={handleSubmit}>
      <div className="ps-form__categories">
        {/* <select className='form-control'>{selectOptionView}</select> */}
        <select className="form-control">
          <option value="all">All</option>
        </select>
      </div>
      <div className="ps-form__input">
        <input
          ref={inputEl}
          className="form-control"
          type="text"
          value={keyword}
          placeholder="I'm shopping for..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        {clearTextView}
        {loadingView}
      </div>
      <button onClick={handleSubmit}>Search</button>
      <div className={`ps-panel--search-result${isSearch ? " active " : ""}`}>
        <div className="ps-panel__content">{productItemsView}</div>
        {loadMoreView}
      </div>
    </form>
  );
};

export default SearchHeader;
