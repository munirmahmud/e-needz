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

  return (
    <div className="ps-footer__widgets">
      <aside className="widget widget_footer widget_contact-us">
        <h4 className="widget-title">Contact us</h4>

        {companyInfo !== null && (
          <div className="widget_content">
            <h3>{companyInfo.mobile}</h3>
            <p className="mb-1">{companyInfo.company_name}</p>
            {companyInfo.address && (
              <>
                <p>
                  {companyInfo.address.split(", ")[0]},
                  {companyInfo.address.split(", ")[1]}, <br />
                  {companyInfo.address.split(", ")[2]},{" "}
                  {companyInfo.address.split(", ")[3]},
                  <br />
                </p>
                <p className="mb-1">{companyInfo.mobile}</p>
                <a href={`mailto:${companyInfo.email}`} className="text-white">
                  {companyInfo.email}
                </a>
              </>
            )}
          </div>
        )}
      </aside>
      <aside className="widget widget_footer">
        <h4 className="widget-title">Quick links</h4>
        <ul className="ps-list--link">
          <li>
            <Link href="/about-us">
              <a>About</a>
            </Link>
          </li>
          <li>
            <Link href="/delivery-info">
              <a>Delivery Info</a>
            </Link>
          </li>

          <li>
            <Link href="/privacy-policy">
              <a>Privacy Policy</a>
            </Link>
          </li>
          <li>
            <Link href="/terms-conditions">
              <a>Terms &amp; Condition</a>
            </Link>
          </li>
          <li>
            <Link href="/refund-policy">
              <a>Refund Policy</a>
            </Link>
          </li>
          <li>
            <Link href="/our-company">
              <a>Our Company</a>
            </Link>
          </li>
        </ul>
      </aside>

      <aside className="widget widget_footer">
        <h4 className="widget-title">My Account</h4>
        <ul className="ps-list--link">
          <li>
            <Link href="/account/register">
              <a>Register</a>
            </Link>
          </li>
          <li>
            <Link href="/account/login">
              <a>Login</a>
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
          <li>
            <Link href="/contact">
              <a>Contact Us</a>
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
