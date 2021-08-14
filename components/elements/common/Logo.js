import Link from 'next/link';
import React from 'react';

const Logo = ({ type }) => {
    let data;
    if (type === 'autopart') {
        data = {
            url: '/home/autopart',
            img: 'icons/logo.svg',
        };
    } else {
        data = {
            url: '/',
            img: '/static/icons/logo.svg',
        };
    }
    return (
        <Link href={data.url}>
            <a className="ps-logo">
                <img src={data.img} alt="" />
            </a>
        </Link>
    );
};

export default Logo;
