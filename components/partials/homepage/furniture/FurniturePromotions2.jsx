import Link from 'next/link';
import React from 'react';

const FurniturePromotions2 = () => (
    <div className="ps-home-promotions ps-home-promotions-2">
        <div className="container">
            <Link href="/shop">
                <a className="ps-collection">
                    <img
                        src="/static/img/promotions/home-8/1.jpg"
                        alt="E-needz"
                    />
                </a>
            </Link>
        </div>
    </div>
);

export default FurniturePromotions2;
