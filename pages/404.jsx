import Link from 'next/link';
import React from 'react';
import HeaderMarketPlace2 from '~/components/shared/headers/HeaderMarketPlace2';
import HeaderMobile from '~/components/shared/headers/HeaderMobile';
import FooterDefault from '../components/shared/footers/FooterDefault';

function Error({ statusCode }) {
    return (
        <div className="site-content">
            <HeaderMarketPlace2 />
            <HeaderMobile />
            <div className="ps-page--404">
                <div className="container">
                    <div className="ps-section__content">
                        <figure>
                            <img src="/static/img/404.jpg" alt="" />
                            <h3>Ohh! Page not found</h3>
                            <p>
                                It seems we can't find what you're looking for.{' '}
                                <br />
                                Go back to
                                <Link href="/">
                                    <a> Homepage</a>
                                </Link>
                            </p>
                        </figure>
                    </div>
                </div>
            </div>
            <FooterDefault />
        </div>
    );
}

export default Error;
