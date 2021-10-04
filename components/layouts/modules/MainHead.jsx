import Head from "next/head";
import React, { useEffect, useState } from "react";

const MainHead = () => {
  const [header, setHeader] = useState(null);

  useEffect(() => {
    const fetchHeaderData = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/web_setting`,
        {
          method: "POST",
          body: JSON.stringify({}),
        }
      );
      const result = await response.json();

      if (result.response_status === 200) {
        setHeader(result.data);
      } else {
        console.log("Error found in header", result.message);
      }
    };
    fetchHeaderData();
  }, []);

  return (
    <Head>
      <title>{header?.site_title}</title>
      <link rel="shortcut icon" href={header?.favicon} />
      <link rel="icon" href={header?.favicon} sizes="32x32" />
      <link rel="icon" href={header?.favicon} sizes="192x192" />
      <link rel="apple-touch-icon-precomposed" href={header?.favicon} />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="author" content="bdtask" />
      <meta name="keywords" content={header?.meta_keyword} />
      <meta name="description" content={header?.meta_description} />
      <link
        href="https://fonts.googleapis.com/css?family=Work+Sans:300,400,500,600,700&amp;amp;subset=latin-ext"
        rel="stylesheet"
      />
    </Head>
  );
};

export default MainHead;
