import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import MyAccount from '~/components/partials/account/MyAccount';
import Newletters from '~/components/partials/commons/Newletters';
import FooterFullwidth from '~/components/shared/footers/FooterFullwidth';

const MyAccountPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'My Account',
        },
    ];
    return (
        <>
            <PageContainer footer={<FooterFullwidth />} title="My Account">
                <div className="ps-page--my-account">
                    <BreadCrumb breacrumb={breadCrumb} />
                    <MyAccount />
                </div>
                <Newletters layout="container" />
            </PageContainer>
        </>
    );
};

export default MyAccountPage;
