import { Rate } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { connect } from "react-redux";
import { toast } from "react-toastify";

const PartialReview = ({ auth, product_id, seller_id }) => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [authCookie] = useCookies(["auth"]);

  const [rating, setRating] = useState("");
  const [productRating, setProductRating] = useState(null);
  const [customerReviews, setCustomerReviews] = useState([]);
  const [noReviewsFound, setNoReviewsFound] = useState("");
  const [avgRating, setAvgRating] = useState("");
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);

  useEffect(() => {
    getProductReview();
  }, [isReviewSubmitted]);

  async function getProductReview() {
    var formdata = new FormData();

    formdata.append("product_id", product_id);
    formdata.append("seller_id", seller_id);

    var requestOptions = {
      method: "POST",
      body: formdata,
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CUSTOMER_DASHBOARD}/show_review`,
      requestOptions
    );
    const result = await response.json();

    if (result.response_status === 200) {
      setProductRating(result.info);
      setCustomerReviews(result.data);
      setAvgRating(Number(result.info.avg_rating));
    } else {
      setNoReviewsFound(result.message);
      console.log("show_review error", result);
    }
  }

  const handleReviewReuest = (e) => {
    e.preventDefault();

    if (!rating) {
      toast.error("Rating no is required");
      return;
    } else if (!title) {
      toast.error("Review title is required");
      return;
    }

    var formdata = new FormData();
    formdata.append("product_id", product_id);
    formdata.append("customer_id", authCookie.auth.id);
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
          setTitle("");
          setDescription("");
          setIsReviewSubmitted(true);
        } else if (result.response_status === 0) {
          toast.warning(result.message);
          setTitle("");
          setDescription("");
        } else {
          console.log("customer_review", result);
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="row">
      <div className="col-xl-7 col-lg-7 col-sm-12 col-12 ">
        <div className="ps-block--average-rating">
          <div className="ps-block__header">
            <h3>{avgRating ? `${avgRating}.00` : "0.00"}</h3>

            {avgRating && (
              <div className="form-group form-group__rating">
                <Rate disabled allowHalf defaultValue={avgRating} />
              </div>
            )}
            {!avgRating && (
              <div className="form-group form-group__rating">
                <Rate disabled />
              </div>
            )}

            {Array.isArray(customerReviews) && customerReviews.length > 0 ? (
              <span>{customerReviews?.length} Review</span>
            ) : (
              <span>No product review found.</span>
            )}
          </div>

          <div className="ps-block__star">
            <span>5 Star</span>
            <div className="ps-progress" data-value="100">
              {productRating?.five_star !== "0" &&
              productRating?.five_star !== undefined ? (
                <span style={{ width: "100%" }}></span>
              ) : (
                <span></span>
              )}
            </div>
            <span>{productRating?.five_star !== "0" ? "100%" : 0}</span>
          </div>
          <div className="ps-block__star">
            <span>4 Star</span>
            <div className="ps-progress" data-value="80">
              {productRating?.four_star !== "0" &&
              productRating?.four_star !== undefined ? (
                <span style={{ width: "80%" }}></span>
              ) : (
                <span></span>
              )}
            </div>
            <span>{productRating?.four_star !== "0" ? "80%" : 0}</span>
          </div>
          <div className="ps-block__star">
            <span>3 Star</span>
            <div className="ps-progress" data-value="60">
              {productRating?.three_star !== "0" &&
              productRating?.three_star !== undefined ? (
                <span style={{ width: "60%" }}></span>
              ) : (
                <span></span>
              )}
            </div>
            <span>{productRating?.three_star !== "0" ? "60%" : 0}</span>
          </div>
          <div className="ps-block__star">
            <span>2 Star</span>
            <div className="ps-progress" data-value="40">
              {productRating?.two_star !== "0" &&
              productRating?.two_star !== undefined ? (
                <span style={{ width: "40%" }}></span>
              ) : (
                <span></span>
              )}
            </div>
            <span>{productRating?.two_star !== "0" ? "40%" : 0}</span>
          </div>

          <div className="ps-block__star">
            <span>1 Star</span>
            <div className="ps-progress" data-value="20">
              {productRating?.one_star !== "0" &&
              productRating?.one_star !== undefined ? (
                <span style={{ width: "20%" }}></span>
              ) : (
                <span></span>
              )}
            </div>
            <span>{productRating?.one_star !== "0" ? "20%" : 0}</span>
          </div>
        </div>

        <div className="customer-reviews mt-4 form-group__rating">
          <p>Product Reviews</p>
          <hr />
          {Array.isArray(customerReviews) &&
            customerReviews.length > 0 &&
            customerReviews.map((review) => (
              <div className="mb-5">
                <Rate
                  disabled
                  allowHalf
                  defaultValue={Number(review.rating_no)}
                />
                <div className="d-flex justify-content-between">
                  <p className="mb-0">
                    by {review?.customer_name}{" "}
                    {review.is_virified === "varified" && (
                      <span style={{ color: "green", fontSize: 12 }}>
                        <i className="ml-3 icon-checkmark-circle mr-2"></i>
                        Verified Purchase
                      </span>
                    )}
                  </p>
                  <p className="m-0">{review.date_time}</p>
                </div>
                <p className="mb-2">{review.title}</p>
                <p>{review.comments}</p>
              </div>
            ))}
        </div>
      </div>

      {auth.isLoggedIn ? (
        <div className="col-xl-5 col-lg-5 col-sm-12 col-12 ">
          <form className="ps-form--review" onSubmit={handleReviewReuest}>
            <h4>Submit Your Review</h4>
            <p>
              Your email address will not be published. Required fields are
              marked
              <sup>*</sup>
            </p>

            <div className="form-group form-group__rating">
              <label>Your rating for this product</label>
              <Rate
                defaultValue={4}
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
