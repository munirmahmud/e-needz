import Link from 'next/link';
import React from 'react';

const HomeDefaultTopCategories = ({ title }) => (
    <div className="ps-top-categories">
        <div className="ps-container">
            <div className="section-white">
                <div className="section__header">
                    {title && (
                        <div className="ps-block--countdown-deal">
                            <div className="ps-block__left">
                                <h3>{title}</h3>
                            </div>
                        </div>
                    )}

                    <div className="search-products">
                        <div className="ps-form__input">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search..."
                            />
                        </div>
                        <button className="ps-btn">
                            <img
                                src="/static/icons/magnifiying-glass.svg"
                                alt="Search Products"
                            />
                        </button>
                        <Link href="/shop">
                            <a className="ps-btn view-all">View all</a>
                        </Link>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                        <div className="ps-block--category">
                            <Link href="/shop">
                                <a className="ps-block__overlay"></a>
                            </Link>
                            <img
                                src="/static/img/categories/1.jpg"
                                alt="E-needz"
                            />
                            <p>Electronics</p>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                        <div className="ps-block--category">
                            <Link href="/shop">
                                <a className="ps-block__overlay"></a>
                            </Link>
                            <img
                                src="/static/img/categories/2.jpg"
                                alt="E-needz"
                            />
                            <p>Clothings</p>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                        <div className="ps-block--category">
                            <Link href="/shop">
                                <a className="ps-block__overlay"></a>
                            </Link>
                            <img
                                src="/static/img/categories/3.jpg"
                                alt="E-needz"
                            />
                            <p>Computers</p>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                        <div className="ps-block--category">
                            <Link href="/shop">
                                <a className="ps-block__overlay"></a>
                            </Link>
                            <img
                                src="/static/img/categories/4.jpg"
                                alt="E-needz"
                            />
                            <p>Home & Kitchen</p>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                        <div className="ps-block--category">
                            <Link href="/shop">
                                <a className="ps-block__overlay"></a>
                            </Link>
                            <img
                                src="/static/img/categories/5.jpg"
                                alt="E-needz"
                            />
                            <p>Health & Beauty</p>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                        <div className="ps-block--category">
                            <Link href="/shop">
                                <a className="ps-block__overlay"></a>
                            </Link>
                            <img
                                src="/static/img/categories/6.jpg"
                                alt="E-needz"
                            />
                            <p>Health & Beauty</p>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                        <div className="ps-block--category">
                            <Link href="/shop">
                                <a className="ps-block__overlay"></a>
                            </Link>
                            <img
                                src="/static/img/categories/7.jpg"
                                alt="E-needz"
                            />
                            <p>Jewelry & Watch</p>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                        <div className="ps-block--category">
                            <Link href="/shop">
                                <a className="ps-block__overlay"></a>
                            </Link>
                            <img
                                src="/static/img/categories/8.jpg"
                                alt="E-needz"
                            />
                            <p>Technology Toys</p>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                        <div className="ps-block--category">
                            <Link href="/shop">
                                <a className="ps-block__overlay"></a>
                            </Link>
                            <img
                                src="/static/img/categories/8.jpg"
                                alt="E-needz"
                            />
                            <p>Technology Toys</p>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                        <div className="ps-block--category">
                            <Link href="/shop">
                                <a className="ps-block__overlay"></a>
                            </Link>
                            <img
                                src="/static/img/categories/8.jpg"
                                alt="E-needz"
                            />
                            <p>Technology Toys</p>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                        <div className="ps-block--category">
                            <Link href="/shop">
                                <a className="ps-block__overlay"></a>
                            </Link>
                            <img
                                src="/static/img/categories/8.jpg"
                                alt="E-needz"
                            />
                            <p>Technology Toys</p>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                        <div className="ps-block--category">
                            <Link href="/shop">
                                <a className="ps-block__overlay"></a>
                            </Link>
                            <img
                                src="/static/img/categories/8.jpg"
                                alt="E-needz"
                            />
                            <p>Technology Toys</p>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                        <div className="ps-block--category">
                            <Link href="/shop">
                                <a className="ps-block__overlay"></a>
                            </Link>
                            <img
                                src="/static/img/categories/8.jpg"
                                alt="E-needz"
                            />
                            <p>Technology Toys</p>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                        <div className="ps-block--category">
                            <Link href="/shop">
                                <a className="ps-block__overlay"></a>
                            </Link>
                            <img
                                src="/static/img/categories/8.jpg"
                                alt="E-needz"
                            />
                            <p>Technology Toys</p>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                        <div className="ps-block--category">
                            <Link href="/shop">
                                <a className="ps-block__overlay"></a>
                            </Link>
                            <img
                                src="/static/img/categories/8.jpg"
                                alt="E-needz"
                            />
                            <p>Technology Toys</p>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                        <div className="ps-block--category">
                            <Link href="/shop">
                                <a className="ps-block__overlay"></a>
                            </Link>
                            <img
                                src="/static/img/categories/8.jpg"
                                alt="E-needz"
                            />
                            <p>Technology Toys</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default HomeDefaultTopCategories;
