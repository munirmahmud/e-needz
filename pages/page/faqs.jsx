import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import FaqsContent from '~/components/partials/page/FaqsContent';
import FooterFullwidth from '~/components/shared/footers/FooterFullwidth';

const FaqsPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Frequently Asked Questions',
        },
    ];

    return (
        <PageContainer footer={<FooterFullwidth />} title="FAQ page">
            <div className="ps-page--single">
                <BreadCrumb breacrumb={breadCrumb} />
                <div className="container">
                    <FaqsContent />
                </div>
            </div>
        </PageContainer>
    );
};

export default FaqsPage;
