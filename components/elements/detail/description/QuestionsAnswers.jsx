import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { connect } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const QuestionsAnswers = ({ auth, product_id, category_id, seller_id }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    var formdata = new FormData();
    formdata.append("product_id", "15931");
    formdata.append("seller_id", "WKFRJM18");

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "http://178.128.30.38/api/react/customer_dashboard/question_view",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.response_status === 200) {
          setReviews(result.data);
        }
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  }, [seller_id, product_id]);

  const [uCookie] = useCookies(["auth"]);
  const [question, setQuestion] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    var formdata = new FormData();
    formdata.append("product_id", product_id);
    formdata.append("seller_id", seller_id);
    formdata.append("category_id", category_id);
    formdata.append("customer_id", uCookie.auth);

    formdata.append(
      "question_details",
      "Is there any discount of this product?"
    );

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "http://178.128.30.38/api/react/customer_dashboard/insert_question",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.response_status === 200) {
          toast.success("Your Question Has been submited");
        } else {
          toast.warning("Something went wrong");
        }
        setQuestion("");
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="ps-document">
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
      <h3>Questions </h3>

      {reviews.map((data, index) => (
        <div key={index}>
          <h4>
            Q{index + 1}. {data.details[0].question_details}{" "}
          </h4>
          {data.details[0].question_answer ? (
            <h5>Ans - {data.details[0].question_answer} </h5>
          ) : (
            ""
          )}
        </div>
      ))}

      {auth.isLoggedIn ? (
        <>
          <h5 className="mt-4" style={{ marginTop: "35px !important" }}>
            Questions about this product{" "}
          </h5>
          <form onSubmit={handleSubmit}>
            <div className="form-group d-flex">
              <label htmlFor="question" className="sr-only">
                Question
              </label>
              <input
                type="text"
                id="question"
                className="form-control"
                placeholder="Enter your question here..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
              <button className="ps-btn" type="submit">
                Submit
              </button>
            </div>
          </form>
        </>
      ) : (
        <h5 style={{ color: "red", marginTop: "45px" }}>
          You have to be loggid in to submit your question
        </h5>
      )}
    </div>
  );
};

export default connect((state) => state)(QuestionsAnswers);
