import React from "react";
// import {
//     FacebookShareButton,
//     InstapaperShareButton,
//     LinkedinShareButton,
//     TwitterShareButton
// } from "react-share";

const ModuleProductDetailSharing = () => {
  const shareUrl = location.href;
  return (
    <div className="ps-product__sharing">
      {/* <FacebookShareButton size={32} round={true} url={shareUrl} />
      <TwitterShareButton />
      <InstapaperShareButton />
      <LinkedinShareButton /> */}
      <a className="facebook" href="#">
        <i className="fa fa-facebook"></i>
      </a>
      <a className="twitter" href="#">
        <i className="fa fa-twitter"></i>
      </a>
      <a className="google" href="#">
        <i className="fa fa-google-plus"></i>
      </a>
      <a className="linkedin" href="#">
        <i className="fa fa-linkedin"></i>
      </a>
      <a className="instagram" href="#">
        <i className="fa fa-instagram"></i>
      </a>
    </div>
  );
};

export default ModuleProductDetailSharing;
