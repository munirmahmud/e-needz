import React from 'react';
import { connect } from 'react-redux';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import Payment from '~/components/partials/account/Payment';
import FooterFullwidth from '~/components/shared/footers/FooterFullwidth';

const PaymentPage = () => {
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
            text: 'Payment',
        },
    ];

    return (
        <>
            <PageContainer footer={<FooterFullwidth />} title="Payment">
                <div className="ps-page--simple">
                    <BreadCrumb breacrumb={breadCrumb} />
                    <Payment />
                </div>
            </PageContainer>
        </>
    );
};

export default connect()(PaymentPage);
