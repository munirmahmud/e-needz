import { Tabs } from "antd";
import React from "react";
import PartialDescription from "~/components/elements/detail/description/PartialDescription";
import PartialOffer from "~/components/elements/detail/description/PartialOffer";
import PartialReview from "~/components/elements/detail/description/PartialReview";
import QuestionsAnswers from "./QuestionsAnswers";

const { TabPane } = Tabs;

const DefaultDescription = () => {
  return (
    <div className="ps-product__content ps-tab-root">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Description" key="1">
          <PartialDescription />
        </TabPane>
        <TabPane tab="Feedback (1)" key="2">
          <PartialReview />
        </TabPane>
        <TabPane tab="Questions" key="3">
          <QuestionsAnswers />
        </TabPane>
        <TabPane tab="Refund Policy" key="4">
          <PartialOffer />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default DefaultDescription;
