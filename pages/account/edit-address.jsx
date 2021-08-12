import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import EditAddress from '~/components/partials/account/EditAddress';
import FooterFullwidth from '~/components/shared/footers/FooterFullwidth';

const EditAddressPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Edit address',
        },
    ];
    return (
        <>
            <PageContainer footer={<FooterFullwidth />} title="Edit Address">
                <div className="ps-page--my-account">
                    <BreadCrumb breacrumb={breadCrumb} />
                    <EditAddress />
                </div>
            </PageContainer>
        </>
    );
};

export default EditAddressPage;
