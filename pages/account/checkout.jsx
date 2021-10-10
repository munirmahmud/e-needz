import { useRouter } from "next/router";
import React from "react";
import PageContainer from "~/components/layouts/PageContainer";
import Checkout from "~/components/partials/account/Checkout";
import FooterFullwidth from "~/components/shared/footers/FooterFullwidth";

const CheckoutPage = ({ auth }) => {
  const Router = useRouter();

  const redirectUser = () => {
    Router.push("/account/login");
  };

  return (
    <>
      {auth ? (
        <PageContainer footer={<FooterFullwidth />} title="Checkout">
          <div className="ps-page--simple">
            <Checkout />
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

export default CheckoutPage;
