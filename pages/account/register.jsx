import React from 'react';
import PageContainer from '~/components/layouts/PageContainer';
import Register from '~/components/partials/account/Register';
import FooterFullwidth from '~/components/shared/footers/FooterFullwidth';

const RegisterPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Register an account',
        },
    ];

    return (
        <>
            <PageContainer footer={<FooterFullwidth />} title="Register">
                <div className="ps-page--my-account">
                    {/* <BreadCrumb breacrumb={breadCrumb} /> */}
                    <Register />
                </div>
            </PageContainer>
        </>
    );
};

export default RegisterPage;
