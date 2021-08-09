import Link from 'next/link';
import React from 'react';

const WidgetShopAds = () => {
    return (
        <aside className="widget widget_ads">
            <Link href="/shop">
                <a>
                    <img src="/static/img/ads/product-ads.png" alt="E-needz" />
                </a>
            </Link>
        </aside>
    );
};

export default WidgetShopAds;
