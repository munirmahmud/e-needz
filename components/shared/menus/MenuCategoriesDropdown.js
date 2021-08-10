import React from 'react';
import Menu from '~/components/elements/menu/Menu';
import menuData from '~/public/static/data/menu.json';

const MenuCategoriesDropdown = () => {
    return (
        <div className="menu--product-categories">
            <div className="menu__toggle">
                <i className="icon-menu"></i>
                <span>Categories</span>
            </div>
            <div className="menu__content">
                <Menu
                    source={menuData.product_categories}
                    className="menu--dropdown"
                />
            </div>
        </div>
    );
};

export default MenuCategoriesDropdown;
