import { Alert, Modal } from "antd";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import TrackOrders from "~/pages/account/invoice-details/TrackOrders";
import ProductCart from "../../elements/products/ProductCart";
import AccountMenuSidebar from "./modules/AccountMenuSidebar";

const InvoiceDetail = () => {
  const Router = useRouter();
  const { pid } = Router.query;
  const attachmentRef = useRef();
  const issueDetailsRef = useRef();

  const [authCookie] = useCookies(["auth"]);

  const [orderInfo, setOrderInfo] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openExistingIssueModal, setOpenExistingIssueModal] = useState(false);
  const [issueType, setIssueType] = useState([]);
  const [issueID, setIssueID] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [existingIssues, setExistingIssues] = useState([]);
  const [isSubmittedIssue, setSubmittedIssue] = useState(false);

  const [isIssueDetails, setIsIssueDetails] = useState(false);
  const [issueDetails, setIssueDetails] = useState({});
  const [isResolvedIssue, setResolvedIssue] = useState(false);

  const [customerComment, setCustomerComment] = useState("");
  const [isSubmittedComment, setSubmittedComment] = useState(false);
  const [issueComments, setIssueComments] = useState([]);

  const [isOrderCanceled, setisOrderCanceled] = useState(false);

  const [issueItems, setIssueItems] = useState({
    issue_type: "0",
    description: "",
  });

  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [payableAmount, setPayableAmount] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setIssueItems({ ...issueItems, [name]: value });
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
    const result = await response.json();
    let newProduct = {};
    if (result?.response_status === 200) {
      setOrderInfo(result.data);
      // setTotalAmount(result.data.total_amount)
    }
  };

  useEffect(() => {
    getOrderDetails();
  }, []);

  // CANCEL ORDER
  const handleCancelOrder = async () => {
    setisOrderCanceled(true);
    const confirmCancellation = confirm("Are you sure to cancel your order?");

    let formData = new FormData();

    formData.append("order_id", pid);

    if (confirmCancellation) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CUSTOMER_DASHBOARD}/cancel_order`,
        {
          method: "POST",
          body: formData,
        }
      );
      const result = await response.json();

      if (result.response_status === 200) {
        toast.success(result.message);
        setisOrderCanceled(false);
      } else {
        toast.error(result.message);
        setisOrderCanceled(false);
      }
    } else {
      setisOrderCanceled(false);
    }
  };

  const handleOpenModal = async () => {
    setOpenModal(true);
    let formData = new FormData();

    formData.append("customer_id", authCookie.auth?.id);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CUSTOMER_DASHBOARD}/issuetype_list`,
      {
        method: "POST",
        body: formData,
      }
    );
    const result = await response.json();

    if (result.response_status === 200) {
      const defautlIssue = {
        issueType_id: "0",
        type_name: "Select an Issue",
      };
      setIssueType([defautlIssue, ...result.data]);
    } else {
      console.log("issuetype_list error", result);
    }
  };

  const handleSubmitIssue = async () => {
    let formData = new FormData();
    setSubmittedIssue(true);

    if (issueItems.issue_type === "0") {
      toast.error("Please select an issue type");
      setSubmittedIssue(false);
      return;
    }

    formData.append("issueType_id", issueItems.issue_type); //Issue type ID
    formData.append("order_id", pid);
    formData.append("details", issueItems.description); //Issue details
    formData.append("submited_by", authCookie.auth?.id); //Customer ID
    formData.append("action", "1");

    attachment !== null && formData.append("attachment", attachment);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CUSTOMER_DASHBOARD}/issue_create`,
      {
        method: "POST",
        body: formData,
      }
    );
    const result = await response.json();

    if (result.response_status === 200) {
      toast.success(result.message);
      setIssueItems({
        issue_type: "0",
        description: "",
      });

      setAttachment(null);
      attachmentRef.current.value = "";
      setOpenModal(false);
      setSubmittedIssue(false);
    } else {
      setSubmittedIssue(false);
      toast.error(result.message);
    }
  };

  const handleExistingIssues = async () => {
    setOpenExistingIssueModal(true);
    let formData = new FormData();

    formData.append("order_id", pid);
    formData.append("customer_id", authCookie.auth?.id); //Customer ID
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CUSTOMER_DASHBOARD}/issue_list`,
      {
        method: "POST",
        body: formData,
      }
    );
    const result = await response.json();

    if (result.response_status === 200) {
      setExistingIssues(result.data);
    } else {
      console.log("issue_list", result);
    }
  };

  const getIssuesStatus = (issue) => {
    let issueStatus;
    if (issue.status === "0") {
      issueStatus = <span className="badge-btn alert-error">Blocked</span>;
    } else if (issue.status === "1") {
      issueStatus = <span className="badge-btn alert-success">Resolved</span>;
    } else if (issue.status === "2") {
      issueStatus = <span className="badge-btn alert-info">New Issue</span>;
    } else if (issue.status === "3") {
      issueStatus = <span className="badge-btn alert-warning">Checked</span>;
    }
    return issueStatus;
  };

  const handleIssueDetails = async (e) => {
    const formData = new FormData();

    formData.append("issue_id", e.currentTarget.dataset.issueid);
    formData.append("order_id", pid);
    formData.append("customer_id", authCookie.auth?.id); //Customer ID
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CUSTOMER_DASHBOARD}/issue_details`,
      {
        method: "POST",
        body: formData,
      }
    );
    const result = await response.json();

    if (result.response_status === 200) {
      setIsIssueDetails(true);
      setIssueDetails(result.data);
      setIssueComments(result.data.comment);
    } else if (result.response_status === 0) {
      console.log("issue ", result);
    } else {
      console.log("issue details", result);
    }
  };

  const getBackToIssues = (e) => {
    setIsIssueDetails(false);
    handleExistingIssues();
  };

  const handleSubmitComment = async () => {
    setSubmittedComment(true);
    const formData = new FormData();

    if (!customerComment) {
      toast.error("Comment field is empty. Please add your comment");
      setSubmittedComment(false);
      return;
    }

    formData.append("issueType_id", issueDetails.issueType_id);
    formData.append("order_id", pid);
    formData.append("issue_id", issueDetails.issue_id);
    formData.append("details", customerComment);
    formData.append("submited_by", authCookie.auth?.id); //Customer ID
    formData.append("action", 2);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CUSTOMER_DASHBOARD}/issue_create`,
      {
        method: "POST",
        body: formData,
      }
    );
    const result = await response.json();

    if (result.response_status === 200) {
      setCustomerComment("");
      setSubmittedComment(false);
      setIssueComments((prevComments) => [
        ...prevComments,
        {
          name: authCookie.auth?.name,
          msg: customerComment,
          date: `${moment().format(
            "D MMM YY"
          )} ${new Date().toLocaleTimeString()}`,
        },
      ]);
    } else {
      setSubmittedComment(false);
      console.log("Comment submition issue", result);
    }
  };

  const handleResolvedIssue = async () => {
    setSubmittedComment(true);
    const formData = new FormData();

    formData.append("issueType_id", issueDetails.issueType_id);
    formData.append("order_id", pid);
    formData.append("issue_id", issueDetails.issue_id);
    formData.append("details", customerComment);
    formData.append("submited_by", authCookie.auth?.id); //Customer ID
    formData.append("status", 1); //Status must be 1 to resolve the issue

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CUSTOMER_DASHBOARD}/issue_create`,
      {
        method: "POST",
        body: formData,
      }
    );
    const result = await response.json();

    if (result.response_status === 200) {
      setCustomerComment("");
      setSubmittedComment(false);
      toast.success("The issue has been resolved successfully!");
      setIssueDetails({
        ...issueDetails,
        status: "1",
      });
      setResolvedIssue(true);
    } else {
      console.log("issue resolved error", result);
    }
  };

  const handlePaymentAmount = () => {
    setPaymentModalOpen(true);
    setPayableAmount(orderInfo.due_amount);
  };
  // console.log(orderInfo);
  const handlePaymentPage = () => {
    const paymentInfo = {
      amount: payableAmount,
      order_id: orderInfo.order_id,
    };
    localStorage.setItem("_p_a_", JSON.stringify(paymentInfo));
    Router.push("/account/payment");
  };

  const orderStatus = (order_status) => {
    let badgeView;
    if (order_status === "1") {
      badgeView = "Pending";
    } else if (order_status === "2") {
      badgeView = "Processing";
    } else if (order_status === "3") {
      badgeView = "Shipping";
    } else if (order_status === "4") {
      badgeView = "Delivered";
    } else if (order_status === "5") {
      badgeView = "Returned";
    } else if (order_status === "6") {
      badgeView = "Cancelled";
    } else if (order_status === "7") {
      badgeView = "Partial Delivered";
    } else if (order_status === "18") {
      badgeView = "Refunded";
    } else if (order_status === "19") {
      badgeView = "Picked";
    } else if (order_status === "20") {
      badgeView = "Confirmed";
    }
    return badgeView;
  };

  const accountLinks = [
    {
      text: "Account Information",
      url: "/account/user-information",
      icon: "icon-user",
    },
    {
      text: "Invoices",
      url: "/account/invoices",
      icon: "icon-papers",
      active: true,
    },
    {
      text: "Track Order",
      url: "/account/order-tracking",
      icon: "icon-papers",
    },
    {
      text: "Payment History",
      url: "/account/payment-history",
      icon: "icon-cog",
    },
    {
      text: "Address",
      url: "/account/address",
      icon: "icon-map-marker",
    },
    {
      text: "Change Password",
      url: "/account/change-password",
      icon: "icon-lock",
    },
  ];

  const printInvoice = (divName) => {
    let printContents = document.getElementById(divName).innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    window.location.reload();
    document.body.innerHTML = originalContents;
  };

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
                    Order No #{orderInfo?.order_no}
                    {/* -<strong>Successful delivery</strong> */}
                  </h3>

                  <button
                    onClick={() => printInvoice("print_invoice")}
                    className="ps-btn ps-btn--sm"
                  >
                    Print
                  </button>

                  {orderInfo?.order_status === "1" && (
                    <button
                      type="button"
                      onClick={handlePaymentAmount}
                      className="ps-btn btn-small"
                    >
                      Make Payment
                    </button>
                    //   <Link href="/account/payment">
                    //     <a
                    //       className="ps-btn btn-small mb-3"
                    //       style={{ backgroundColor: "#222" }}
                    //       onClick={() =>}
                    //       // onClick={handlePaymentInformation}
                    //     >
                    //       Make Payment
                    //     </a>
                    //   </Link>
                  )}
                </div>
                <div id="print_invoice" className="ps-section__content">
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
                            <a
                              href={`${orderInfo?.company_details?.website}`}
                              target="_blank"
                            >
                              Visit Sellar Website
                            </a>
                          </p>
                        </div>
                      </figure>
                      <div className="btns-wrapper mt-4 d-flex flex-wrap">
                        <button
                          className="ps-btn btn-small mr-3 mb-3"
                          onClick={handleOpenModal}
                        >
                          Report an issue
                        </button>

                        <button
                          className="ps-btn btn-small mr-3 mb-3"
                          onClick={handleExistingIssues}
                        >
                          Check Existing Issues
                        </button>

                        {orderInfo.order_status === "1" && (
                          <button
                            className="ps-btn btn-small mb-3"
                            type="button"
                            onClick={handleCancelOrder}
                            disabled={isOrderCanceled}
                          >
                            Cancel Order
                          </button>
                        )}
                      </div>
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
                        <figcaption className="d-flex align-items-center justify-content-between">
                          Bills To
                          {orderInfo?.payment_status === "Paid" ? (
                            <button
                              className="ps-btn ps-btn--sm"
                              disabled
                              style={{ background: "#fd8b01" }}
                            >
                              {orderInfo?.payment_status}
                            </button>
                          ) : (
                            <button className="ps-btn ps-btn--sm" disabled>
                              {orderInfo?.payment_status}
                            </button>
                          )}
                        </figcaption>
                        <div className="ps-block__content">
                          <strong>{orderInfo?.customer_name}</strong>
                          <p>{authCookie?.auth?.mobile}</p>
                          <p>
                            <strong>Address:</strong>{" "}
                            {orderInfo?.customer_short_address}
                          </p>
                          <p>
                            <strong>Contact No:</strong>{" "}
                            {orderInfo?.customer_mobile}
                          </p>
                          <p>
                            <strong>Email:</strong> {orderInfo?.customer_email}
                          </p>
                          <hr />
                          <p>
                            <strong>Order No:</strong> {orderInfo?.order_no}
                          </p>
                          <p className="d-flex">
                            <strong className="mr-2">Order Status: </strong>{" "}
                            {orderStatus(orderInfo?.order_status)}
                          </p>
                          <p>
                            <strong>Order Date:</strong> {orderInfo?.date}
                          </p>
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
                          <th>Sell Price</th>
                          <th>Discount</th>
                          <th>Quantity</th>
                          <th>Amount</th>
                        </tr>
                      </thead>

                      <tbody>
                        {Array.isArray(orderInfo.product_information) &&
                          orderInfo?.product_information?.map(
                            (product, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                  <ProductCart product={product} />
                                </td>
                                <td>৳ {product.rate}</td>
                                <td>৳ {product.sell_price}</td>
                                <td>৳ {product.discount_per_product}</td>
                                <td>{product.quantity}</td>
                                <td>৳ {product.amount}</td>
                              </tr>
                            )
                          )}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-5 d-flex align-items-center justify-content-between">
                    <Link href="/account/invoices">
                      <a className="ps-btn ps-btn--sm">Back to invoices</a>
                    </Link>

                    <strong style={{ fontSize: 17 }}>
                      Total Amount: ৳ {orderInfo.total_amount}
                    </strong>
                  </div>
                </div>
              </div>
            </div>

            <TrackOrders orderData={orderInfo} />
          </div>
        </div>
      </div>

      {/* Modal for partial payment */}
      <Modal
        title="Make Payment"
        centered
        visible={paymentModalOpen}
        onOk={() => setPaymentModalOpen(false)}
        onCancel={() => setPaymentModalOpen(false)}
        footer={[
          <button
            key="submit"
            className="ps-btn btn-small"
            type="button"
            onClick={handlePaymentPage}
            // disabled={isSubmittedIssue}
          >
            Continue Payment
          </button>,
        ]}
      >
        <h4 style={{ fontWeight: 500 }}>How much do you want to Pay?</h4>
        <p>
          You can pay partially. We will start processing your order when
          payment is complete
        </p>

        <div className="form-group">
          <label htmlFor="attachment" className="sr-only">
            How much do you want to Pay?
          </label>
          <input
            type="text"
            id="payment_amount"
            className="form-control"
            value={payableAmount}
            onChange={(e) => setPayableAmount(e.target.value)}
          />
        </div>
      </Modal>

      {/* Modal for creating an issue */}
      <Modal
        title="Submit an issue"
        centered
        visible={openModal}
        onOk={() => setOpenModal(false)}
        onCancel={() => setOpenModal(false)}
        footer={[
          <button
            key="cancel"
            className="ps-btn btn-small mr-3"
            type="button"
            onClick={() => setOpenModal(false)}
          >
            Cancel
          </button>,
          <button
            key="submit"
            className="ps-btn btn-small"
            type="button"
            onClick={handleSubmitIssue}
            disabled={isSubmittedIssue}
          >
            Submit
          </button>,
        ]}
      >
        <div className="form-group">
          <label htmlFor="issue_type">Issue Type</label>
          <select
            name="issue_type"
            placeholder="Select Issue Type"
            id="issue_type"
            className="form-control"
            defaultValue={issueItems.issue_type}
            onChange={handleChange}
          >
            {Array.isArray(issueType) &&
              issueType?.length > 0 &&
              issueType?.map((issue, index) => (
                <option key={issue.type_name} value={issue.issueType_id}>
                  {issue.type_name}
                </option>
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
            value={issueItems.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <label htmlFor="attachment" className="sr-only">
            Attachment
          </label>
          <input
            type="file"
            id="attachment"
            className="form-control"
            ref={attachmentRef}
            onChange={(e) => setAttachment(e.target.files[0])}
          />
        </div>
      </Modal>

      {/* Modal for checking exisiting issues */}
      <Modal
        destroyOnClose={true}
        title={
          !isIssueDetails ? (
            "Existing issues agains this order"
          ) : (
            <span className="go-back-issues issss" onClick={getBackToIssues}>
              &larr;
            </span>
          )
        }
        centered
        visible={openExistingIssueModal}
        onOk={() => setOpenExistingIssueModal(false)}
        onCancel={() => setOpenExistingIssueModal(false)}
        footer={[]}
      >
        <div className="issues-wrapper">
          {!isIssueDetails ? (
            Array.isArray(existingIssues) && existingIssues.length > 0 ? (
              existingIssues.map((issue, index) => (
                <div
                  key={issue.issue_id}
                  className="issue d-flex"
                  data-issueid={issue.issue_id}
                  ref={issueDetailsRef}
                  onClick={handleIssueDetails}
                >
                  <div className="issue-status mr-4"></div>
                  <div className="issue-details">
                    <div className="d-flex align-items-center justify-content-between">
                      <span>
                        {moment(issue.date_time).format("D MMM YYYY")}{" "}
                        {moment(issue.date_time).format("h:mm:ss A")}
                      </span>
                      {getIssuesStatus(issue)}
                    </div>
                    <h5>{issue.type_name}</h5>
                    <p>Issue: {issue.details}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>Sorry, there is no existing issues found</p>
            )
          ) : (
            <div className="issue issue-details-wrapper">
              {/* <div className="issue-status mr-4"></div> */}
              <div className="issue-details mb-4">
                <div className="d-flex align-items-center justify-content-between">
                  <span className="mb-2">
                    {moment(issueDetails?.date_time).format("D MMM YYYY")}{" "}
                    {moment(issueDetails?.date_time).format("h:mm:ss A")}
                  </span>
                  {issueDetails.status !== "1" && (
                    <button
                      type="button"
                      className="ps-btn ps-btn--sm"
                      onClick={handleResolvedIssue}
                    >
                      Mark as resolved
                    </button>
                  )}
                </div>
                <h5 className="mb-4">{issueDetails?.type_name}</h5>

                <div className="mb-4">{getIssuesStatus(issueDetails)}</div>
                <p>Description: {issueDetails.details}</p>
              </div>

              {issueDetails?.attachment !== null && (
                <div className="attachment mt-5">
                  <p>Attachment: </p>
                  <a href={issueDetails.attachment} target="_blank">
                    <img
                      src={issueDetails.attachment}
                      alt={issueDetails.type_name}
                      width="120"
                    />
                  </a>
                </div>
              )}

              <div className="issue-comments mt-5">
                <h5 className="mb-2">Replies</h5>

                <div className="comments-wrapper">
                  {Array.isArray(issueComments) && issueComments.length > 0 ? (
                    issueComments.map((comment, index) => (
                      <div key={comment.cmnt_id} className="comment">
                        <p className="mb-0">
                          {authCookie?.auth?.name} -{" "}
                          {moment(comment.date_time).format("D MMM YYYY")}
                        </p>
                        <p>{comment.msg}</p>
                      </div>
                    ))
                  ) : (
                    <p>Sorry! No issues found</p>
                  )}
                </div>

                {issueDetails.status !== "1" ? (
                  <>
                    <div className="form-group">
                      <label htmlFor="reply" className="sr-only">
                        Customer Reply
                      </label>
                      <textarea
                        name="reply"
                        id="reply"
                        cols="20"
                        rows="2"
                        className="form-control"
                        value={customerComment}
                        onChange={(e) => setCustomerComment(e.target.value)}
                      />
                    </div>

                    <button
                      type="button"
                      className="ps-btn btn-small"
                      onClick={handleSubmitComment}
                      disabled={isSubmittedComment}
                    >
                      Submit
                    </button>
                  </>
                ) : (
                  issueComments?.length > 0 && (
                    <Alert message="Your issues resolved " type="success" />
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </Modal>
    </section>
  );
};

export default InvoiceDetail;
