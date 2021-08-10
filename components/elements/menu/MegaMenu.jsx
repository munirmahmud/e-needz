import Link from 'next/link';
import React from 'react';

const MegaMenu = ({ source }) => {
    let megaContentView;
    if (source) {
        megaContentView = (
            <ul className="mega-menu__list">
                {source.megaContent.map((item) => (
                    <li key={item.text}>
                        <Link href={item.url} as={item.url}>
                            <a>{item.text}</a>
                        </Link>
                    </li>
                ))}
            </ul>
        );
    }
    return (
        <li className="menu-item-has-children has-mega-menu">
            <Link href={source.url !== '' ? source.url : '/'}>
                <a>
                    {source.icon && <img src={source.icon} alt={source.text} />}
                    {source.text}
                </a>
            </Link>
            <div className="mega-menu">{megaContentView}</div>
        </li>
    );
};

export default MegaMenu;
