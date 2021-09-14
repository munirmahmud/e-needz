import { Tabs } from "antd";
import React from "react";
import PartialDescription from "~/components/elements/detail/description/PartialDescription";
import PartialReview from "~/components/elements/detail/description/PartialReview";
import QuestionsAnswers from "~/components/elements/detail/description/QuestionsAnswers";
import RefundPolicy from "~/components/elements/detail/description/RefundPolicy";

const { TabPane } = Tabs

const DefaultDescription = ({ product_id, category_id }) => {
  return (
    <div className='ps-product__content ps-tab-root'>
      <Tabs defaultActiveKey='1'>
        <TabPane tab='Description' key='1'>
          <PartialDescription
            product_id={product_id}
            category_id={category_id}
          />
        </TabPane>
        <TabPane tab='Specification' key='2'>
          <PartialSpecification />
        </TabPane>
        <TabPane tab='Vendor' key='3'>
          <PartialVendor />
        </TabPane>
        <TabPane tab='Reviews (1)' key='4'>
          <PartialReview />
        </TabPane>
        <TabPane tab='Questions and Answers' key='5'>
          Content of Tab Pane 3
        </TabPane>
        <TabPane tab='More Offers' key='6'>
          <PartialOffer />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default DefaultDescription
