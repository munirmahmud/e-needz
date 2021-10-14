import Head from "next/head";
import React from "react";
import FooterFullwidth from "~/components/shared/footers/FooterFullwidth";
import HeaderMobile from "~/components/shared/headers/HeaderMobile";
import HeaderMarketPlace2 from "../shared/headers/HeaderMarketPlace2";

const initHeaders = (
  <>
    <HeaderMarketPlace2 />
    <HeaderMobile />
  </>
);

const initFooters = (
  <>
    <FooterFullwidth />
  </>
);

const PageContainer = ({
  header = initHeaders,
  footer = initFooters,
  children,
  title = "Page",
}) => {
  let titleView;

  if (title !== "") {
    titleView = process.env.title + " | " + title;
  } else {
    titleView = process.env.title + " | " + process.env.titleDescription;
  }

  return (
    <>
      <Head>
        <title>{titleView}</title>
      </Head>
      {header}
      {children}
      {footer}
    </>
  );
};

export default PageContainer;
