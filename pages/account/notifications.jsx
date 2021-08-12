import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import Notifications from '~/components/partials/account/Notifications';
import Newletters from '~/components/partials/commons/Newletters';
import FooterFullwidth from '~/components/shared/footers/FooterFullwidth';

const AccountNotificationsPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Notifications',
        },
    ];
    return (
        <>
            <PageContainer footer={<FooterFullwidth />} title="Notifications">
                <div className="ps-page--my-account">
                    <BreadCrumb breacrumb={breadCrumb} />
                    <Notifications />
                </div>
                <Newletters layout="container" />
            </PageContainer>
        </>
    );
};

export default AccountNotificationsPage;
