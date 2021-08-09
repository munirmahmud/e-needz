import Link from 'next/link';
import React from 'react';

const CategoriesBoxClothings = () => (
    <div className="ps-block--categories-box">
        <div className="ps-block__header">
            <h3>Clothing & Apparel</h3>
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
                    src="/static/img/categories/clothing/large.jpg"
                    alt="E-needz"
                />
            </div>
            <div className="ps-block__item">
                <a className="ps-block__overlay"></a>
                <img
                    src="/static/img/categories/clothing/1.jpg"
                    alt="E-needz"
                />
                <p>Womens</p>
                <span>2 Items</span>
            </div>
            <div className="ps-block__item">
                <a className="ps-block__overlay"></a>
                <img
                    src="/static/img/categories/clothing/2.jpg"
                    alt="E-needz"
                />
                <p>Mens</p>
                <span>2 Items</span>
            </div>
            <div className="ps-block__item">
                <a className="ps-block__overlay"></a>
                <img
                    src="/static/img/categories/clothing/3.jpg"
                    alt="E-needz"
                />
                <p>Shoes</p>
                <span>4 Items</span>
            </div>
            <div className="ps-block__item">
                <a className="ps-block__overlay"></a>
                <img
                    src="/static/img/categories/clothing/4.jpg"
                    alt="E-needz"
                />
                <p>Bags</p>
                <span>5 Items</span>
            </div>
            <div className="ps-block__item">
                <a className="ps-block__overlay"></a>
                <img
                    src="/static/img/categories/clothing/5.jpg"
                    alt="E-needz"
                />
                <p>Sunglasses</p>
                <span>10 Items</span>
            </div>
            <div className="ps-block__item">
                <a className="ps-block__overlay"></a>
                <img
                    src="/static/img/categories/clothing/6.jpg"
                    alt="E-needz"
                />
                <p>Accessories</p>
                <span>2 Items</span>
            </div>
            <div className="ps-block__item">
                <a className="ps-block__overlay"></a>
                <img
                    src="/static/img/categories/clothing/7.jpg"
                    alt="E-needz"
                />
                <p>Kid's Fashion</p>
                <span>3 Items</span>
            </div>
        </div>
    </div>
);

export default CategoriesBoxClothings;
