import { useRouter } from "next/router";
import React from "react";
import BreadCrumb from "~/components/elements/BreadCrumb";
import PageContainer from "~/components/layouts/PageContainer";
import Addresses from "~/components/partials/account/Addresses";
import FooterDefault from "~/components/shared/footers/FooterDefault";

const MyAccountPage = ({ auth }) => {
  const Router = useRouter();

  const redirectUser = () => {
    Router.push("/account/login");
  };

  const breadCrumb = [
    {
      text: "Home",
      url: "/",
    },
    {
      text: "Addresses",
    },
  ];
  return (
    <>
      {auth ? (
        <PageContainer footer={<FooterDefault />} title="Address">
          <div className="ps-page--my-account">
            <BreadCrumb breacrumb={breadCrumb} />
            <Addresses />
          </div>
        </PageContainer>
      ) : (
        redirectUser()
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  const cookies = context.req.cookies["auth"];

  let authUser = false;
  if (cookies !== undefined) {
    const auth = JSON.parse(cookies);
    if (auth.id) {
      authUser = true;
    } else {
      authUser = false;
    }
  } else {
    authUser = false;
  }

  return {
    props: {
      auth: authUser,
    },
  };
}

export default MyAccountPage;
