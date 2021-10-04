import { BackTop } from "antd";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import PageLoader from "~/components/elements/common/PageLoader";
import MainHead from "~/components/layouts/modules/MainHead";
import NavigationList from "~/components/shared/navigation/NavigationList";
import {
  setCartItems,
  setCompareItems,
  setWishlistTtems,
} from "~/store/ecomerce/action";

const MasterLayout = ({ children }) => {
  const dispatch = useDispatch();
  const [cookies] = useCookies(["cart", "compare", "wishlist"]);

  function initEcomerceValues() {
    if (cookies) {
      if (cookies.cart) {
        dispatch(setCartItems(cookies.cart));
      }
      if (cookies.wishlist) {
        dispatch(setWishlistTtems(cookies.wishlist));
      }
      if (cookies.compare) {
        dispatch(setCompareItems(cookies.compare));
      }
    }
  }

  useEffect(() => {
    initEcomerceValues();
  }, []);

  return (
    <>
      <MainHead />
      <PageLoader />
      {children}
      <NavigationList />
      <BackTop>
        <button className="ps-btn--backtop">
          <i className="icon-arrow-up"></i>
        </button>
      </BackTop>
    </>
  );
};

export default MasterLayout;
