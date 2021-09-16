import React from 'react'
import PageContainer from '~/components/layouts/PageContainer'
import Login from '~/components/partials/account/Login'
import FooterFullwidth from '~/components/shared/footers/FooterFullwidth'

const LoginPage = () => {
  const breadCrumb = [
    {
      text: 'Home',
      url: '/',
    },
    {
      text: 'Login',
    },
  ]
  return (
    <>
      <PageContainer footer={<FooterFullwidth />} title='Login'>
        <div className='ps-page--my-account'>
          <Login />
        </div>
      </PageContainer>
    </>
  )
}

export default LoginPage
