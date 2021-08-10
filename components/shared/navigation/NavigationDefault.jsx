import { notification } from 'antd';
import Link from 'next/link';
import React, { Component } from 'react';
import MenuCategoriesDropdown from '~/components/shared/menus/MenuCategoriesDropdown';
import Menu from '../../elements/menu/Menu';
import LanguageSwicher from '../headers/modules/LanguageSwicher';

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

class NavigationDefault extends Component {
    constructor(props) {
        super(props);
    }

    handleFeatureWillUpdate(e) {
        e.preventDefault();
        notification.open({
            message: 'Opp! Something went wrong.',
            description: 'This feature has been updated later!',
            duration: 500,
        });
    }

    render() {
        return (
            <nav className="navigation">
                <div className="ps-container nav-container">
                    <div className="navigation__left">
                        <MenuCategoriesDropdown />
                    </div>
                    <div className="navigation__right">
                        <Menu source={menuMarket2} className="menu" />
                        <ul className="navigation__extra">
                            <li className="navigation-text">
                                <Link href="/account/order-tracking">
                                    <a>Tract your order</a>
                                </Link>
                            </li>
                            <li>
                                <LanguageSwicher />
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default NavigationDefault;
