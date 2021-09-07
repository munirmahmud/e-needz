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
                                src="/static/products/Suzuki-Gixxer-PNG-Bike-PNG-Image.png"
                                alt="E-needz"
                            />
                            <p>Suzuki Gixxer Bike</p>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                        <div className="ps-block--category">
                            <Link href="/shop">
                                <a className="ps-block__overlay"></a>
                            </Link>
                            <img
                                src="/static/products/blender.png"
                                alt="E-needz"
                            />
                            <p>Blender</p>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                        <div className="ps-block--category">
                            <Link href="/shop">
                                <a className="ps-block__overlay"></a>
                            </Link>
                            <img
                                src="/static/products/chair.png"
                                alt="E-needz"
                            />
                            <p>New Chair</p>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                        <div className="ps-block--category">
                            <Link href="/shop">
                                <a className="ps-block__overlay"></a>
                            </Link>
                            <img
                                src="/static/products/man-clock.png"
                                alt="E-needz"
                            />
                            <p>Man Colck</p>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                        <div className="ps-block--category">
                            <Link href="/shop">
                                <a className="ps-block__overlay"></a>
                            </Link>
                            <img
                                src="/static/products/gadget-item.png"
                                alt="E-needz"
                            />
                            <p>Gadget Item</p>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                        <div className="ps-block--category">
                            <Link href="/shop">
                                <a className="ps-block__overlay"></a>
                            </Link>
                            <img
                                src="/static/products/gaming-instrument.png"
                                alt="E-needz"
                            />
                            <p>Gaming World</p>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                        <div className="ps-block--category">
                            <Link href="/shop">
                                <a className="ps-block__overlay"></a>
                            </Link>
                            <img
                                src="/static/products/ultra-television.png"
                                alt="E-needz"
                            />
                            <p>Ultra Television</p>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                        <div className="ps-block--category">
                            <Link href="/shop">
                                <a className="ps-block__overlay"></a>
                            </Link>
                            <img
                                src="/static/products/Image 1.png"
                                alt="E-needz"
                            />
                            <p>Wall Mats</p>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                        <div className="ps-block--category">
                            <Link href="/shop">
                                <a className="ps-block__overlay"></a>
                            </Link>
                            <img
                                src="/static/products/Health & Beauty.png"
                                alt="E-needz"
                            />
                            <p>Health & Beauty</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default HomeDefaultTopCategories;
