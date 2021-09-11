import Link from 'next/link';
import React from 'react';

const FooterWidgets = () => (
    <div className="ps-footer__widgets">
        <aside className="widget widget_footer widget_contact-us">
            <h4 className="widget-title">Contact us</h4>
            <div className="widget_content">
                <h3>1800 97 97 69</h3>

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
            <ul className="ps-list--social">
                <li>
                    <a className="facebook" href="#">
                        <i className="fa fa-facebook"></i>
                    </a>
                </li>
                <li>
                    <a className="twitter" href="#">
                        <i className="fa fa-twitter"></i>
                    </a>
                </li>
                <li>
                    <a className="google-plus" href="#">
                        <i className="fa fa-google-plus"></i>
                    </a>
                </li>
                <li>
                    <a className="instagram" href="#">
                        <i className="fa fa-instagram"></i>
                    </a>
                </li>
            </ul>
            {/* </form> */}
        </aside>
    </div>
);

export default FooterWidgets;
