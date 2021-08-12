import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import Compare from '~/components/partials/account/Compare';
import FooterFullwidth from '~/components/shared/footers/FooterFullwidth';

const ComparePage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Compare',
        },
    ];
    return (
        <PageContainer footer={<FooterFullwidth />} title="Compare">
            <div className="ps-page--simple">
                <BreadCrumb breacrumb={breadCrumb} />
                <Compare />
            </div>
        </PageContainer>
    );
};

export default ComparePage;
