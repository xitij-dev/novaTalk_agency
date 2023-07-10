import React, { Fragment, useEffect, useState } from "react";

//router
import { Link, useHistory } from "react-router-dom";

//alert
import { permissionError } from "../../util/alert";

//server path
import { baseURL } from "../../util/serverPath";

//dialog
import HostDialog from "../Dialog/hostDialog";

//dayjs
import dayjs from "dayjs";

//redux
import { useDispatch, connect, useSelector } from "react-redux";
import { getHost, blockUnblockHost } from "../../store/host/action";

import {
  GET_SINGLE_HOST_DATA,
  OPEN_HOST_DIALOG,
  UNSET_CREATE_HOST_DONE,
  UNSET_UPDATE_HOST_DONE,
} from "../../store/host/types";

//custom css
import "../../dist/css/style.min.css";
import "../../dist/css/style.css";

//MUI
import { Snackbar, TablePagination } from "@material-ui/core";
import TablePaginationActions from "./TablePagination";
import { Alert } from "@material-ui/lab";

const HostTable = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [data, setData] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openUpdateSuccess, setOpenUpdateSuccess] = useState(false);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const { id } = useSelector((state) => state.admin.user);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const { host, createDone, updateDone } = useSelector((state) => state.host);

  useEffect(() => {
    props.getHost(id);
  }, []);

  useEffect(() => {
    setData(host);
  }, [host]);

  const blockUnblock = (data) => {
    props.blockUnblockHost(data._id);
  };

  const handleOpen = () => {
    dispatch({ type: OPEN_HOST_DIALOG });
  };

  const handleEdit = (data) => {
    dispatch({ type: OPEN_HOST_DIALOG, payload: data });
  };

  useEffect(() => {
    if (createDone) {
      setOpenSuccess(true);
      dispatch({ type: UNSET_CREATE_HOST_DONE });
    }
  }, [createDone, dispatch]);
  useEffect(() => {
    if (updateDone) {
      setOpenUpdateSuccess(true);
      dispatch({ type: UNSET_UPDATE_HOST_DONE });
    }
  }, [updateDone, dispatch]);

  const handleSearch = (e) => {
    const value = e.target.value.toUpperCase();
    if (value) {
      const data = host.filter((data) => {
        return (
          data?.name?.toUpperCase()?.indexOf(value) > -1 ||
          // data?.username?.toUpperCase()?.indexOf(value) > -1 ||
          data?.country?.toUpperCase()?.indexOf(value) > -1 ||
          data?.agencyId?.name?.toUpperCase()?.indexOf(value) > -1 ||
          data?.bio?.toUpperCase()?.indexOf(value) > -1
        );
      });
      setData(data);
    } else {
      return setData(host);
    }
  };

  const handleAnalytic = (data) => {
    dispatch({ type: GET_SINGLE_HOST_DATA, payload: data });
    history.push("/admin/host/analytic/" + data._id);
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
  };
  const handleCloseUpdateSuccess = () => {
    setOpenUpdateSuccess(false);
  };

  return (
    <Fragment>
      <Snackbar
        open={openSuccess}
        autoHideDuration={3000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSuccess} severity="success">
          <span style={{ color: "#184d47" }}>
            <b>Success!</b> Host add successfully.
          </span>
        </Alert>
      </Snackbar>
      <Snackbar
        open={openUpdateSuccess}
        autoHideDuration={3000}
        onClose={handleCloseUpdateSuccess}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseUpdateSuccess} severity="success">
          <span style={{ color: "#184d47" }}>
            <b>Success!</b> Host update successfully.
          </span>
        </Alert>
      </Snackbar>
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
                  <li
                    class="breadcrumb-item text-muted active"
                    aria-current="page"
                  >
                    Host
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-8 mt-4 float-left">
                    {/* <h3 class="card-title">Host</h3> */}
                    <button
                      type="button"
                      class="btn waves-effect waves-light btn-primary btn-sm"
                      data-toggle="modal"
                      // data-target="#country-modal"
                      style={{ borderRadius: 5 }}
                      onClick={handleOpen}
                    >
                      <i class="fas fa-plus"></i> New
                    </button>
                  </div>
                  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 mt-3 float-right">
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
                </div>
                <div class="row">
                  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-8 mt-3 float-left mb-0"></div>
                </div>

                <div class="table-responsive">
                  <table
                    id="zero_config"
                    class="table table-striped table-bordered no-wrap"
                  >
                    <thead>
                      <tr>
                        <th>Name</th>
                        {/* <th>UserName</th> */}
                        <th>Host Id</th>

                        <th>IP Address</th>
                        <th>Coin</th>
                        <th>Country</th>

                        <th>Block</th>
                        <th>Action</th>
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
                            return (
                              <tr key={index}>
                                <td>
                                  {
                                    <img
                                      src={data.image}
                                      width="70px"
                                      height="70px"
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
                                {/* <td style={{ verticalAlign: "middle" }}>
                                  {data.username}
                                </td> */}
                                <td style={{ verticalAlign: "middle" }}>
                                  {data.hostId}
                                </td>

                                <td style={{ verticalAlign: "middle" }}>
                                  {data.IPAddress}
                                </td>
                                <td style={{ verticalAlign: "middle" }}>
                                  {data.coin}
                                </td>

                                <td style={{ verticalAlign: "middle" }}>
                                  {data.country}
                                </td>

                                <td
                                  align="center"
                                  style={{ verticalAlign: "middle" }}
                                >
                                  <label class="switch">
                                    <input
                                      type="checkbox"
                                      checked={data.block}
                                      onChange={() => blockUnblock(data)}
                                    />
                                    <span class="slider">
                                      <p
                                        style={{
                                          fontSize: 12,
                                          marginLeft: `${
                                            data.block ? "-25px" : "25px"
                                          }`,
                                          color: "white",
                                          marginTop: "6px",
                                        }}
                                      >
                                        {data.block ? "Yes" : "No"}
                                      </p>
                                    </span>
                                  </label>
                                </td>
                                <td style={{ verticalAlign: "middle" }}>
                                  <a
                                    class="ml-3"
                                    onClick={() => handleEdit(data)}
                                    style={{ cursor: "pointer" }}
                                  >
                                    <i class="fas fa-edit text-primary mr-3"></i>
                                  </a>
                                  {/* <Link to={"/admin/host/analytic/" + data._id}> */}
                                  <button
                                    type="button"
                                    class="btn btn-fill btn-primary btn-sm"
                                    style={{ borderRadius: 5 }}
                                    onClick={() => handleAnalytic(data)}
                                  >
                                    <i class="far fa-chart-bar text-white pr-2"></i>
                                    Earning Report
                                  </button>
                                  {/* </Link> */}
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
                        {/* <th>UserName</th> */}
                        <th>Host Id</th>

                        <th>IP Address</th>
                        <th>Coin</th>
                        <th>Country</th>

                        <th>Block</th>
                        <th>Action</th>
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

export default connect(null, { getHost, blockUnblockHost })(HostTable);
