import Link from "next/link";
import React, { useEffect, useState } from "react";

const FooterWidgets = () => {
  const [socialMedia, setSocialMedia] = useState(null);
  const [companyInfo, setCompanyInfo] = useState(null);

  useEffect(() => {
    getSocialMedias();
    getCompanyInfo();
  }, []);

  async function getSocialMedias() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/social_medias`,
      {
        method: "POST",
        body: JSON.stringify({}),
      }
    );
    const result = await response.json();

    if (result?.response_status === 200) {
      setSocialMedia(result.data);
    } else {
      console.log("social_medias error", result);
    }
  }

  async function getCompanyInfo() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/company_information`,
      {
        method: "POST",
        body: JSON.stringify({}),
      }
    );
    const result = await response.json();

    if (result?.response_status === 200) {
      setCompanyInfo(result.data);
    } else {
      console.log("social_medias error", result);
    }
  }

  console.log("socialMedia", socialMedia);
  console.log("companyInfo", companyInfo);

  return (
    <div className="ps-footer__widgets">
      <aside className="widget widget_footer widget_contact-us">
        <h4 className="widget-title">Contact us</h4>
        <div className="widget_content">
          <h3>1800 97 97 69 hello</h3>

          <p>
            Plot A-27, Road-1, Niketon
            <br />
            Gulshan-1 Dhaka-1212
            <br />
            01311945476
            <br />
            <a href="mailto:support@e-needz.com">support@e-needz.com</a>
          </p>
        </div>
      </aside>
      <aside className="widget widget_footer">
        <h4 className="widget-title">Quick links</h4>
        <ul className="ps-list--link">
          <li>
            <Link href="/policy">
              <a>Policy</a>
            </Link>
          </li>

          <li>
            <Link href="/terms-conditions">
              <a>Term & Condition</a>
            </Link>
          </li>
          <li>
            <Link href="/shipping">
              <a>Shipping</a>
            </Link>
          </li>
          <li>
            <Link href="/return">
              <a>Return</a>
            </Link>
          </li>
          <li>
            <Link href="/faqs">
              <a>FAQs</a>
            </Link>
          </li>
        </ul>
      </aside>
      <aside className="widget widget_footer">
        <h4 className="widget-title">My Account</h4>
        <ul className="ps-list--link">
          <li>
            <Link href="/account/login">
              <a>Login</a>
            </Link>
          </li>
          <li>
            <Link href="/page/history">
              <a>Order History</a>
            </Link>
          </li>
          <li>
            <Link href="/account/wishlist">
              <a>My Wishlist</a>
            </Link>
          </li>
          <li>
            <Link href="/account/order-tracking">
              <a>Track Order</a>
            </Link>
          </li>
        </ul>
      </aside>
      <aside className="widget widget_footer">
        <h4 className="widget-title">Download</h4>
        <ul className="ps-list--link">
          <li>
            <Link href="/page/about-us">
              <a>Our Press</a>
            </Link>
          </li>
        </ul>
      </aside>
      <aside className="widget widget_footer widget_newletters">
        {/* <h4 className="widget-title">Newsletter</h4> */}

        {/* <form className="ps-form--newletter" action="#" method="get"> */}
        {/* <div className="form-group--nest mb-5">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Email Address"
                    />
                    <button className="ps-btn form-btn">Subscribe</button>
                </div> */}

        <h4 className="widget-title mb-4">Social Share</h4>
        {Array.isArray(socialMedia) && socialMedia.length > 0 ? (
          <ul className="ps-list--social">
            {socialMedia
              .filter((social) => social.status === "1")
              .map((social) => (
                <li key={social.id}>
                  <Link href={social.link}>
                    <a className={social.title} target="_blank">
                      <i className={`fa fa-${social.title}`}></i>
                    </a>
                  </Link>
                </li>
              ))}
          </ul>
        ) : (
          <p>Sorry no socials found!</p>
        )}
        {/* </form> */}
      </aside>
    </div>
  );
};

export default FooterWidgets;
