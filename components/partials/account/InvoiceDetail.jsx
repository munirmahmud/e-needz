import { Modal } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import TrackOrders from "~/pages/account/invoice-details/TrackOrders";
import ProductCart from "../../elements/products/ProductCart";
import AccountMenuSidebar from "./modules/AccountMenuSidebar";

const InvoiceDetail = () => {
  const Router = useRouter();
  const { pid } = Router.query;
  const [orderInfo, setOrderInfo] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [issueType, setIssueType] = useState([]);
  const [issueID, setIssueID] = useState("");
  const [authCookie] = useCookies(["auth"]);
  const [issueItems, setIssueItems] = useState({
    issue_type: "",
    description: "",
    attachment: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setIssueItems({ ...issueItems, [name]: value });
  };

  const setModal1Visible = () => {
    setOpenModal(true);
  };

  const setModal2Visible = () => {
    setOpenModal(false);
  };

  const getOrderDetails = async () => {
    let formData = new FormData();

    formData.append("order_id", pid);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CUSTOMER_DASHBOARD}/details_order`,
      {
        method: "POST",
        body: formData,
      }
    );
    const apiData = await response.json();

    let newProduct = {};
    if (apiData?.response_status === 200) {
      setOrderInfo(apiData.data);
    }
  };

  useEffect(() => {
    getOrderDetails();
  }, [pid]);

  const handleCancelOrder = async () => {
    let formData = new FormData();

    formData.append("order_id", pid);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CUSTOMER_DASHBOARD}/cancel_order`,
      {
        method: "POST",
        body: formData,
      }
    );
    const apiData = await response.json();

    if (apiData.response_status === 200) {
      toast.success(apiData.message);
    } else {
      toast.error(apiData.message);
    }
  };

  const handleOpenModal = async () => {
    setOpenModal(true);
    let formData = new FormData();

    formData.append("customer_id", authCookie.auth);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CUSTOMER_DASHBOARD}/issuetype_list`,
      {
        method: "POST",
        body: formData,
      }
    );
    const apiData = await response.json();

    if (apiData.response_status === 200) {
      setIssueType(apiData.data);
    } else {
      toast.error(apiData.message);
    }
  };

  const handleSubmitIssue = () => {
    let formData = new FormData();

    // formData.append("issueType_id", authCookie.auth);
    // formData.append("order_id", authCookie.auth);
    // formData.append("details", authCookie.auth);
    // formData.append("submited_by", authCookie.auth);
    // formData.append("action", authCookie.auth);
    // formData.append("attachment", authCookie.auth);
    // const response = await fetch(
    //   `${process.env.NEXT_PUBLIC_CUSTOMER_DASHBOARD}/issue_create`,
    //   {
    //     method: "POST",
    //     body: formData,
    //   }
    // );
    // const apiData = await response.json();

    // if (apiData.response_status === 200) {
    //   setIssueType(apiData.data);
    // } else {
    //   toast.error(apiData.message);
    // }
  };

  const accountLinks = [
    {
      text: "Account Information",
      url: "/account/user-information",
      icon: "icon-user",
    },
    {
      text: "Notifications",
      url: "/account/notifications",
      icon: "icon-alarm-ringing",
    },
    {
      text: "Invoices",
      url: "/account/invoices",
      icon: "icon-papers",
      active: true,
    },
    {
      text: "Address",
      url: "/account/addresses",
      icon: "icon-papers",
    },
    {
      text: "Recent Viewed Product",
      url: "/account/recent-viewed-product",
      icon: "icon-papers",
    },
    {
      text: "Wishlist",
      url: "/account/wishlist",
      icon: "icon-papers",
    },
  ];

  return (
    <section className="ps-my-account ps-page--account">
      <div className="ps-container">
        <div className="row">
          <div className="col-lg-3">
            <div className="ps-page__left">
              <AccountMenuSidebar data={accountLinks} />
            </div>
          </div>
          <div className="col-lg-9">
            <div className="ps-page__content">
              <div className="ps-section--account-setting">
                <div className="ps-section__header d-flex align-items-center justify-content-between">
                  <h3>
                    Invoice No #{pid}
                    {/* -<strong>Successful delivery</strong> */}
                  </h3>
                  <button
                    className="ps-btn btn-small"
                    type="button"
                    onClick={handleCancelOrder}
                  >
                    Cancel Order
                  </button>
                </div>
                <div className="ps-section__content">
                  <div className="row">
                    <div className="col-md-7 col-12">
                      <figure className="ps-block--invoice">
                        <figcaption>Ordered From</figcaption>
                        <div className="ps-block__content">
                          <strong>
                            {orderInfo?.company_details?.company_name}
                          </strong>
                          <p>
                            <strong>Address:</strong>{" "}
                            {orderInfo?.company_details?.address}
                          </p>
                          <p>
                            <strong>Phone:</strong>{" "}
                            {orderInfo?.company_details?.mobile}
                          </p>
                          <p>
                            <strong>Email:</strong>{" "}
                            {orderInfo?.company_details?.email}
                          </p>
                          <p>
                            <Link
                              href={`${orderInfo?.company_details?.website}`}
                            >
                              <a target="_blank">Visit Sellar Website</a>
                            </Link>{" "}
                          </p>
                        </div>
                      </figure>
                    </div>
                    {/* <div className="col-md-4 col-12">
                      <figure className="ps-block--invoice">
                        <figcaption>Ordered Info</figcaption>
                        <div className="ps-block__content">
                          <p>
                            <strong>Order Date:</strong> {orderInfo?.date}
                          </p>
                          <p>
                            <strong>Order ID:</strong> {orderInfo?.order_id}
                          </p>
                          <p>
                            <strong>Order No:</strong> {orderInfo?.order_no}
                          </p>
                          <p>
                            <strong>Payment Status:</strong>{" "}
                            {orderInfo?.payment_status}
                          </p>
                          <p>
                            <strong>Payment Method:</strong>{" "}
                            {orderInfo?.pmethod}
                          </p>
                        </div>
                      </figure>
                    </div> */}
                    <div className="col-md-5 col-12">
                      <figure className="ps-block--invoice">
                        <figcaption>Bills To</figcaption>
                        <div className="ps-block__content">
                          <strong>{orderInfo?.customer_name}</strong>
                          <p>
                            <strong>Address:</strong>{" "}
                            {orderInfo?.customer_short_address}
                          </p>
                          <p>
                            <strong>Phone:</strong> {orderInfo?.customer_mobile}
                          </p>
                          <p>
                            <strong>Email:</strong> {orderInfo?.customer_email}
                          </p>
                        </div>
                        <div className="btns-wrapper mt-4 d-flex ">
                          <button
                            className="ps-btn btn-small mr-3"
                            onClick={handleOpenModal}
                          >
                            Report an issue
                          </button>
                          <button className="ps-btn btn-black btn-small">
                            Check Existing Issues
                          </button>
                        </div>
                      </figure>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table className="table ps-table--shopping-cart">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Products</th>
                          <th>Price</th>
                          <th>Discount</th>
                          <th>Quantity</th>
                          <th>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orderInfo?.product_information?.map(
                          (product, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>
                                <ProductCart product={product} />
                              </td>
                              <td>৳ {product.rate}</td>
                              <td>৳ {product.discount_per_product}</td>
                              <td>{product.quantity}</td>
                              <td>৳ {product.amount}</td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                  <Link href="/account/invoices">
                    <a className="ps-btn ps-btn--sm">Back to invoices</a>
                  </Link>
                </div>
              </div>
            </div>

            <TrackOrders order_id={orderInfo?.order_id} />
          </div>
        </div>
      </div>

      <Modal
        title="Submit an issue"
        style={{ top: 20 }}
        centered
        visible={openModal}
        onOk={() => setOpenModal(false)}
        onCancel={() => setOpenModal(false)}
      >
        <div className="form-group">
          <label htmlFor="issue_type">Issue Type</label>
          <select
            name="issue_type"
            placeholder="Select Issue Type"
            id="issue_type"
            className="form-control"
            defaultValue={issueID}
            onChange={handleChange}
          >
            {issueType.length &&
              issueType.map((issue, index) => (
                <option value={issue.issueType_id}>{issue.type_name}</option>
              ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="2"
            className="form-control"
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="attachment" className="sr-only">
            Attachment
          </label>
          <input type="file" id="attachment" className="form-control" />
        </div>
        <button className="ps-btn" type="button" onClick={handleSubmitIssue}>
          Submit
        </button>
      </Modal>
    </section>
  );
};

export default InvoiceDetail;
