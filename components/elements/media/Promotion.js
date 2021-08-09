import Link from 'next/link';
import React from 'react';
import { baseUrl } from '~/repositories/Repository';

const Promotion = ({ link, image }) => {
    if (image) {
        return (
            <Link href={link}>
                <a className="ps-collection">
                    <img src={`${baseUrl}${image.url}`} alt="E-needz" />
                </a>
            </Link>
        );
    } else {
        return (
            <Link href={link ? link : '/shop'}>
                <a className="ps-collection">
                    <img src="/static/img/not-found.jpg" alt="E-needz" />
                </a>
            </Link>
        );
    }
};

export default Promotion;
