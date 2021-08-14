import Link from 'next/link';
import React, { useEffect } from 'react';
import Menu from '~/components/elements/menu/Menu';
import CurrencyDropdown from '~/components/shared/headers/modules/CurrencyDropdown';
import ElectronicHeaderActions from '~/components/shared/headers/modules/ElectronicHeaderActions';
import LanguageSwicher from '~/components/shared/headers/modules/LanguageSwicher';
import SearchHeader from '~/components/shared/headers/modules/SearchHeader';
import menuData from '~/public/static/data/menu';
import { stickyHeader } from '~/utilities/common-helpers';

const HeaderFurniture = () => {
    useEffect(() => {
        if (process.browser) {
            window.addEventListener('scroll', stickyHeader);
        }
    }, []);

    return (
        <header className="header header--furniture" id="headerSticky">
            <div className="header__top">
                <div className="container">
                    <div className="header__left">
                        <Link href="/">
                            <a className="ps-logo">
                                <img
                                    src="/static/icons/logo.svg"
                                    alt="E-needz"
                                />
                            </a>
                        </Link>
                        <div className="menu--product-categories">
                            <div className="menu__toggle">
                                <i className="icon-menu"></i>
                                <span> Shop by Department</span>
                            </div>
                            <div className="menu__content">
                                <Menu
                                    data={menuData.product_categories}
                                    className="menu--dropdown"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="header__center">
                        <SearchHeader />
                    </div>
                    <div className="header__right">
                        <ElectronicHeaderActions />
                    </div>
                </div>
            </div>
            <nav className="navigation">
                <div className="container">
                    <div className="navigation__left">
                        <Menu
                            source={menuData.menuPrimary.menu_1}
                            className="menu menu--furniture"
                        />
                    </div>
                    <div className="navigation__right">
                        <ul className="navigation__extra">
                            <li>
                                <Link href="/page/blank">
                                    <a>Sell on E-needz</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/page/blank">
                                    <a>Tract your order</a>
                                </Link>
                            </li>
                            <li>
                                <CurrencyDropdown />
                            </li>
                            <li>
                                <LanguageSwicher />
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default HeaderFurniture;
