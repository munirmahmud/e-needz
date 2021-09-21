import { Form, Input, Modal } from "antd";
import Link from "next/link";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const FormCheckoutInformation = () => {
  const [authCookie] = useCookies(["auth"]);

  const [addresses, setAddresses] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleLoginSubmit = () => {
    Router.push("/account/shipping");
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleHideModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const getCustomerAddress = async () => {
      let formData = new FormData();

      // formData.append("customer_id", authCookie.auth);
      formData.append("customer_id", "1508");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CUSTOMER_DASHBOARD}/customer_address`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();

      if (data?.response_status === 200) {
        setAddresses(data?.data?.address_list);
      }
    };

    getCustomerAddress();
  }, []);

  const handleDivision = async (e) => {
    let formData = new FormData();

    formData.append("customer_id", "1508");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CUSTOMER_DASHBOARD}/statelist`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    console.log("state", data);

    if (data?.response_status === 200) {
      setDivisions(data?.data);
    }
  };

  return (
    <>
      <h5 className="ps-form__heading">Address</h5>

      <div className="d-flex align-items-center">
        <select
          class="form-control"
          aria-label="Customer Address"
          name="address"
          style={{ flex: 1 }}
        >
          {addresses.length > 0 &&
            addresses.map((item) => (
              <option key={item.address_id} value={item.address_id}>
                {item.address}
              </option>
            ))}
        </select>

        <button
          type="button"
          className="ps-btn btn-black ml-3"
          onClick={handleShowModal}
        >
          Add new Address
        </button>
      </div>

      <Modal
        title="Add New Address"
        visible={showModal}
        onOk={handleHideModal}
        onCancel={handleHideModal}
        okText="Save"
        cancelText="Cancel"
      >
        <div className="form-group d-flex">
          <input
            type="text"
            className="form-control mr-2"
            placeholder="Recipient Name"
          />
          <input type="text" className="form-control" placeholder="Phone No" />
        </div>
        <div className="area-group form-group d-flex">
          <select
            class="form-control mr-2"
            aria-label="Select Division"
            name="division"
            onClick={handleDivision}
          >
            {divisions.length === 0 && (
              <option value="0">Select Division</option>
            )}
            {divisions.length > 0 &&
              divisions.map((division) => (
                <option key={division.id} value={division.id}>
                  {division.name}
                </option>
              ))}
          </select>
          <select
            class="form-control mr-2"
            aria-label="Select City"
            name="city"
            style={{ flex: 1 }}
          >
            {addresses.length > 0 &&
              addresses.map((item) => (
                <option key={item.address_id} value={item.address_id}>
                  {item.address}
                </option>
              ))}
          </select>
          <input type="text" className="form-control" placeholder="Area" />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Your Address"
          />
        </div>
      </Modal>

      <Form
        className="ps-form__billing-info"
        autoComplete="off"
        onFinish={handleLoginSubmit}
      >
        <div className="form-group">
          <Form.Item
            name="name"
            rules={[
              {
                required: false,
                message: "Enter an email or mobile phone number!",
              },
            ]}
          >
            <Input
              className="form-control"
              type="text"
              placeholder="Email or phone number"
            />
          </Form.Item>
        </div>
        <div className="form-group">
          <div className="ps-checkbox">
            <input className="form-control" type="checkbox" id="keep-update" />
            <label htmlFor="keep-update">
              Keep me up to date on news and exclusive offers?
            </label>
          </div>
        </div>
        <h3 className="ps-form__heading">Shipping address</h3>
        <div className="row">
          <div className="col-sm-6">
            <div className="form-group">
              <Form.Item
                name="firstName"
                rules={[
                  {
                    required: false,
                    message: "Enter your first name!",
                  },
                ]}
              >
                <Input
                  className="form-control"
                  type="text"
                  placeholder="First Name"
                />
              </Form.Item>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <Form.Item
                name="lastName"
                rules={[
                  {
                    required: false,
                    message: "Enter your last name!",
                  },
                ]}
              >
                <Input
                  className="form-control"
                  type="text"
                  placeholder="Last Name"
                />
              </Form.Item>
            </div>
          </div>
        </div>
        <div className="form-group">
          <Form.Item
            name="address"
            rules={[
              {
                required: false,
                message: "Enter an address!",
              },
            ]}
          >
            <Input className="form-control" type="text" placeholder="Address" />
          </Form.Item>
        </div>
        <div className="form-group">
          <Form.Item
            name="apartment"
            rules={[
              {
                required: false,
                message: "Enter an Apartment!",
              },
            ]}
          >
            <Input
              className="form-control"
              type="text"
              placeholder="Apartment, suite, etc. (optional)"
            />
          </Form.Item>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <div className="form-group">
              <Form.Item
                name="city"
                rules={[
                  {
                    required: false,
                    message: "Enter a city!",
                  },
                ]}
              >
                <Input
                  className="form-control"
                  type="city"
                  placeholder="City"
                />
              </Form.Item>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <Form.Item
                name="postalCode"
                rules={[
                  {
                    required: false,
                    message: "Enter a postal oce!",
                  },
                ]}
              >
                <Input
                  className="form-control"
                  type="postalCode"
                  placeholder="Postal Code"
                />
              </Form.Item>
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="ps-checkbox">
            <input
              className="form-control"
              type="checkbox"
              id="save-information"
            />
            <label htmlFor="save-information">
              Save this information for next time
            </label>
          </div>
        </div>
        <div className="ps-form__submit">
          <Link href="/account/cart">
            <a>
              <i className="icon-arrow-left mr-2"></i>
              Return to shopping cart
            </a>
          </Link>
          <div className="ps-block__footer">
            <button className="ps-btn">Continue to shipping</button>
          </div>
        </div>
      </Form>
    </>
  );
};

export default FormCheckoutInformation;
