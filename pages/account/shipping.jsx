import React from 'react';
import { connect } from 'react-redux';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import Shipping from '~/components/partials/account/Shipping';
import FooterFullwidth from '~/components/shared/footers/FooterFullwidth';

const ShippingPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Shopping Cart',
            url: '/account/shopping-cart',
        },
        {
            text: 'Checkout Information',
            url: '/account/checkout',
        },
        {
            text: 'Shipping',
        },
    ];

    return (
        <>
            <PageContainer footer={<FooterFullwidth />} title="Shipping">
                <div className="ps-page--simple">
                    <BreadCrumb breacrumb={breadCrumb} />
                    <Shipping />
                </div>
            </PageContainer>
        </>
    );
};

export default connect()(ShippingPage);
