import { LoadingOutlined } from "@ant-design/icons";
import { Form, Modal, Spin } from "antd";
import { remove } from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { connect, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import useEcomerce from "~/hooks/useEcomerce";
import { setCartItems } from "~/store/ecomerce/action";
import { calculateAmount } from "~/utilities/ecomerce-helpers";

const FormCheckoutInformation = ({ ecomerce }) => {
  const dispatch = useDispatch();
  const Router = useRouter();
  const [authCookie, removeCookie] = useCookies(["auth", "cart"]);
  const [setCookie] = useCookies(["amnt"]);
  const { products, getProducts } = useEcomerce();
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const [values, setValues] = useState({
    recipientName: "",
    phoneNo: "",
    state: "",
    city: "",
    area: "",
    address: "",
  });
  const [addresses, setAddresses] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [cityNames, setCityNames] = useState([]);
  const [divisionID, setDivisionID] = useState("");
  const [primaryAddress, setPrimaryAddress] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [reRender, setReRender] = useState(false);
  const [agreeWithTerms, setAgreeWithTerms] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);
  const [isSubmitSuccess, setSubmitSuccess] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedPrimaryAddress, setSelectedPrimaryAddress] = useState(null);

  let amount;
  if (products && products?.length > 0) {
    amount = calculateAmount(products);
  }

  useEffect(() => {
    if (ecomerce.cartItems) {
      getProducts(ecomerce.cartItems, "cart");
    }
  }, [ecomerce]);

  useEffect(() => {
    const getCustomerAddress = async () => {
      let formData = new FormData();

      formData.append("customer_id", authCookie.auth?.id);
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
        setSelectedPrimaryAddress(
          data?.data?.address_list.find((item) => item.is_primary === "1")
        );
      }
    };

    getCustomerAddress();
  }, [reRender, isSubmitSuccess]);

  const handleLoginSubmit = () => {
    Router.push("/account/shipping");
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleHideModal = (e) => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleDivision = async (e) => {
    let formData = new FormData();

    formData.append("customer_id", authCookie.auth?.id);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CUSTOMER_DASHBOARD}/statelist`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();

    if (data?.response_status === 200) {
      setDivisions(data?.data);
    }
  };

  const getDivision = (e) => {
    setDivisionID(e.target.value);
  };

  const handleCity = async (e) => {
    let formData = new FormData();

    formData.append("customer_id", authCookie.auth?.id);
    formData.append("state_id", divisionID);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CUSTOMER_DASHBOARD}/citylist`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (data?.response_status === 200) {
      const selectCity = {
        id: "00",
        name: "Select City",
      };
      setCityNames((prevCity) => [selectCity, ...data?.data]);
    }
  };

  const handleCreateAddress = async (e) => {
    setLoading(true);
    var formdata = new FormData();

    formdata.append("customer_id", authCookie.auth?.id);
    formdata.append("customer_name", values.recipientName);
    formdata.append("customer_phone", values.phoneNo);
    formdata.append("division", divisionID); //State ID
    formdata.append("city", values.city); //City ID
    formdata.append("area", values.area);
    formdata.append("address", values.address);

    try {
      var requestOptions = {
        method: "POST",
        body: formdata,
      };

      fetch(
        `${process.env.NEXT_PUBLIC_CUSTOMER_DASHBOARD}/create_address`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          if (result.response_status === 0) {
            toast.error(result.message);
          }

          if (result.response_status === 200) {
            toast.success("You could successfully added a new address");
            setLoading(false);
            setShowModal(false);
            setReRender(!reRender);

            setValues({
              recipientName: "",
              phoneNo: "",
              state: "",
              city: "",
              area: "",
              address: "",
            });
          }
        });
    } catch (error) {
      console.log("Create new address error", error);
    }
  };

  const getPrimaryAddress = addresses?.find((item) => item.is_primary === "1");

  const handleConfirmOrder = async (e) => {
    setSubmitted(true);
    const address = selectedAddress || getPrimaryAddress?.address_id;
    let formData = new FormData();
    let newItems = [];

    const cartItems = authCookie?.cart?.map((item) => {
      newItems.push({
        product_id: item.id,
        campaign_id: item.campaign_id,
        qty: item.quantity,
      });
    });

    if (!authCookie.auth.id && authCookie.auth?.id !== undefined) {
      toast.error("Please login first & then confirm order");
      setSubmitted(false);
      return;
    } else if (!address) {
      toast.error("Please select your address");
      setSubmitted(false);
      return;
    } else if (!agreeWithTerms) {
      toast.error("You are not agreed yet with our terms & conditions.");
      setSubmitted(false);
      return;
    } else if (cartItems === undefined) {
      toast.error("No items in your cart");
      setSubmitted(false);
      return;
    }

    formData.append("customer_id", authCookie.auth?.id);
    formData.append("address_id", address);
    formData.append("cart_details", JSON.stringify(newItems));
    formData.append("response_url", `${location.origin}/account/invoices`);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CUSTOMER_DASHBOARD}/submit_checkout`,
      {
        method: "POST",
        body: formData,
      }
    );
    const result = await response.json();

    console.log("submit_checkout", result);

    if (result.response_status === 0) {
      toast.error(result.message);
      setSubmitted(false);
    } else if (result?.response_status === 200) {
      toast.success("Your order has been placed successfully!");
      setAddresses(result?.data?.address_list);
      remove("cart");
      dispatch(setCartItems([]));
      setSubmitted(false);
      setSubmitSuccess(!isSubmitSuccess);
      setAgreeWithTerms(false);
      Router.push("/account/invoices");
    } else {
      setSubmitted(false);
      toast.error(result.message);
    }
  };

  return (
    <>
      <h5 className="ps-form__heading">Address</h5>

      <div className="d-flex align-items-center">
        <select
          className="form-control"
          aria-label="Customer Address"
          name="address"
          style={{ flex: 1 }}
          onChange={(e) => setSelectedAddress(e.target.value)}
        >
          {addresses?.length > 0 &&
            addresses.map((item) =>
              item.is_primary === "1" ? (
                <option key={item.address_id} value={item.address_id} selected>
                  {item.address}
                </option>
              ) : (
                <option key={item.address_id} value={item.address_id}>
                  {item.address}
                </option>
              )
            )}
        </select>

        <button
          type="button"
          className="ps-btn btn-black ml-3"
          onClick={handleShowModal}
        >
          Add new Address
        </button>
      </div>

      <div className="primary-address mt-4">
        {getPrimaryAddress && (
          <p>{`${getPrimaryAddress.customer_name} 
          ${getPrimaryAddress.customer_phone} 
          ${getPrimaryAddress.address} 
          ${getPrimaryAddress.area} 
          ${getPrimaryAddress.city} 
          ${getPrimaryAddress.division}`}</p>
        )}
      </div>

      <Modal
        title="Add New Address"
        visible={showModal}
        onOk={handleCreateAddress}
        onCancel={handleHideModal}
        okText="Save"
        cancelText="Cancel"
      >
        <form onSubmit={handleCreateAddress} autoComplete="off">
          <div className="form-group d-flex">
            <input
              type="text"
              name="recipientName"
              className="form-control mr-2"
              placeholder="Recipient Name"
              value={values.recipientName}
              onChange={handleChange}
            />
            <input
              type="text"
              name="phoneNo"
              className="form-control"
              placeholder="Phone No"
              value={values.phoneNo}
              onChange={handleChange}
            />
          </div>
          <div className="area-group form-group d-flex">
            <select
              className="form-control mr-2"
              aria-label="Select Division"
              name="division"
              onClick={handleDivision}
              onChange={getDivision}
            >
              {divisions?.length === 0 && (
                <option value="0">Select Division</option>
              )}
              {divisions?.length > 0 &&
                divisions.map((division) => (
                  <option key={division.id} value={division.id}>
                    {division.name}
                  </option>
                ))}
            </select>
            <select
              className="form-control mr-2"
              aria-label="Select City"
              name="city"
              style={{ flex: 1 }}
              onClick={handleCity}
              onChange={handleChange}
            >
              {cityNames.length === 0 && <option value="0">Select City</option>}
              {cityNames.length > 0 &&
                cityNames.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
            </select>
            <input
              type="text"
              name="area"
              className="form-control"
              placeholder="Area"
              value={values.area}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="address"
              className="form-control"
              placeholder="Enter Your Address"
              value={values.address}
              onChange={handleChange}
            />
          </div>
        </form>

        {isLoading && (
          <div className="spinner-wrapper">
            <Spin indicator={antIcon} />
          </div>
        )}
      </Modal>

      <Form
        className="ps-form__billing-info"
        autoComplete="off"
        onFinish={handleLoginSubmit}
      >
        <div className="form-group mt-5">
          <p>* For this order these Order Policy applicable</p>
          <p>* Price included VAT for VAT applicable products</p>
          <div className="ps-checkbox">
            <input
              className="form-control"
              type="checkbox"
              id="keep-update"
              onChange={() => setAgreeWithTerms(!agreeWithTerms)}
            />
            <label htmlFor="keep-update">
              I agree to the{" "}
              <Link href="/terms-conditions">
                <a>Terms &amp; Conditions</a>
              </Link>{" "}
              and{" "}
              <Link href="/privacy-policy">
                <a>Privacy Policy</a>
              </Link>{" "}
              of E-needz.
            </label>
          </div>
        </div>

        <div className="ps-form__submit d-flex align-items-center justify-content-between">
          <div className="ps-block__footer">
            <Link href="/shop">
              <a className="ps-btn btn-small">Continue to Shopping</a>
            </Link>
          </div>
          <button
            type="button"
            onClick={handleConfirmOrder}
            className="ps-btn btn-small"
            disabled={!agreeWithTerms || isSubmitted}
          >
            Confirm Order
          </button>
        </div>
      </Form>
    </>
  );
};

export default connect((state) => state)(FormCheckoutInformation);
