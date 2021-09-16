import Link from "next/link";
import React from "react";

const QuestionsAnswers = () => {
  return (
    <div className="ps-document">
      <h5>Questions about this product (3)</h5>
      <p>
        <Link href="/account/login">
          <a style={{ color: "#fd8b01" }}>Login</a>
        </Link>{" "}
        or{" "}
        <Link href="/account/register">
          <a style={{ color: "#fd8b01" }}>Register</a>
        </Link>{" "}
        to ask questions
      </p>
      <form>
        <div className="form-group d-flex">
          <label htmlFor="question" className="sr-only">
            Question
          </label>
          <input
            type="text"
            id="question"
            className="form-control"
            placeholder="Enter your question here..."
          />
          <button className="ps-btn">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default QuestionsAnswers;
