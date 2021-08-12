import Link from 'next/link';
import React from 'react';

const ShopBrands = ({ title }) => (
    <div className="section-white mt-4 mb-5">
        <div className="section__header">
            {title && (
                <div className="block__left">
                    <h3>{title}</h3>
                </div>
            )}

            <div className="search-products">
                <Link href="/shop">
                    <a className="ps-btn view-all">View all</a>
                </Link>
            </div>
        </div>

        <div className="shop-brand">
            <Link href="/shop">
                <a>
                    <img src="/static/brands/yamaha.png" alt="E-needz" />
                </a>
            </Link>
            <Link href="/shop">
                <a>
                    <img src="/static/brands/tvs.png" alt="E-needz" />
                </a>
            </Link>
            <Link href="/shop">
                <a>
                    <img src="/static/brands/bajaj.png" alt="E-needz" />
                </a>
            </Link>
            <Link href="/shop">
                <a>
                    <img src="/static/brands/hero.png" alt="E-needz" />
                </a>
            </Link>
            <Link href="/shop">
                <a>
                    <img src="/static/brands/giant.png" alt="E-needz" />
                </a>
            </Link>
            <Link href="/shop">
                <a>
                    <img src="/static/brands/runner.png" alt="E-needz" />
                </a>
            </Link>
        </div>
    </div>
);

export default ShopBrands;
