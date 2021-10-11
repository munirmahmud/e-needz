import Link from "next/link";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { connect } from "react-redux";
import { toast } from "react-toastify";

const QuestionsAnswers = ({ auth, product_id, category_id, seller_id }) => {
  const [reviews, setReviews] = useState([]);
  const [qu, setQu] = useState(true);

  useEffect(() => {
    var formdata = new FormData();
    formdata.append("product_id", product_id);
    formdata.append("seller_id", seller_id);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(
      `${process.env.NEXT_PUBLIC_CUSTOMER_DASHBOARD}/question_view`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.response_status === 200) {
          setReviews(result.data);
        }
      })
      .catch((error) => console.log("error", error));
  }, [seller_id, product_id, qu]);

  const [uCookie] = useCookies(["auth"]);
  const [question, setQuestion] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    var formdata = new FormData();
    formdata.append("product_id", product_id);
    formdata.append("seller_id", seller_id);
    formdata.append("category_id", category_id);
    formdata.append("customer_id", uCookie.auth.id);

    formdata.append("question_details", question);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(
      `${process.env.NEXT_PUBLIC_CUSTOMER_DASHBOARD}/insert_question`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.response_status === 200) {
          toast.success("Your Question Has been submited");
          setQu(!qu);
          setQuestion("");
        } else {
          toast.warning(result.message);
        }
      })
      .catch((error) => console.log("insert_question error", error));
  };

  return (
    <div className="ps-document">
      <h3>Questions </h3>

      {auth.isLoggedIn ? (
        <>
          <p className="mt-4" style={{ marginTop: "35px !important" }}>
            Questions about this product{" "}
          </p>
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
        <p>
          Please{" "}
          <Link href="/account/login">
            <a style={{ color: "#fd8b01" }}>Login</a>
          </Link>{" "}
          or{" "}
          <Link href="/account/register">
            <a style={{ color: "#fd8b01" }}>Register</a>
          </Link>{" "}
          to submit your question
        </p>
      )}

      {reviews?.map((data, index) => (
        <div key={index} className="question-wrapper">
          {data?.details?.map((item) => (
            <div className="question-item">
              <p className="question">
                <span>Q</span>
                {item.question_details}
              </p>
              <p className="answer">
                <span>A</span> {item.question_answer}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default connect((state) => state)(QuestionsAnswers);
