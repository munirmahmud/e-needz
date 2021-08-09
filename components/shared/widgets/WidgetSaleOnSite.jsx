import Link from 'next/link';
import React from 'react';

const WidgetSaleOnSite = () => {
    return (
        <aside className="widget widget_sell-on-site">
            <p>
                <i className="icon-store"></i> Sell on E-needz?
                <Link href="/account/register">
                    <a> Register Now !</a>
                </Link>
            </p>
        </aside>
    );
};

export default WidgetSaleOnSite;
