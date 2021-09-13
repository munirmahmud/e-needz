import React from 'react'

import { Tabs } from 'antd'
import PartialDescription from '~/components/elements/detail/description/PartialDescription'
import PartialSpecification from '~/components/elements/detail/description/PartialSpecification'
import PartialVendor from '~/components/elements/detail/description/PartialVendor'
import PartialReview from '~/components/elements/detail/description/PartialReview'
import PartialOffer from '~/components/elements/detail/description/PartialOffer'

const { TabPane } = Tabs

const DefaultDescription = () => {
  return (
    <div className='ps-product__content ps-tab-root'>
      <Tabs defaultActiveKey='1'>
        <TabPane tab='Description' key='1'>
          <PartialDescription />
        </TabPane>
        <TabPane tab='Feedback (1)' key='2'>
          <PartialReview />
        </TabPane>
        <TabPane tab='Questions' key='3'>
          <QuestionsAnswers />
        </TabPane>
        <TabPane tab='Refund Policy' key='4'>
          <RefundPolicy />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default DefaultDescription
