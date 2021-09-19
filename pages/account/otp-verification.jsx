import React from 'react'
import PageContainer from '~/components/layouts/PageContainer'
import VerifyOtp from '~/components/partials/account/VerifyOtp'
import FooterFullwidth from '~/components/shared/footers/FooterFullwidth'

const OtpVerification = () => {
  const breadCrumb = [
    {
      text: 'Home',
      url: '/',
    },
    {
      text: 'OTP Verification',
    },
  ]
  return (
    <>
      <PageContainer footer={<FooterFullwidth />} title='OTP Verification'>
        <div className='ps-page--my-account'>
          <VerifyOtp />
        </div>
      </PageContainer>
    </>
  )
}

export default OtpVerification
