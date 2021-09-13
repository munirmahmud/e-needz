import React from 'react'
import PageContainer from '~/components/layouts/PageContainer'
import UserConfirmation from '~/components/partials/account/UserConfirmation'
import FooterFullwidth from '~/components/shared/footers/FooterFullwidth'

const ConfirmRegistration = () => {
  const breadCrumb = [
    {
      text: 'Home',
      url: '/',
    },
    {
      text: 'OTP Validation',
    },
  ]

  return (
    <>
      <PageContainer footer={<FooterFullwidth />} title='Login'>
        <div className='ps-page--my-account'>
          <UserConfirmation />
        </div>
      </PageContainer>
    </>
  )
}

export default ConfirmRegistration
