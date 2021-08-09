import Link from 'next/link';
import React, { useEffect } from 'react';
import Menu from '~/components/elements/menu/Menu';
import ElectronicHeaderActions from '~/components/shared/headers/modules/ElectronicHeaderActions';
import SearchHeader from '~/components/shared/headers/modules/SearchHeader';
import { stickyHeader } from '~/utilities/common-helpers';

const HeaderMarketPlace2 = () => {
    useEffect(() => {
        if (process.browser) {
            window.addEventListener('scroll', stickyHeader);
        }
    }, []);

    const menuMarket2 = [
        {
            text: 'Bikes',
            url: '/bikes',
            icon: '/static/icons/motorcycle.svg',
        },
        {
            text: 'Mobile Phone',
            url: '/mobiles',
            icon: '/static/icons/smartphone.svg',
        },
        {
            text: 'Television',
            url: '/television',
            icon: '/static/icons/television.svg',
        },
        {
            text: 'Gadget',
            url: '/gadget',
            icon: '/static/icons/webcam.svg',
        },
    ];

    return (
        <header
            className="header header--standard header--market-place-2"
            id="headerSticky">
            <div className="header__top">
                <div className="container">
                    <div className="header__left">
                        <ul className="header__top-links">
                            <li>
                                <Link href="tel:09638111666">
                                    <>
                                        <img
                                            src="/static/icons/call.svg"
                                            alt="Call now"
                                        />
                                        <a>09638111666</a>
                                    </>
                                </Link>
                            </li>
                            <li>
                                <Link href="mailto:support@eneeds.com">
                                    <>
                                        <img
                                            src="/static/icons/envelope.svg"
                                            alt="Support mail"
                                        />
                                        <a>support@eneeds.com</a>
                                    </>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="header__content">
                <div className="container">
                    <div className="header__content-left">
                        <Link href="/">
                            <a className="ps-logo">
                                <img
                                    src="/static/icons/logo.svg"
                                    alt="E-needz"
                                />
                            </a>
                        </Link>
                    </div>
                    <div className="header__content-center">
                        <SearchHeader />
                    </div>
                    <div className="header__content-right">
                        <ElectronicHeaderActions />
                    </div>
                </div>
            </div>
            <nav className="navigation">
                <div className="container">
                    <Menu
                        source={menuMarket2}
                        className="menu menu--market-2"
                    />
                </div>
            </nav>
        </header>
    );
};

export default HeaderMarketPlace2;
