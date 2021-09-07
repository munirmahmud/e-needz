import React, { useEffect, useState } from 'react';
import Menu from '~/components/elements/menu/Menu';
import menuData from '~/public/static/data/menu.json';

const MenuCategoriesDropdown = () => {
    const [mData, setMdata] = useState([]);

    useEffect(() => {
        fetch('http://178.128.30.38/api/react/website_api/category_list', {
            method: 'post',
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.response_status === 200) {
                    setMdata(res.data);
                }
            });
    }, []);

    return (
        <div className="menu--product-categories">
            <div className="menu__toggle">
                <i className="icon-menu"></i>
                <span>Categories</span>
            </div>
            <div className="menu__content">
                <Menu
                    source={menuData.product_categories}
                    menuData={mData}
                    className="menu--dropdown"
                />
            </div>
        </div>
    );
};

export default MenuCategoriesDropdown;
