// (window, $);
import React, { Fragment, useEffect, useState } from "react";

//router
import { Link } from "react-router-dom";

//dayjs
import dayjs from "dayjs";

//alert
import { permissionError } from "../../util/alert";

//redux
import { connect, useSelector, useDispatch } from "react-redux";
import {
  getPendingRedeem,
  acceptRedeemRequest,
  declineRedeemRequest,
} from "../../store/redeem/action";

import {
  CLOSE_ACCEPT_SUCCESS,
  OPEN_REDEEM_ACCEPT_DIALOG,
} from "../../store/redeem/types";

import RedeemAcceptDialog from "../Dialog/redeemAcceptDialog";

//custom css
import "../../dist/css/style.min.css";
import "../../dist/css/style.css";

//MUI
import { Snackbar, TablePagination } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import TablePaginationActions from "./TablePagination";

const RedeemTable = (props) => {
  const dispatch = useDispatch();

  const [data, setData] = useState([]);

  const [openSuccess, setOpenSuccess] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { pendingRedeem: redeem, acceptDone } = useSelector(
    (state) => state.redeem
  );

  const agency = useSelector((state) => state.admin.user);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  useEffect(() => {
    props.getPendingRedeem(agency.id);
  }, []);

  useEffect(() => {
    setData(redeem);
  }, [redeem]);

  useEffect(() => {
    if (acceptDone) {
      dispatch({ type: CLOSE_ACCEPT_SUCCESS });
      setOpenSuccess(true);
    }
  }, [acceptDone, dispatch]);

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
  };

  const redeemRequest = (data) => {
    dispatch({ type: OPEN_REDEEM_ACCEPT_DIALOG, payload: data });
  };

  const handleDeclineRedeem = (id) => {
    props.declineRedeemRequest(id);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toUpperCase();
    if (value) {
      const data = redeem.filter((data) => {
        return (
          data?.host_id.name?.toUpperCase()?.indexOf(value) > -1 ||
          data?.paymentGateway?.toUpperCase()?.indexOf(value) > -1 ||
          data?.host_id.username?.toUpperCase()?.indexOf(value) > -1 ||
          data?.description?.toUpperCase()?.indexOf(value) > -1
        );
      });
      setData(data);
    } else {
      return setData(redeem);
    }
  };

  const { howManyCoins, currency } = useSelector(
    (state) => state.setting.setting
  );

  return (
    <>
      <Snackbar
        open={openSuccess}
        autoHideDuration={2000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSuccess} severity="success">
          <span style={{ color: "#184d47" }}>
            <b>Success!</b> Redeem Request accept successfully.
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
                    Pending Redeem
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
                    <h3 class="card-title">Pending Redeem Request</h3>
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
                        <th>User Name</th>
                        <th>Payment Gateway</th>
                        <th>Coin</th> <th>Rupee</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Arrived On</th>
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
                                      src={data.host_id.image}
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
                                  {data.host_id.name}
                                </td>
                                <td style={{ verticalAlign: "middle" }}>
                                  {data.host_id.username}
                                </td>
                                <td style={{ verticalAlign: "middle" }}>
                                  {data.paymentGateway}
                                </td>
                                <td style={{ verticalAlign: "middle" }}>
                                  {data.coin}
                                </td>
                                <td style={{ verticalAlign: "middle" }}>
                                  {data.coin / howManyCoins}&nbsp; {currency}
                                </td>
                                <td style={{ verticalAlign: "middle" }}>
                                  {data.description}
                                </td>

                                {data.decline === true ? (
                                  <td
                                    style={{
                                      verticalAlign: "middle",
                                    }}
                                  >
                                    <button class="btn btn-sm btn-danger">
                                      Decline
                                    </button>
                                  </td>
                                ) : (
                                  <td
                                    style={{
                                      verticalAlign: "middle",
                                    }}
                                  >
                                    <button class="btn btn-sm btn-primary">
                                      Pending
                                    </button>
                                  </td>
                                )}

                                <td style={{ verticalAlign: "middle" }}>
                                  {dayjs(data.createdAt).format("DD MMM, YYYY")}
                                </td>
                                <td style={{ verticalAlign: "middle" }}>
                                  {data.decline === false ? (
                                    <>
                                      <button
                                        type="button"
                                        class="btn waves-effect waves-light btn-primary btn-sm"
                                        data-toggle="modal"
                                        style={{ borderRadius: 5 }}
                                        onClick={() => redeemRequest(data)}
                                      >
                                        <i class="fas fa-check"></i> Accept
                                      </button>
                                      <button
                                        type="button"
                                        class="btn waves-effect waves-light btn-danger btn-sm"
                                        data-toggle="modal"
                                        style={{ borderRadius: 5 }}
                                        onClick={() =>
                                          handleDeclineRedeem(data._id)
                                        }
                                      >
                                        <i class="fas fa-times"></i> Decline
                                      </button>
                                    </>
                                  ) : (
                                    "-"
                                  )}
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
                        <th>User Name</th>
                        <th>Payment Gateway</th>
                        <th>Coin</th> <th>Rupee</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Arrived On</th>
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
      <RedeemAcceptDialog />
    </>
  );
};

export default connect(null, {
  getPendingRedeem,
  acceptRedeemRequest,
  declineRedeemRequest,
})(RedeemTable);
