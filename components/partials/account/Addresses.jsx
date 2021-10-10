import { Switch } from "antd";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import AccountMenuSidebar from "~/components/partials/account/modules/AccountMenuSidebar";

const Addresses = () => {
  const [authCookie] = useCookies(["auth"]);
  const [addressLists, setAddressList] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [primaryAddress, setPrimaryAddress] = useState(true);
  const [isChecked, setChecked] = useState(false);
  const [isPrimary, setPrimary] = useState(true);

  const [divisions, setDivisions] = useState([]);
  const [cityNames, setCityNames] = useState([]);
  const [divisionID, setDivisionID] = useState("");

  const [oldDivision, setOldDivision] = useState(null);
  const [oldCityName, setOldCityName] = useState(null);

  const [isAddressUpdated, setIsAddressUpdated] = useState(false);
  const [isEditAddress, setEditAddress] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [addressID, setAddressID] = useState("");

  const [values, setValues] = useState({
    name: "",
    phoneNo: "",
    state: "",
    city: "",
    area: "",
    address: "",
  });

  useEffect(() => {
    getAddresses();
  }, []);

  async function getAddresses() {
    setIsAddressUpdated(true);
    const formData = new FormData();

    formData.append("customer_id", authCookie.auth?.id);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CUSTOMER_DASHBOARD}/customer_address`,
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();

    if (result?.response_status === 200) {
      setAddressList(result.data.address_list);
      setIsAddressUpdated(false);
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

  const onChange = async (checked, e, address) => {
    setIsAddressUpdated(true);

    const formData = new FormData();

    formData.append("address_id", address.address_id);
    formData.append("customer_id", authCookie.auth?.id);
    formData.append("customer_name", address.customer_name);
    formData.append("customer_phone", address.customer_phone);
    formData.append("division", address.division);
    formData.append("city", address.city);
    formData.append("area", address.area);
    formData.append("address", address.address);
    formData.append("is_primary", "1");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CUSTOMER_DASHBOARD}/update_address`,
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();

    if (result?.response_status === 200) {
      // setIsAddressUpdated(false);

      window.location.reload();
    } else {
      toast.error(result.message);
    }
  };

  const handleEditAddress = (e, address) => {
    e.preventDefault();
    setEditAddress(true);
    const customerID = authCookie.auth?.id;

    setAddressID(address.address_id);
    const getOldState = async () => {
      let formData = new FormData();

      formData.append("customer_id", customerID);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CUSTOMER_DASHBOARD}/statelist`,
        {
          method: "POST",
          body: formData,
        }
      );
      const result = await response.json();

      let state;
      if (result?.response_status === 200) {
        state = result?.data.find((item) => item.id === address.division);
        setOldDivision(state);
        console.log("state", state);

        let formData = new FormData();

        formData.append("customer_id", customerID);
        formData.append("state_id", state?.id);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_CUSTOMER_DASHBOARD}/citylist`,
          {
            method: "POST",
            body: formData,
          }
        );

        const cityList = await response.json();

        if (cityList?.response_status === 200) {
          const cityName = cityList?.data.find(
            (item) => item.id === address.city
          );
          console.log("cityName", cityName);
          setOldCityName(cityName);
        }
      }
    };
    getOldState();

    setValues({
      name: address.customer_name,
      phoneNo: address.customer_phone,
      city: address.city,
      state: oldDivision,
      area: address.area,
      address: address.address,
    });
  };

  const handleUpdateAddress = async (e) => {
    e.preventDefault();
    setLoading(true);

    const divisionID = values.division || oldDivision?.id;
    const cityID = values.city || oldCityName.id;

    console.log("divisionID", divisionID);
    console.log("cityID", cityID);

    var formdata = new FormData();

    formdata.append("address_id", addressID);
    formdata.append("customer_id", authCookie.auth?.id);
    formdata.append("customer_name", values.recipientName);
    formdata.append("customer_phone", values.phoneNo);
    formdata.append("division", divisionID); //Sate ID
    formdata.append("city", cityID); //City ID
    formdata.append("area", values.area);
    formdata.append("address", values.address);

    try {
      var requestOptions = {
        method: "POST",
        body: formdata,
      };

      fetch(
        `${process.env.NEXT_PUBLIC_CUSTOMER_DASHBOARD}/update_address`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          if (result.response_status === 0) {
            toast.error(result.message);
          }

          if (result.response_status === 200) {
            toast.success("You could successfully added a new address");
            setLoading(false);
            setEditAddress(false);

            setValues({
              name: "",
              phoneNo: "",
              state: "",
              city: "",
              area: "",
              address: "",
            });
          }
        });
    } catch (error) {
      console.log("Create new address error", error);
    }
  };

  const handleDivision = async (e) => {
    let formData = new FormData();

    formData.append("customer_id", authCookie.auth?.id);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CUSTOMER_DASHBOARD}/statelist`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();

    if (data?.response_status === 200) {
      setDivisions(data?.data);
    }
  };

  const getDivision = (e) => {
    setDivisionID(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleCity = async (e) => {
    let formData = new FormData();

    formData.append("customer_id", authCookie.auth?.id);
    formData.append("state_id", divisionID);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CUSTOMER_DASHBOARD}/citylist`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (data?.response_status === 200) {
      const selectCity = {
        id: "00",
        name: "Select City",
      };
      setCityNames((prevCity) => [selectCity, ...data?.data]);
    }
  };

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
      icon: "icon-cog",
    },
    {
      text: "Address",
      url: "/account/address",
      icon: "icon-map-marker",
      active: true,
    },
    {
      text: "Change Password",
      url: "/account/change-password",
      icon: "icon-lock",
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

          <div className="col-lg-9">
            <div className="ps-section--account-setting">
              <div className="ps-section__content">
                {!isEditAddress ? (
                  <>
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
                              <th
                                scope="row"
                                className="d-flex align-items-center justify-content-center"
                              >
                                <a
                                  href="#"
                                  className="mr-3"
                                  onClick={(e) => handleEditAddress(e, address)}
                                >
                                  <i className="icon-pencil"></i>
                                </a>
                                {/* <a href="#">
                                  <i className="icon-trash"></i>
                                </a> */}
                              </th>

                              <th scope="row">
                                {address.is_primary === "1" ? (
                                  <Switch
                                    defaultChecked={isPrimary}
                                    onChange={(checked, e) =>
                                      onChange(checked, e, address)
                                    }
                                    disabled={disabled}
                                  />
                                ) : (
                                  <Switch
                                    onChange={(checked, e) =>
                                      onChange(checked, e, address)
                                    }
                                    defaultChecked={isChecked}
                                    disabled={!isPrimary}
                                  />
                                )}
                              </th>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      "Sorry no data found!"
                    )}
                  </>
                ) : (
                  <form onSubmit={handleUpdateAddress} autoComplete="off">
                    <div className="form-group d-flex">
                      <input
                        type="text"
                        name="name"
                        className="form-control mr-2"
                        placeholder="Name"
                        value={values.name}
                        onChange={handleChange}
                      />
                      <input
                        type="text"
                        name="phoneNo"
                        className="form-control"
                        placeholder="Phone No"
                        value={values.phoneNo}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="area-group form-group d-flex">
                      <select
                        className="form-control mr-2"
                        aria-label="Select Division"
                        name="division"
                        onClick={handleDivision}
                        onChange={getDivision}
                      >
                        {divisions?.length === 0 && (
                          <option value={oldDivision?.id}>
                            {oldDivision?.name}
                          </option>
                        )}
                        {divisions?.length > 0 &&
                          divisions.map((division) => (
                            <option key={division.id} value={division.id}>
                              {division.name}
                            </option>
                          ))}
                      </select>
                      <select
                        className="form-control mr-2"
                        aria-label="Select City"
                        name="city"
                        style={{ flex: 1 }}
                        onClick={handleCity}
                        onChange={handleChange}
                      >
                        {cityNames.length === 0 && (
                          <option value={oldCityName?.id}>
                            {oldCityName?.name}
                          </option>
                        )}
                        {cityNames.length > 0 &&
                          cityNames.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                      </select>
                      <input
                        type="text"
                        name="area"
                        className="form-control"
                        placeholder="Area"
                        value={values.area}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name="address"
                        className="form-control"
                        placeholder="Enter Your Address"
                        value={values.address}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <button
                        type="button"
                        className="ps-btn ps-btn--sm mr-4"
                        onClick={() => setEditAddress(false)}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="ps-btn ps-btn--sm">
                        Update
                      </button>
                    </div>

                    <div className="spinner-wrapper">
                      {/* <Spin indicator={antIcon} /> */}
                    </div>
                  </form>
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
