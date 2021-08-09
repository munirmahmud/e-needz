import Link from 'next/link';
import React from 'react';

const CategoriesBoxConsumerElectronics = () => (
    <div className="ps-block--categories-box">
        <div className="ps-block__header">
            <h3>Consumer Electronics</h3>
            <ul>
                <li>
                    <Link href="/shop">
                        <a>New Arrivals</a>
                    </Link>
                </li>
                <li>
                    <Link href="/shop">
                        <a>Best Seller</a>
                    </Link>
                </li>
            </ul>
        </div>
        <div className="ps-block__content">
            <div className="ps-block__banner">
                <img
                    src="/static/img/categories/electronic/large.jpg"
                    alt="E-needz"
                />
            </div>
            <div className="ps-block__item">
                <a className="ps-block__overlay"></a>
                <img
                    src="/static/img/categories/electronic/1.jpg"
                    alt="E-needz"
                />
                <p>Audios &amp; Theaters </p>
                <span>2 Items</span>
            </div>
            <div className="ps-block__item">
                <a className="ps-block__overlay"></a>
                <img
                    src="/static/img/categories/electronic/2.jpg"
                    alt="E-needz"
                />
                <p>TV Televisions</p>
                <span>2 Items</span>
            </div>
            <div className="ps-block__item">
                <a className="ps-block__overlay"></a>
                <img
                    src="/static/img/categories/electronic/3.jpg"
                    alt="E-needz"
                />
                <p>Washing Machines</p>
                <span>4 Items</span>
            </div>
            <div className="ps-block__item">
                <a className="ps-block__overlay"></a>
                <img
                    src="/static/img/categories/electronic/4.jpg"
                    alt="E-needz"
                />
                <p>Air Conditioners</p>
                <span>5 Items</span>
            </div>
            <div className="ps-block__item">
                <a className="ps-block__overlay"></a>
                <img
                    src="/static/img/categories/electronic/5.jpg"
                    alt="E-needz"
                />
                <p>Refrigerators</p>
                <span>10 Items</span>
            </div>
            <div className="ps-block__item">
                <a className="ps-block__overlay"></a>
                <img
                    src="/static/img/categories/electronic/6.jpg"
                    alt="E-needz"
                />
                <p>Office Electronics</p>
                <span>2 Items</span>
            </div>
            <div className="ps-block__item">
                <a className="ps-block__overlay"></a>
                <img
                    src="/static/img/categories/electronic/7.jpg"
                    alt="E-needz"
                />
                <p>Car Electronics</p>
                <span>3 Items</span>
            </div>
        </div>
    </div>
);

export default CategoriesBoxConsumerElectronics;
