import { DatePicker, Select } from "antd";
import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import Pagination from "~/components/dashboard/elements/basic/Pagination";
import ContainerDefault from "~/components/dashboard/layouts/ContainerDefault";
import HeaderDashboard from "~/components/dashboard/shared/headers/HeaderDashboard";
import TableOrdersItems from "~/components/dashboard/shared/tables/TableOrdersItems";
import { toggleDrawerMenu } from "~/components/dashboard/store/app/action";

const { Option } = Select;
const OrdersPage = () => {
  const [usrOrderItems, setUsrOrderItems] = useState([]);
  const [usrOrderItemsSpliced, setUsrOrderItemsSpliced] = useState([]);
  const [len, setLen] = useState(0);
  const [offset, setOffset] = useState(0);
  const [spliceNO, setSpliceNO] = useState(10);
  const [err, setErr] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(toggleDrawerMenu(false));
  }, []);

  useEffect(() => {
    var formdata = new FormData();
    formdata.append("customer_id", "1508"); /** It has to be dynamic */

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "http://178.128.30.38/api/react/customer_dashboard/manage_order" /** @TODO Change this into .env file */,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.response_status === 200) {
          setUsrOrderItems(result.data);
          setUsrOrderItemsSpliced(result.data);
          setLen(result.data.length);
        } else {
          setErr(true);
        }
      })
      .catch((error) => console.log("error", error));
  }, []);

  useEffect(() => {
    if (usrOrderItems.length > 0) {
      const temps = usrOrderItems.map((data, index) => {
        if (index > offset && index < spliceNO) return data;
      });
      setUsrOrderItemsSpliced(temps);
    }
  }, [usrOrderItems, spliceNO]);

  return (
    <ContainerDefault>
      <HeaderDashboard
        title="Recent Orders"
        description="E-needz Orders Listing"
      />
      <section className="ps-items-listing">
        <div className="ps-section__header simple">
          <div className="ps-section__filter">
            <form className="ps-form--filter" action="index.html" method="get">
              <div className="ps-form__left">
                <div className="form-group">
                  <label htmlFor="order_number">Order Number</label>
                  <input
                    id="order_number"
                    className="form-control"
                    type="text"
                    placeholder="Order Number..."
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="order_status">Order Status</label>
                  <Select
                    id="order_status"
                    placeholder="Order Status"
                    className="ps-ant-dropdown"
                    listItemHeight={20}
                  >
                    <Option value="pending">Pending</Option>
                    <Option value="processing">Processing</Option>
                    <Option value="picked">Picked</Option>
                    <Option value="shipping">Shipping</Option>
                    <Option value="delivered">Delivered</Option>
                    <Option value="returned">Returned</Option>
                    <Option value="refunded">Refund</Option>
                    <Option value="cancel">Cancel</Option>
                  </Select>
                </div>

                <div className="form-group">
                  <label htmlFor="order_date" className="d-block mb-4">
                    Date
                  </label>
                  <DatePicker id="order_date" className="mt-2" size="large" />
                </div>
              </div>
              <div className="ps-form__right mt-3">
                <label></label>
                <button className="ps-btn ps-btn--gray">
                  <i className="icon icon-funnel mr-2"></i>
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="ps-section__content">
          <TableOrdersItems usrOrderItems={usrOrderItemsSpliced} err={err} />
        </div>
        <div className="ps-section__footer">
          <p>Show 10 in {len} items.</p>
          <Pagination
            setSpliceNO={setSpliceNO}
            spliceNO={spliceNO}
            offset={offset}
            setOffset={setOffset}
            len={len}
          />
        </div>
      </section>
    </ContainerDefault>
  );
};
export default connect((state) => state.app)(OrdersPage);
