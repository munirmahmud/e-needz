import { Tabs } from "antd";
import React from "react";
import PartialDescription from "~/components/elements/detail/description/PartialDescription";
import PartialReview from "~/components/elements/detail/description/PartialReview";
import QuestionsAnswers from "~/components/elements/detail/description/QuestionsAnswers";
import RefundPolicy from "~/components/elements/detail/description/RefundPolicy";

const { TabPane } = Tabs;

const DefaultDescription = ({
  product_id,
  category_id,
  seller_id,
  total_review,
}) => {
  return (
    <div className="ps-product__content ps-tab-root">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Description" key="1">
          <PartialDescription
            product_id={product_id}
            category_id={category_id}
            seller_id={seller_id}
          />
        </TabPane>
        <TabPane tab={`Reviews (${total_review})`} key="4">
          <PartialReview
            product_id={product_id}
            category_id={category_id}
            seller_id={seller_id}
          />
        </TabPane>
        <TabPane tab="Questions and Answers" key="5">
          <QuestionsAnswers
            product_id={product_id}
            category_id={category_id}
            seller_id={seller_id}
          />
        </TabPane>
        <TabPane tab="Refund Policy" key="6">
          <RefundPolicy />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default DefaultDescription;
