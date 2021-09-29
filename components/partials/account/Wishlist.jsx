import React, { useEffect } from "react";
import { connect } from "react-redux";
import ProductCart from "~/components/elements/products/ProductCart";
import useEcomerce from "~/hooks/useEcomerce";

const Wishlist = ({ ecomerce }) => {
  const { loading, products, getProducts } = useEcomerce();
  const { addItem, removeItem } = useEcomerce();

  function handleAddItemToCart(e, product) {
    e.preventDefault();
    addItem(
      {
        id: product.product_id,
        category_id: product.category_id,
        quantity: 1,
      },
      ecomerce.cartItems,
      "cart"
    );
  }

  function handleRemoveWishlistItem(e, product) {
    e.preventDefault();
    removeItem(product, ecomerce.wishlistItems, "wishlist");
  }

  useEffect(() => {
    if (ecomerce.wishlistItems) {
      getProducts(ecomerce.wishlistItems);
    }
  }, [ecomerce]);

  console.log("w-products", products);

  // views
  let wishlistItemsView;

  if (products) {
    wishlistItemsView = (
      <div className="table-responsive">
        <table className="table ps-table--whishlist">
          {products.data ? (
            <thead>
              <tr>
                <th></th>
                <th>Product name</th>
                <th>Unit Price</th>
                <th>Vendor</th>
                <th></th>
              </tr>
            </thead>
          ) : (
            ""
          )}
          <tbody>
            {products.data ? (
              products.data.map((product) => (
                <tr key={product.category_id}>
                  <td>
                    <a
                      href="#"
                      onClick={(e) => handleRemoveWishlistItem(e, product)}
                    >
                      <i className="icon-cross"></i>
                    </a>
                  </td>
                  <td>
                    <ProductCart product={product} />
                  </td>
                  <td className="price">${product.price}</td>
                  <td>{product.vendor}</td>
                  <td>
                    <a
                      className="ps-btn"
                      href=""
                      onClick={(e) => handleAddItemToCart(e, product)}
                    >
                      Add to cart
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <div className="alert alert-danger text-center" role="alert">
                  Wishlist is empty!
                </div>
              </div>
            )}
          </tbody>
        </table>
      </div>
    );
  } else {
    if (!loading) {
      wishlistItemsView = (
        <div className="alert alert-danger" role="alert">
          Wishlist is empty!
        </div>
      );
    }
  }
  return (
    <div className="ps-section--shopping ps-whishlist">
      <div className="container">
        <div className="section-white">
          <div className="ps-section__header justify-content-center">
            <h1>Wishlist</h1>
          </div>
          <div className="ps-section__content">{wishlistItemsView}</div>
        </div>
      </div>
    </div>
  );
};
export default connect((state) => state)(Wishlist);
