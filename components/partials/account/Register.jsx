import { Form, Input } from 'antd'
import { useState } from 'react'

import Link from 'next/link'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Register = () => {
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    let formData = new FormData()
    formData.append('customer_name', name)
    formData.append('customer_address', address)
    formData.append('customer_mobile', phone)
    formData.append('customer_email', email)
    formData.append('password', password)

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/customer_signup`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        if (response.response_status === 0) {
          toast.error(response.message, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        }

        if (response.response_status === 200) {
          toast.success(response.data, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        }

        console.log(response)
      })
  }

  return (
    <div className='ps-my-account'>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ToastContainer />
      <div className='container'>
        <Form className='ps-form--account'>
          <ul className='ps-tab-list'>
            <li>
              <Link href='/account/login'>
                <a>Login</a>
              </Link>
            </li>
            <li className='active'>
              <Link href='/account/register'>
                <a>Register</a>
              </Link>
            </li>
          </ul>
          <div className='ps-tab active' id='register'>
            <div className='ps-form__content pb-4'>
              <h5>Register An Account</h5>
              <div className='form-group'>
                <Form.Item
                  name='fullName'
                  rules={[
                    {
                      required: true,
                      message: 'Please insert your full name!',
                    },
                  ]}
                >
                  <Input
                    className='form-control'
                    type='text'
                    placeholder='Full Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Item>
              </div>
              <div className='form-group'>
                <Form.Item
                  name='address'
                  rules={[
                    {
                      required: true,
                      message: 'Please insert your Address!',
                    },
                  ]}
                >
                  <Input
                    className='form-control'
                    type='text'
                    placeholder='Address'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Form.Item>
              </div>
              <div className='form-group'>
                <Form.Item
                  name='email'
                  rules={[
                    {
                      required: true,
                      message: 'Please insert your email!',
                    },
                  ]}
                >
                  <Input
                    className='form-control'
                    type='email'
                    placeholder='Email address'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Item>
              </div>
              <div className='form-group'>
                <Form.Item
                  name='phone'
                  rules={[
                    {
                      required: true,
                      message: 'Phone number is required!',
                    },
                  ]}
                >
                  <Input
                    className='form-control'
                    type='phone number'
                    placeholder='Phone Number'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Form.Item>
              </div>
              <div className='form-group form-forgot'>
                <Form.Item
                  name='password'
                  rules={[
                    {
                      required: true,
                      message: 'Password is required!',
                    },
                  ]}
                >
                  <Input
                    className='form-control'
                    type='password'
                    placeholder='Password...'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Item>
              </div>
              <div className='form-group submit'>
                <button
                  type='submit'
                  className='ps-btn ps-btn--fullwidth'
                  onClick={handleSubmit}
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default Register
