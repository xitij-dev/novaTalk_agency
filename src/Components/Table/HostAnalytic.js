import React, { Fragment, useEffect, useState } from "react";

//router
import { Link } from "react-router-dom";

//dialog
import HostDialog from "../Dialog/hostDialog";

//dayjs
import dayjs from "dayjs";

//datepicker
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";

//redux
import { useDispatch, connect, useSelector } from "react-redux";
import { hostAnalytic, liveStreamingAnalytic } from "../../store/host/action";

//custom css
import "../../dist/css/style.min.css";
import "../../dist/css/style.css";

//MUI
import { Snackbar, TablePagination } from "@material-ui/core";
import TablePaginationActions from "./TablePagination";
import { Alert } from "@material-ui/lab";

import Admin from "../../images/profile.png";

const HostAnalyticTable = (props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [liveStreamingData, setLiveStreamingData] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [show, setShow] = useState(false);

  const [date, setDate] = useState("");
  const [liveStreamingDate, setLiveStreamingDate] = useState("");

  var date_ = new Date();
  const [start, setStart] = useState(
    dayjs(new Date(date_.getFullYear(), date_.getMonth(), 1)).format(
      "YYYY-MM-DD"
    )
  );
  const [end, setEnd] = useState(dayjs(date_).format("YYYY-MM-DD"));

  const [startDate, setStartDate] = useState(
    dayjs(new Date(date_.getFullYear(), date_.getMonth(), 1)).format(
      "YYYY-MM-DD"
    )
  );
  const [endDate, setEndDate] = useState(dayjs(date_).format("YYYY-MM-DD"));

  const {
    analytic,
    liveStreamingAnalytic,
    singleHost: host,
    totalCoin,
    liveStreamingCoin,
  } = useSelector((state) => state.host);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  // const { singleHost: host, totalCoin } = useSelector((state) => state.host);
  const id = props.match.params.id;
  useEffect(() => {
    props.hostAnalytic(id, start, end);
    props.liveStreamingAnalytic(id, startDate, endDate);
  }, []);

  useEffect(() => {
    setData(analytic);
  }, [analytic]);

  useEffect(() => {
    setLiveStreamingData(liveStreamingAnalytic);
  }, [liveStreamingAnalytic]);

  const handleSearch = (e) => {
    const value = e.target.value.toUpperCase();
    if (value) {
      const data = analytic.filter((data) => {
        return (
          data?.type?.toUpperCase()?.indexOf(value) > -1 ||
          data?.name?.toUpperCase()?.indexOf(value) > -1
        );
      });
      setData(data);
    } else {
      return setData(analytic);
    }
  };

  const handleCallback = (start, end) => {
    const start_ = dayjs(start._d).format("YYYY-MM-DD");
    const end_ = dayjs(end._d).format("YYYY-MM-DD");
    setStart(start_);
    setEnd(end_);
    setDate(start_ + " to " + end_);
    props.hostAnalytic(id, start_, end_);
  };

  const handleLiveStreamingCallback = (start, end) => {
    const start_ = dayjs(start._d).format("YYYY-MM-DD");
    const end_ = dayjs(end._d).format("YYYY-MM-DD");
    setStartDate(start_);
    setEndDate(end_);
    setLiveStreamingDate(start_ + " to " + end_);
    props.liveStreamingAnalytic(id, start_, end_);
  };

  return (
    <Fragment>
      <div class="page-breadcrumb">
        <div class="row">
          <div class="col-7 align-self-center">
            <div class="d-flex align-items-center">
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb m-0 p-0">
                  <li class="breadcrumb-item">
                    <Link to="/admin/dashboard" class="text-muted">
                      Home
                    </Link>
                  </li>
                  <li class="breadcrumb-item">
                    <Link to="/admin/host" class="text-muted">
                      Host
                    </Link>
                  </li>

                  <li
                    class="breadcrumb-item text-muted active"
                    aria-current="page"
                  >
                    Host Analytic
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-7 col-md-7 col-sm-12">
            <div class="card">
              <div class="card-header">
                <h3>Profile Detail</h3>
              </div>
              <div class="card-body">
                <div class="table-responsive">
                  <table id="zero_config" class="">
                    <tr>
                      <td>
                        <label class="font-weight-bold">Agency Name</label>
                      </td>
                      <td>
                        <label class="font-weight-bold">&nbsp;:</label>
                      </td>
                      <td>
                        <label>&nbsp;{host.agencyId?.name}</label>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <label class="font-weight-bold">Id</label>
                      </td>
                      <td>
                        <label class="font-weight-bold">&nbsp;:</label>
                      </td>
                      <td>
                        <label>&nbsp;{host.hostId}</label>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label class="font-weight-bold">Password</label>
                      </td>
                      <td>
                        <label class="font-weight-bold">&nbsp;:</label>
                      </td>
                      <td>
                        <label>
                          &nbsp;{show ? host.password : "**********"}
                          &nbsp;&nbsp;
                          {show ? (
                            <i
                              class="fa fa-eye pr-2"
                              onClick={() => setShow(false)}
                            ></i>
                          ) : (
                            <i
                              class="fas fa-eye-slash pr-2"
                              onClick={() => setShow(true)}
                            ></i>
                          )}
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label class="font-weight-bold">Country</label>
                      </td>
                      <td>
                        <label class="font-weight-bold">&nbsp;:</label>
                      </td>
                      <td>
                        <label>&nbsp;{host.country}</label>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label class="font-weight-bold">Coin</label>
                      </td>
                      <td>
                        <label class="font-weight-bold">&nbsp;:</label>
                      </td>
                      <td>
                        <label>&nbsp;{host.coin}</label>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label class="font-weight-bold">Followers</label>
                      </td>
                      <td>
                        <label class="font-weight-bold">&nbsp;:</label>
                      </td>
                      <td>
                        <label>&nbsp;{host.followers_count}</label>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label class="font-weight-bold">Following</label>
                      </td>
                      <td>
                        <label class="font-weight-bold">&nbsp;:</label>
                      </td>
                      <td>
                        <label>&nbsp;{host.following_count}</label>
                      </td>
                    </tr>
                    {/* <tr>
                      <td>
                        <label class="font-weight-bold">
                          Earn Coin From Call
                        </label>
                      </td>
                      <td>
                        <label class="font-weight-bold">&nbsp;:</label>
                      </td>
                      <td>
                        <label>&nbsp;{totalCoin.totalCallCoin}</label>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label class="font-weight-bold">
                          Earn Coin From Gift
                        </label>
                      </td>
                      <td>
                        <label class="font-weight-bold">&nbsp;:</label>
                      </td>
                      <td>
                        <label>
                          &nbsp;
                          {totalCoin.totalGiftCoin}
                        </label>
                      </td>
                    </tr> */}
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-5 col-md-7 col-sm-12">
            <div class="card">
              <div class="card-header">
                <h3>Profile Image</h3>
              </div>
              <div class="card-body text-center mt-2">
                <img
                  src={host.image}
                  alt="img"
                  height="150px"
                  width="150px"
                  style={{ borderRadius: 5 }}
                />
                <div className="mt-3">
                  <strong>{host.name}</strong>
                </div>
                <div className="mt-1">
                  <label class="font-weight-bold text-left">Bio : </label>
                  <label>
                    &nbsp;
                    {host.bio}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-header">
                <h3>Earning Coin from Call & Gift Analytic</h3>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 mt-4 float-left">
                    <form action="">
                      <div class="input-group mb-4 border rounded-pill p-1">
                        <div class="input-group-prepend border-0">
                          <div
                            id="button-addon4"
                            class="btn btn-link text-primary"
                          >
                            <i class="fa fa-search"></i>
                          </div>
                        </div>
                        <input
                          type="search"
                          placeholder="What're you searching for?"
                          aria-describedby="button-addon4"
                          class="form-control bg-none border-0 rounded-pill mr-1"
                          onChange={handleSearch}
                        />
                      </div>
                    </form>
                  </div>
                  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-3 mt-3 float-right"></div>
                  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-5 mt-4 float-right">
                    <DateRangePicker
                      // onEvent={handleEvent}
                      onCallback={handleCallback}
                    >
                      <input
                        type="text"
                        class="form-control float-right"
                        placeholder="Select Date"
                        value={!date ? "Select Date" : date}
                        style={{ width: 180 }}
                      />
                    </DateRangePicker>
                  </div>
                </div>

                <div class="table-responsive">
                  <table
                    id="zero_config"
                    class="table table-striped table-bordered no-wrap"
                  >
                    <thead>
                      <tr>
                        <th colSpan="2">
                          <label class="font-weight-bold align-center">
                            Total Earn Coin From Call :
                          </label>
                          <label>&nbsp;{totalCoin.totalCallCoin}</label>
                        </th>
                        <th colSpan="4">
                          <label class="font-weight-bold align-center">
                            Total Earn Coin From Gift :
                          </label>
                          <label>
                            &nbsp;
                            {totalCoin.totalGiftCoin}
                          </label>
                        </th>
                      </tr>
                      <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Total Gift During Call</th>
                        <th>Coin</th>
                        <th>Duration</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.length > 0 ? (
                        <Fragment>
                          {(rowsPerPage > 0
                            ? data.slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                            : data
                          ).map((data, index) => {
                            var d = Number(data.time);

                            var h = Math.floor(d / 3600)
                              .toString()
                              .padStart(2, "0");
                            var m = Math.floor((d % 3600) / 60)
                              .toString()
                              .padStart(2, "0");
                            var s = Math.floor(d % 60)
                              .toString()
                              .padStart(2, "0");
                            return (
                              <tr key={index}>
                                <td>
                                  {
                                    <img
                                      src={
                                        data.type === "Bonus"
                                          ? Admin
                                          : data.image
                                      }
                                      width="40px"
                                      height="40px"
                                      alt="img"
                                      style={{
                                        objectFit: "contain",
                                        borderRadius: "50%",
                                        border: " 1px solid #808080",
                                      }}
                                      class="mr-3"
                                    />
                                  }
                                  {data.name}
                                </td>

                                <td style={{ verticalAlign: "middle" }}>
                                  {data.type}
                                </td>
                                <td style={{ verticalAlign: "middle" }}>
                                  {data.type === "call" ? data.gift : "-"}
                                </td>
                                <td style={{ verticalAlign: "middle" }}>
                                  {data.coin}
                                </td>
                                <td style={{ verticalAlign: "middle" }}>
                                  {data.type === "call"
                                    ? h + ":" + m + ":" + s
                                    : "-"}
                                </td>
                                <td style={{ verticalAlign: "middle" }}>
                                  {dayjs(data.date).format("DD MMM, YYYY")}
                                </td>
                              </tr>
                            );
                          })}
                        </Fragment>
                      ) : (
                        <tr>
                          <td colSpan="12" align="center">
                            Nothing to show!!
                          </td>
                        </tr>
                      )}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Total Gift During Call</th>
                        <th>Coin</th>
                        <th>Duration</th>
                        <th>Date</th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                <div class="py-2">
                  <TablePagination
                    id="pagination"
                    component="div"
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      100,
                      { label: "All", value: -1 },
                    ]}
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: { "aria-label": "rows per page" },
                      native: true,
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-header">
                <h3>Earning Coin from Live Streaming Analytic</h3>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 mt-4 float-left"></div>
                  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-3 mt-3 float-right"></div>
                  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-5 mt-4 mb-2 float-right">
                    <DateRangePicker
                      // onEvent={handleEvent}
                      onCallback={handleLiveStreamingCallback}
                    >
                      <input
                        type="text"
                        class="form-control float-right"
                        placeholder="Select Date"
                        value={
                          !liveStreamingDate ? "Select Date" : liveStreamingDate
                        }
                        style={{ width: 180 }}
                      />
                    </DateRangePicker>
                  </div>
                </div>

                <div class="table-responsive">
                  <table
                    id="zero_config"
                    class="table table-striped table-bordered no-wrap"
                  >
                    <thead>
                      <tr>
                        <th colSpan="6" className="text-center">
                          <label class="font-weight-bold align-center">
                            Total Earn Coin From Live Streaming :
                          </label>
                          <label>&nbsp;{liveStreamingCoin}</label>
                        </th>
                      </tr>
                      <tr>
                        <th>Total Join User</th>
                        <th>Total Gift</th>
                        <th>Total Earn Coin</th>
                        <th>Duration</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {liveStreamingData.length > 0 ? (
                        <Fragment>
                          {(rowsPerPage > 0
                            ? liveStreamingData.slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                            : liveStreamingData
                          ).map((data, index) => {
                            var d = Number(data.time);

                            var h = Math.floor(d / 3600)
                              .toString()
                              .padStart(2, "0");
                            var m = Math.floor((d % 3600) / 60)
                              .toString()
                              .padStart(2, "0");
                            var s = Math.floor(d % 60)
                              .toString()
                              .padStart(2, "0");
                            return (
                              <tr key={index}>
                                <td>{data.user}</td>

                                <td style={{ verticalAlign: "middle" }}>
                                  {data.gift}
                                </td>
                                <td style={{ verticalAlign: "middle" }}>
                                  {data.coin}
                                </td>

                                <td style={{ verticalAlign: "middle" }}>
                                  {h + ":" + m + ":" + s}
                                </td>
                                <td style={{ verticalAlign: "middle" }}>
                                  {dayjs(data.date).format("DD MMM, YYYY")}
                                </td>
                              </tr>
                            );
                          })}
                        </Fragment>
                      ) : (
                        <tr>
                          <td colSpan="12" align="center">
                            Nothing to show!!
                          </td>
                        </tr>
                      )}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th>Total Join User</th>
                        <th>Total Gift</th>
                        <th>Total Earn Coin</th>
                        <th>Duration</th>
                        <th>Date</th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                <div class="py-2">
                  <TablePagination
                    id="pagination"
                    component="div"
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      100,
                      { label: "All", value: -1 },
                    ]}
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: { "aria-label": "rows per page" },
                      native: true,
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <HostDialog />
    </Fragment>
  );
};

export default connect(null, { hostAnalytic, liveStreamingAnalytic })(
  HostAnalyticTable
);
