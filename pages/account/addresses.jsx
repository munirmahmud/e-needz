import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import Addresses from '~/components/partials/account/Addresses';
import FooterDefault from '~/components/shared/footers/FooterDefault';

const MyAccountPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Addresses',
        },
    ];
    return (
        <PageContainer footer={<FooterDefault />} title="Address">
            <div className="ps-page--my-account">
                <BreadCrumb breacrumb={breadCrumb} />
                <Addresses />
            </div>
        </PageContainer>
    );
};

export default MyAccountPage;
