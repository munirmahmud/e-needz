import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import OrderTracking from '~/components/partials/account/OrderTracking';
import FooterFullwidth from '~/components/shared/footers/FooterFullwidth';

const OrderTrackingPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Order Tracking',
        },
    ];
    return (
        <>
            <PageContainer footer={<FooterFullwidth />} title="Order Tracking">
                <div className="ps-page--simple">
                    <BreadCrumb breacrumb={breadCrumb} />
                    <OrderTracking />
                </div>
            </PageContainer>
        </>
    );
};

export default OrderTrackingPage;
