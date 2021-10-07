import React, { useEffect, useState } from "react";

const PageContent = ({ page_id }) => {
  const [content, setContent] = useState(null);
  const [noDataFound, setNoDataFound] = useState("");

  useEffect(() => {
    getPageContent();
  }, []);

  async function getPageContent() {
    let formData = new FormData();

    formData.append("page_id", page_id);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/link_page`,
      {
        method: "POST",
        body: JSON.stringify({ page_id }),
      }
    );

    const result = await response.json();

    console.log("page", result);

    if (result?.response_status === 200) {
      setContent(result?.data[0]);
    } else if (result?.response_status === 204) {
      setNoDataFound(result?.message);
    }
  }

  return (
    <div className="ps-section--custom">
      <div className="container">
        <div className="section-white p-5">
          {content?.headlines && (
            <div
              className="ps-section__header"
              dangerouslySetInnerHTML={{ __html: content?.headlines }}
            />
          )}

          {content?.image && <img src={content.image} alt="" width={200} />}

          {content?.details ? (
            <div
              className="ps-section__content"
              dangerouslySetInnerHTML={{ __html: content?.details }}
            />
          ) : (
            <p>{noDataFound}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageContent;
