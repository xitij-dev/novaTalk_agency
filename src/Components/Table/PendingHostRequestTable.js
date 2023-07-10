// (window, $);
import React, { Fragment, useEffect, useState } from "react";

//router
import { Link } from "react-router-dom";

//alert
import { permissionError } from "../../util/alert";

//server path
import { baseURL } from "../../util/serverPath";

//dayjs
import dayjs from "dayjs";

//redux
import { useDispatch, connect, useSelector } from "react-redux";
import {
  getPendingRequest,
  acceptPendingRequest,
} from "../../store/pendingHostRequest/action";

//types
import {
  OPEN_REQUEST_DIALOG,
  UNSET_ACCEPT_REQUEST_DONE,
} from "../../store/pendingHostRequest/types";

//dialog
import RequestDialog from "../Dialog/pendingHostRequestDialog";

//custom css
import "../../dist/css/style.min.css";
import "../../dist/css/style.css";

//MUI
import { Snackbar, TablePagination } from "@material-ui/core";
import TablePaginationActions from "./TablePagination";
import { Alert } from "@material-ui/lab";

const PendingRequestTable = (props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openSuccess, setOpenSuccess] = useState(false);

  const { id } = useSelector((state) => state.admin.user);

  const { request, createDone } = useSelector((state) => state.request);
  const hasPermission = useSelector((state) => state.admin.user.flag);

  useEffect(() => {
    props.getPendingRequest(id);
  }, []);

  useEffect(() => {
    setData(request);
  }, [request]);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const AcceptRequest = (data) => {
    dispatch({ type: OPEN_REQUEST_DIALOG, payload: data });
    // props.acceptPendingRequest(data._id);
  };

  useEffect(() => {
    if (createDone) {
      setOpenSuccess(true);
      dispatch({ type: UNSET_ACCEPT_REQUEST_DONE });
    }
  }, [createDone, dispatch]);

  const handleSearch = (e) => {
    const value = e.target.value.toUpperCase();
    if (value) {
      const data = request.filter((data) => {
        return (
          data?.user_id?.name?.toUpperCase()?.indexOf(value) > -1 ||
          data?.user_id?.country?.toUpperCase()?.indexOf(value) > -1 ||
          data?.agencyId?.name?.toUpperCase()?.indexOf(value) > -1
        );
      });
      setData(data);
    } else {
      return setData(request);
    }
  };
  const handleCloseSuccess = () => {
    setOpenSuccess(false);
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
            <b>Success!</b> Request Accept successfully.
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
                    User
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
                    <h3 class="card-title">Pending Host Request from User</h3>
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
                        <th>Image</th>
                        <th>Coin</th>
                        <th>Followers</th>
                        <th>Following</th>
                        <th>Country</th>
                        <th>Agency Name</th>
                        <th>Is Accept</th>
                        <th>Created At</th>
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
                                      src={
                                        baseURL + "/" + data.user_id.thumbImage
                                      }
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
                                  {data.user_id.name}
                                </td>

                                <td style={{ verticalAlign: "middle" }}>
                                  {data.user_id.coin}
                                </td>
                                <td style={{ verticalAlign: "middle" }}>
                                  {data.user_id.followers_count}
                                </td>
                                <td style={{ verticalAlign: "middle" }}>
                                  {data.user_id.following_count}
                                </td>
                                <td style={{ verticalAlign: "middle" }}>
                                  {data.user_id.country}
                                </td>
                                <td style={{ verticalAlign: "middle" }}>
                                  {data.agencyId ? data.agencyId.name : "-"}
                                </td>
                                <td style={{ verticalAlign: "middle" }}>
                                  <label class="switch">
                                    <input
                                      type="checkbox"
                                      checked={data.isAccepted}
                                      onChange={() => AcceptRequest(data)}
                                    />
                                    <span class="slider">
                                      <p
                                        style={{
                                          fontSize: 12,
                                          marginLeft: `${
                                            data.isAccepted ? "5px" : "33px"
                                          }`,
                                          color: "white",
                                          marginTop: "6px",
                                        }}
                                      >
                                        {data.isAccepted ? "Yes" : "No"}
                                      </p>
                                    </span>
                                  </label>
                                </td>
                                <td style={{ verticalAlign: "middle" }}>
                                  {dayjs(data.createdAt).format("DD MMM, YYYY")}
                                </td>
                              </tr>
                            );
                          })}
                        </Fragment>
                      ) : (
                        <tr>
                          <td colSpan="8" align="center">
                            Nothing to show!!
                          </td>
                        </tr>
                      )}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th>Image</th>

                        <th>Coin</th>
                        <th>Followers</th>
                        <th>Following</th>
                        <th>Country</th>
                        <th>Agency Name</th>
                        <th>Is Accept</th>
                        <th>Created At</th>
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
      <RequestDialog />
    </Fragment>
  );
};

export default connect(null, { getPendingRequest, acceptPendingRequest })(
  PendingRequestTable
);
