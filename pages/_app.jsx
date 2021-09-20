import React, { useEffect } from 'react'
import { wrapper } from '~/store/store'
import { CookiesProvider } from 'react-cookie'
import MasterLayout from '~/components/layouts/MasterLayout'
import { loginSuccess } from '~/store/auth/action'
import { useCookies } from 'react-cookie'
import { useDispatch } from 'react-redux'
import '~/public/static/fonts/Linearicons/Font/demo-files/demo.css'
import '~/public/static/fonts/font-awesome/css/font-awesome.min.css'
import '~/public/static/css/bootstrap.min.css'
import '~/public/static/css/slick.min.css'
import '~/scss/style.scss'
import '~/scss/home-default.scss'
import '~/scss/market-place-1.scss'
import '~/scss/market-place-2.scss'
import '~/scss/market-place-3.scss'
import '~/scss/market-place-4.scss'
import '~/scss/electronic.scss'
import '~/scss/furniture.scss'
import '~/scss/organic.scss'
import '~/scss/technology.scss'
import '~/scss/autopart.scss'
import '~/scss/electronic.scss'

function App({ Component, pageProps }) {
  const [authCookie] = useCookies(['auth'])
  const dispatch = useDispatch()
  useEffect(() => {
    setTimeout(function () {
      document.getElementById('__next').classList.add('loaded')
    }, 100)
    if (authCookie.auth !== undefined) {
      let formdata = new FormData()
      formdata.append('customer_id', authCookie.auth)
      fetch(`${process.env.NEXT_PUBLIC_CUSTOMER_DASHBOARD}/is_valid_customer`, {
        method: 'POST',
        body: formdata,
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.response_status === 200) {
            dispatch(loginSuccess())
          }
        })
    }
  })

  return (
    <CookiesProvider>
      <MasterLayout>
        <Component {...pageProps} />
      </MasterLayout>
    </CookiesProvider>
  )
}

export default wrapper.withRedux(App)
