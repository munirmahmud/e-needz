import Link from "next/link";
import { useEffect, useState } from "react";

const HomeDefaultTopCategories = ({ title, endpoint, _link }) => {
  const [catProds, setCatProducts] = useState();
  const [filterProds, setFilterProds] = useState();

  const filterOut = (tag) => {
    console.log(catProds.length);
    const newProd = catProds.filter((prod) =>
      prod.category_name.toLowerCase().includes("" + tag)
    );
    setFilterProds(newProd);
  };

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`, {
      method: "post",
      body: JSON.stringify({
        per_page: "12",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setCatProducts(data.data);
        setFilterProds(data.data);
      });
  }, []);

  return (
    <div className="ps-top-categories">
      <div className="ps-container">
        <div className="section-white section-box">
          <div className="section__header">
            {title && (
              <div className="ps-block--countdown-deal">
                <div className="ps-block__left">
                  <h3>{title}</h3>
                </div>
              </div>
            )}

            <div className="search-products">
              {/* <div className="ps-form__input">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                  onChange={(e) => {
                    filterOut(e.target.value);
                  }}
                />
              </div>
              <button className="ps-btn">
                <img
                  src="/static/icons/magnifiying-glass.svg"
                  alt="Search Products"
                />
              </button> */}
              <Link href={_link}>
                <a className="ps-btn view-all">View all</a>
              </Link>
            </div>
          </div>

          <div className="row">
            {filterProds ? (
              filterProds.length > 0 ? (
                filterProds.map((data, id) => {
                  return (
                    <div
                      className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6"
                      key={id}
                    >
                      <div className="ps-block--category">
                        <Link
                          href={`${_link}/${
                            data.category_id
                              ? data.category_id
                              : data.brand_id
                              ? data.brand_id
                              : data.seller_id
                          }`}
                        >
                          <a className="ps-block__overlay"></a>
                        </Link>
                        <img
                          src={`/static/img/categories/5.jpg`}
                          alt="E-needz"
                        />
                        <p>
                          {data.category_name
                            ? data.category_name
                            : data.seller_store_name}

                          {data.brand_name ? data.brand_name : ""}
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p style={{ marginLeft: "10px" }}>No product(s) found.</p>
              )
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomeDefaultTopCategories;
