import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import AccountMenuSidebar from "~/components/partials/account/modules/AccountMenuSidebar";

const Addresses = () => {
  const [addressLists, setAddressList] = useState(null);
  const [authCookie] = useCookies(["auth"]);

  useEffect(() => {
    getAddresses();
  }, []);
  async function getAddresses() {
    const formData = new FormData();

    formData.append("customer_id", authCookie.auth);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CUSTOMER_DASHBOARD}/customer_address`,
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();
    console.log("customer_address", result);

    if (result?.response_status === 200) {
      setAddressList(result.data.address_list);
    } else {
      toast.error(result.message);
    }
  }

  async function updateCustomerAddresses() {
    const formData = new FormData();

    formData.append("address_id", order_id);
    formData.append("customer_id", order_id);
    formData.append("customer_name", order_id);
    formData.append("customer_phone", order_id);
    formData.append("division", order_id);
    formData.append("city", order_id);
    formData.append("area", order_id);
    formData.append("address", order_id);
    formData.append("is_primary", order_id);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/update_address`,
      {
        method: "POST",
        body: formData,
      }
    );
    const apiData = await response.json();

    if (apiData?.response_status === 200) {
      setTrackInfo(apiData.data.track_details);
      setOrderInfo(apiData?.data?.order_no);
    }
  }

  const accountLinks = [
    {
      text: "Account Information",
      url: "/account/user-information",
      icon: "icon-user",
    },
    {
      text: "Invoices",
      url: "/account/invoices",
      icon: "icon-papers",
    },
    {
      text: "Track Order",
      url: "/account/order-tracking",
      icon: "icon-papers",
    },
    {
      text: "Payment History",
      url: "/account/payment-history",
      icon: "icon-papers",
    },
    {
      text: "Address",
      url: "/account/address",
      icon: "icon-heart",
      active: true,
    },
    {
      text: "Change Password",
      url: "/account/change-password",
      icon: "icon-heart",
    },
  ];

  return (
    <section className="ps-my-account ps-page--account">
      <div className="ps-container">
        <div className="row">
          <div className="col-lg-3">
            <div className="ps-page__left">
              <AccountMenuSidebar data={accountLinks} />
            </div>
          </div>

          <div className="col-lg-8">
            <div className="ps-section--account-setting">
              <div className="ps-section__content">
                {Array.isArray(addressLists) && addressLists.length > 0 ? (
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th scope="col">Full Name</th>
                        <th scope="col">Address</th>
                        <th scope="col">Area</th>
                        <th scope="col">Phone Number</th>
                        <th scope="col">Action</th>
                        <th scope="col">Primary</th>
                      </tr>
                    </thead>

                    <tbody>
                      {addressLists.map((address) => (
                        <tr key={address.address_id}>
                          <th scope="row">{address.customer_name}</th>
                          <th scope="row">{address.address}</th>
                          <th scope="row">
                            {address.area} {address.city} {address.division}
                          </th>
                          <th scope="row">{address.customer_phone}</th>
                          <th scope="row">Action</th>
                          <th scope="row">
                            {address.is_primary === "1"
                              ? "Primary"
                              : "Not Primary"}
                          </th>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  "Sorry no data found!"
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Addresses;
