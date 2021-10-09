import { Modal } from "antd";
import React, { useState } from "react";
import { connect, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ProductDetailQuickView from "~/components/elements/detail/ProductDetailQuickView";
import useEcomerce from "~/hooks/useEcomerce";

const ModuleProductActions = ({ product, ecomerce }) => {
  const [isQuickView, setIsQuickView] = useState(false);
  const wishList = useSelector((state) => state.ecomerce);

  const { addItem } = useEcomerce();

  function handleAddItemToCart(e) {
    e.preventDefault();
    if (product.quantity === "0") return;

    addItem(
      {
        id: product.product_id,
        campaign_id: product.campaign_id,
        quantity: 1,
      },
      ecomerce.cartItems,
      "cart"
    );

    toast.success("The product added into your cart!");
  }

  function handleAddItemToWishlist(e) {
    e.preventDefault();

    const existItem = wishList.wishlistItems.find(
      (item) => item.id === product.product_id
    );

    if (existItem) {
      toast.error("The item is already in your cart");
      return;
    }

    addItem(
      { id: product.product_id, campaign_id: product.campaign_id },
      ecomerce.wishlistItems,
      "wishlist"
    );
    const modal = Modal.success({
      centered: true,
      title: "Success!",
      content: `This item has been added to your wishlist`,
    });
    modal.update;
  }

  function handleAddItemToCompare(e) {
    e.preventDefault();
    addItem({ id: product.product_id }, ecomerce.compareItems, "compare");
    const modal = Modal.success({
      centered: true,
      title: "Success!",
      content: `This product has been added to your compare listing!`,
    });
    modal.update;
  }

  const handleShowQuickView = (e) => {
    e.preventDefault();
    setIsQuickView(true);
  };

  const handleHideQuickView = (e) => {
    e.preventDefault();
    setIsQuickView(false);
  };
  return (
    <ul className="ps-product__actions">
      <li>
        <a
          href="#!"
          data-toggle="tooltip"
          data-placement="top"
          title="Add To Cart"
          onClick={handleAddItemToCart}
          disabled={product.quantity === "0"}
        >
          <i className="icon-bag2"></i>
        </a>
      </li>
      <li>
        <a
          href="#!"
          data-toggle="tooltip"
          data-placement="top"
          title="Quick View"
          onClick={handleShowQuickView}
        >
          <i className="icon-eye"></i>
        </a>
      </li>
      <li>
        <a
          href="#!"
          data-toggle="tooltip"
          data-placement="top"
          title="Add to wishlist"
          onClick={handleAddItemToWishlist}
        >
          <i className="icon-heart"></i>
        </a>
      </li>
      {/* <li>
        <a
          href='#!'
          data-toggle='tooltip'
          data-placement='top'
          title='Compare'
          onClick={handleAddItemToCompare}
        >
          <i className='icon-chart-bars'></i>
        </a>
      </li> */}
      <Modal
        centered
        footer={null}
        width={1024}
        onCancel={(e) => handleHideQuickView(e)}
        visible={isQuickView}
        closeIcon={<i className="icon icon-cross2"></i>}
      >
        <h3>Quickview</h3>
        <ProductDetailQuickView product={product} />
      </Modal>
    </ul>
  );
};

export default connect((state) => state)(ModuleProductActions);
