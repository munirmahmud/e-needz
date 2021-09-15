import { Tabs } from 'antd'
import React from 'react'
import PartialDescription from '~/components/elements/detail/description/PartialDescription'
import PartialQuestions from '~/components/elements/detail/description/PartialQuestions'
import PartialReview from '~/components/elements/detail/description/PartialReview'
import RefundPolicy from '~/components/elements/detail/description/RefundPolicy'

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
        <TabPane tab='Reviews (1)' key='4'>
          <PartialReview />
        </TabPane>
        <TabPane tab='Questions and Answers' key='5'>
          <PartialQuestions />
        </TabPane>
        <TabPane tab='Refund Policy' key='6'>
          <RefundPolicy />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default DefaultDescription
