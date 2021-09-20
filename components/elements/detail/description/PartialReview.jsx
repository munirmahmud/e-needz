import { Rate } from "antd";
import Link from "next/link";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { connect } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Rating from "~/components/elements/Rating";

const PartialReview = ({ auth, product_id, seller_id }) => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [rating, setRating] = useState(3);

  const [uCookie] = useCookies(["auth"]);

  const handleReviewReuest = (e) => {
    e.preventDefault();
    var formdata = new FormData();
    formdata.append("product_id", product_id);
    formdata.append("customer_id", uCookie.auth);
    formdata.append("seller_id", seller_id);
    formdata.append("rating_no", rating);
    formdata.append("title", title);
    formdata.append("review_details", description);

    var requestOptions = {
      method: "POST",
      body: formdata,
    };

    fetch(
      `${process.env.NEXT_PUBLIC_CUSTOMER_DASHBOARD}/customer_review`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.response_status === 200) {
          toast.success("Thanks for the review");
        } else if (result.response_status === 0) {
          toast.warning(result.message);
          setTitle("");
          setDescription("");
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="row">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
      />
      <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12 ">
        <div className="ps-block--average-rating">
          <div className="ps-block__header">
            <h3>4.00</h3>
            <Rating />

            <span>1 Review</span>
          </div>
          <div className="ps-block__star">
            <span>5 Star</span>
            <div className="ps-progress" data-value="100">
              <span></span>
            </div>
            <span>100%</span>
          </div>
          <div className="ps-block__star">
            <span>4 Star</span>
            <div className="ps-progress" data-value="0">
              <span></span>
            </div>
            <span>0</span>
          </div>
          <div className="ps-block__star">
            <span>3 Star</span>
            <div className="ps-progress" data-value="0">
              <span></span>
            </div>
            <span>0</span>
          </div>
          <div className="ps-block__star">
            <span>2 Star</span>
            <div className="ps-progress" data-value="0">
              <span></span>
            </div>
            <span>0</span>
          </div>
          <div className="ps-block__star">
            <span>1 Star</span>
            <div className="ps-progress" data-value="0">
              <span></span>
            </div>
            <span>0</span>
          </div>
        </div>
      </div>

      {auth.isLoggedIn ? (
        <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12 ">
          <form className="ps-form--review" onSubmit={handleReviewReuest}>
            <h4>Submit Your Review</h4>
            <p>
              Your email address will not be published. Required fields are
              marked
              <sup>*</sup>
            </p>

            <div className="form-group form-group__rating">
              <label>Your rating of this product</label>
              <Rate
                defaultValue={3.5}
                allowHalf
                onChange={(e) => {
                  setRating(e);
                }}
              />
            </div>

            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <textarea
                className="form-control"
                rows="6"
                placeholder="Write your review here"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="form-group submit">
              <button className="ps-btn">Submit Review</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12 ">
          <p>
            Please{" "}
            <Link href="/account/login">
              <a style={{ color: "#fd8b01" }}>Login</a>
            </Link>{" "}
            or{" "}
            <Link href="/account/register">
              <a style={{ color: "#fd8b01" }}>Register</a>
            </Link>{" "}
            to submit your Review
          </p>
        </div>
      )}
    </div>
  );
};
export default connect((state) => state)(PartialReview);
