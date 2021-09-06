import Link from 'next/link';
import React from 'react';
import MegaMenu from '~/components/elements/menu/MegaMenu';
import MenuDropdown from '~/components/elements/menu/MenuDropdown';

const Menu = ({ source, className }) => {
    // useEffect(() => {
    //     fetch(`${process.env.NEXT_PUBLIC_API_URL}/retrieve_category_product`, {
    //         method: 'POST',
    //         body: JSON.stringify({ per_page: 1 }),
    //     })
    //         .then((res) => res.json())
    //         .then((data) => console.log('retrieve_category_product', data));
    // }, []);

    // Views
    let menuView;
    if (source) {
        menuView = source.map((item, index) => {
            if (item.sub_items) {
                return <MenuDropdown source={item} key={index} />;
            } else if (item.megaContent) {
                return <MegaMenu source={item} key={item.text} />;
            } else {
                return (
                    <li key={index}>
                        <Link href={`category/${item.category_id}`}>
                            <a>
                                {item.cat_image && (
                                    <img
                                        src={item.cat_image}
                                        alt={item.category_name}
                                        className="mr-3"
                                    />
                                )}
                                {item.category_name}
                            </a>
                        </Link>
                    </li>
                );
            }
        });
    } else {
        menuView = (
            <li>
                <a href="#" onClick={(e) => e.preventDefault()}>
                    No menu item.
                </a>
            </li>
        );
    }
    return <ul className={className}>{menuView}</ul>;
};

export default Menu;
