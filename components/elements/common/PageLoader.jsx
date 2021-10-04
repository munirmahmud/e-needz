import React from "react";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const PageLoader = () => {
  return (
    <>
      {/* <Loader type="Puff" color="#00BFFF" height={100} width={100} /> */}
      {/* <div id="loader-wrapper">
        <div className="loader-section section-left"></div>
        <div className="loader-section section-right"></div>
      </div> */}
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  );
};

export default PageLoader;
