import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import Wishlist from '~/components/partials/account/Wishlist';
import FooterFullwidth from '~/components/shared/footers/FooterFullwidth';

const WishlistPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Wishlist',
        },
    ];

    return (
        <PageContainer footer={<FooterFullwidth />} title="Wishlist">
            <div className="ps-page--simple">
                <BreadCrumb breacrumb={breadCrumb} />
                <Wishlist />
            </div>
        </PageContainer>
    );
};

export default WishlistPage;
