import Link from 'next/link';
import React from 'react';
import { baseUrl } from '~/repositories/Repository';

const BannerItem = ({ source }) => {
    if (source) {
        return (
            <Link href="/shop">
                <a>
                    <img src={`${baseUrl}${source.image.url}`} alt="E-needz" />
                </a>
            </Link>
        );
    } else {
        return (
            <Link href="/shop">
                <a>
                    <a className="ps-collection">
                        <img src="/static/img/not-found.jpg" alt="E-needz" />
                    </a>
                </a>
            </Link>
        );
    }
};

export default BannerItem;
