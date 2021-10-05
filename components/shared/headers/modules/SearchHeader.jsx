import { Spin } from "antd";
import Link from "next/link";
import Router from "next/router";
import React, { useEffect, useRef, useState } from "react";
import ProductSearchResult from "~/components/elements/products/ProductSearchResult";

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
  const [searchCategories, setSearchCategories] = useState([]);
  const [noDataFound, setNoDataFound] = useState("");
  const [categoryID, setCategoryID] = useState("");

  function handleClearKeyword() {
    setKeyword("");
    setIsSearch(false);
    setLoading(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsSearch(false);
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
            per_page: 13,
            page_offset: 0,
            product_name: keyword,
            category_id: categoryID,
          }),
        })
          .then((response) => response.json())
          .then((result) => {
            if (result.response_status === 200) {
              setLoading(false);
              setResultItems(result.data);
              setIsSearch(true);
            } else if (result.response_status === 204) {
              setLoading(false);
              setResultItems(result.message);
              setIsSearch(true);
            } else {
              setLoading(false);
              setResultItems(result.message);
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
    if (Array.isArray(resultItems) && resultItems.length > 0) {
      if (resultItems.length > 12) {
        loadMoreView = (
          <div className="ps-panel__footer text-center">
            <Link href={`/search?keyword=${keyword}`}>
              <a>See all results</a>
            </Link>
          </div>
        );
      }
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

  selectOptionView = searchCategories.map((option, index) => (
    <option value={option.category_id} key={option.category_id}>
      {option.category_name}
    </option>
  ));

  const handleCategory = async (e) => {
    if (e.target.value === "00") {
      setCategoryID("");
    } else {
      setCategoryID(e.target.value);
    }

    const data = {
      per_page: 1000,
      page_offset: 0,
      category_id: "",
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/category_list`,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();

    const optionObj = {
      category_id: "00",
      category_name: "All",
    };

    if (result.response_status === 200) {
      if (searchCategories.length === 0) {
        setSearchCategories([optionObj, ...result.data]);
      }
    }
  };

  return (
    <form className="ps-form--quick-search" onSubmit={handleSubmit}>
      <div className="ps-form__categories">
        <select
          className="form-control"
          name="category"
          onClick={handleCategory}
        >
          {searchCategories.length === 0 && <option value="00">All</option>}
          {selectOptionView}
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
