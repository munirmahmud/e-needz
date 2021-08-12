import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import RecentViewedProducts from '~/components/partials/account/RecentViewedProducts';
import Newletters from '~/components/partials/commons/Newletters';
import FooterFullwidth from '~/components/shared/footers/FooterFullwidth';

const RecentViewedProductsPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Recent Viewed Products',
        },
    ];
    return (
        <>
            <PageContainer
                footer={<FooterFullwidth />}
                title="Recent Viewed Products">
                <div className="ps-page--my-account">
                    <BreadCrumb breacrumb={breadCrumb} />
                    <RecentViewedProducts />
                </div>
                <Newletters layout="container" />
            </PageContainer>
        </>
    );
};

export default RecentViewedProductsPage;
