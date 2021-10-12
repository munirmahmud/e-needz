import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

const FormChangeUserInformation = () => {
  const [authCookie, setAuthCookie] = useCookies(["auth"]);

  const [fisrtName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [shortAdress, setShortAdress] = useState("");
  const [addr01, setAddr01] = useState("");
  const [addr02, setAddr02] = useState("");
  const [statex, setStatex] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [company, setCompany] = useState("");
  const [image, setImage] = useState("");
  const [oldImage, setOldImage] = useState("");

  useEffect(() => {
    var formdata = new FormData();

    formdata.append("customer_id", authCookie.auth?.id);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(
      `${process.env.NEXT_PUBLIC_CUSTOMER_DASHBOARD}/customer_profile`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.response_status === 200) {
          setFirstName(result.data.first_name);
          setLastName(result.data.last_name);
          setEmail(result.data.customer_email);
          setShortAdress(result.data.customer_short_address);
          setAddr01(result.data.customer_address_1);
          setAddr02(result.data.customer_address_2);
          setStatex(result.data.state);
          setCity(result.data.city);
          setZip(result.data.zip);
          setCountry(result.data.country);
          setCompany(result.data.company);
          setPhone(result.data.customer_mobile);
          setOldImage(result.data.image);
        }
      })
      .catch((error) => console.log("error", error));
  }, []);

  const handleProfileUpdate = (e) => {
    e.preventDefault();

    var formdata = new FormData();
    formdata.append("customer_id", authCookie.auth?.id);
    formdata.append("first_name", fisrtName);
    formdata.append("last_name", lastName);
    formdata.append("customer_email", email);
    formdata.append("customer_mobile", phone);
    formdata.append("customer_short_address", shortAdress);
    formdata.append("state", statex);
    formdata.append("city", city);
    formdata.append("zip", zip);
    formdata.append("country", country);
    formdata.append("company", company);

    if (image) {
      formdata.append("image", image);
    } else {
      formdata.append("old_image", oldImage);
    }

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(
      `${process.env.NEXT_PUBLIC_CUSTOMER_DASHBOARD}/profile_update`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.response_status === 200) {
          toast.success("Your Profile was updated successfully");
          const profileInfo = {
            id: authCookie.auth?.id,
            email,
            mobile: phone,
            name: `${fisrtName} ${lastName}`,
            image: URL.createObjectURL(image),
          };
          setAuthCookie("auth", profileInfo, { path: "/" });
        } else if (result.response_status === 0) {
          toast.error(result.message);
        } else {
          console.log("profile update error", result);
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <form className="ps-form--account-setting" onSubmit={handleProfileUpdate}>
      <div className="ps-form__header">
        <h3>Account Information</h3>
      </div>
      <div className="ps-form__content">
        <div className="row">
          <div className="col-sm-6">
            <div className="form-group">
              <label htmlFor="first_name">First Name</label>
              <input
                id="first_name"
                className="form-control"
                type="text"
                placeholder="First Name"
                value={fisrtName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <label htmlFor="last_name">Last Name</label>
              <input
                id="last_name"
                className="form-control"
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <label htmlFor="mobile">Mobile</label>
              <input
                id="mobile"
                className="form-control"
                type="number"
                placeholder="Mobile"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                className="form-control"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="col-sm-6">
            <div className="form-group">
              <label htmlFor="short_address">Short Address</label>
              <input
                id="short_address"
                className="form-control"
                type="text"
                placeholder="Short Address"
                value={shortAdress}
                onChange={(e) => setShortAdress(e.target.value)}
              />
            </div>
          </div>

          <div className="col-sm-6">
            <div className="form-group">
              <label htmlFor="customer_address_1">Customer Address 1</label>
              <input
                id="customer_address_1"
                className="form-control"
                type="text"
                placeholder="Customer Address 1"
                value={addr01}
                onChange={(e) => setAddr01(e.target.value)}
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <label htmlFor="customer_address_2">Customer Address 2</label>
              <input
                id="customer_address_2"
                className="form-control"
                type="text"
                placeholder="Customer Address 2"
                value={addr02}
                onChange={(e) => setAddr02(e.target.value)}
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <label htmlFor="state">State</label>
              <input
                id="state"
                className="form-control"
                type="text"
                placeholder="State"
                value={statex}
                onChange={(e) => setStatex(e.target.value)}
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                id="city"
                className="form-control"
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <label htmlFor="zip_code">Zip Code</label>
              <input
                id="zip_code"
                className="form-control"
                type="number"
                placeholder="Zip Code"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <input
                id="country"
                className="form-control"
                type="text"
                placeholder="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <label htmlFor="company_name">Company Name</label>
              <input
                id="company_name"
                className="form-control"
                type="text"
                placeholder="Company Name"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <label htmlFor="profile_picture">Profile Logo/Picture</label>
              <input
                id="profile_picture"
                className="form-control"
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
              <input
                id="profile_picture"
                className="form-control"
                value={oldImage}
                onChange={(e) => setOldImage(oldImage)}
                hidden
              />
            </div>
          </div>
        </div>

        <div className="ps-form__submit text-center">
          <button className="ps-btn success" type="submit">
            Update Profile
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormChangeUserInformation;
