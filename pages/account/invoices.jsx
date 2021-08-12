import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import Invoices from '~/components/partials/account/Invoices';
import FooterFullwidth from '~/components/shared/footers/FooterFullwidth';

const InvoicePage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Invoices',
        },
    ];
    return (
        <>
            <PageContainer footer={<FooterFullwidth />} title="Invoices">
                <div className="ps-page--my-account">
                    <BreadCrumb breacrumb={breadCrumb} />
                    <Invoices />
                </div>
            </PageContainer>
        </>
    );
};

export default InvoicePage;
