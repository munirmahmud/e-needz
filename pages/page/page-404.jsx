import Link from 'next/link';
import React from 'react';
import PageContainer from '~/components/layouts/PageContainer';
import FooterFullwidth from '~/components/shared/footers/FooterFullwidth';

const Page404 = () => {
    return (
        <PageContainer footer={<FooterFullwidth />} title="Page not found.">
            <div className="ps-page--404">
                <div className="container">
                    <div className="ps-section__content">
                        <figure>
                            <img src="/static/img/404.jpg" alt="" />
                            <h3>Ohh! Page not found</h3>
                            <p>
                                It seems we can't find what you're looking for.
                                Perhaps searching can help or go back to
                                <Link href="/">
                                    <a> Homepage</a>
                                </Link>
                            </p>
                        </figure>
                        <form
                            className="ps-form--widget-search"
                            action="do_action"
                            method="get">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Search..."
                            />
                            <button>
                                <i className="icon-magnifier"></i>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </PageContainer>
    );
};

export default Page404;
