import React, { Fragment, useEffect, useState } from "react";

//router
import { Link, useHistory } from "react-router-dom";

//dialog
import AgencyRedeemDialog from "../Dialog/agencyRedeemDialog";

//dayjs
import dayjs from "dayjs";

//redux
import { useDispatch, connect, useSelector } from "react-redux";
import { getRedeem, deleteRedeem } from "../../store/agencyRedeem/action";

import {
  GET_REDEEM,
  OPEN_REDEEM_DIALOG,
  UNSET_CREATE_REDEEM_DONE,
  UNSET_UPDATE_REDEEM_DONE,
} from "../../store/agencyRedeem/types";

//custom css
import "../../dist/css/style.min.css";
import "../../dist/css/style.css";

//MUI
import { Snackbar, TablePagination } from "@material-ui/core";
import TablePaginationActions from "./TablePagination";
import { Alert } from "@material-ui/lab";
import { alert, warning } from "../../util/alert";

const AgencyRedeemTable = (props) => {
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

  const agency = useSelector((state) => state.admin.user);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const { agencyRedeem, agencyCoin, createDone, updateDone } = useSelector(
    (state) => state.agencyRedeem
  );

  const { howManyCoins, currency } = useSelector(
    (state) => state.setting.setting
  );

  useEffect(() => {
    props.getRedeem(agency.id);
  }, []);

  useEffect(() => {
    setData(agencyRedeem);
  }, [agencyRedeem]);

  const handleOpen = () => {
    if (agencyCoin.redeemCoin > 0) {
      dispatch({ type: OPEN_REDEEM_DIALOG });
    } else {
      alert(
        "You can't Send Redeem request",
        "You don't have enough Coin",
        "warning"
      );
    }
  };

  const handleEdit = (data) => {
    dispatch({ type: OPEN_REDEEM_DIALOG, payload: data });
  };

  useEffect(() => {
    if (createDone) {
      setOpenSuccess(true);
      dispatch({ type: UNSET_CREATE_REDEEM_DONE });
    }
  }, [createDone, dispatch]);
  useEffect(() => {
    if (updateDone) {
      setOpenUpdateSuccess(true);
      dispatch({ type: UNSET_UPDATE_REDEEM_DONE });
    }
  }, [updateDone, dispatch]);

  const handleSearch = (e) => {
    const value = e.target.value.toUpperCase();
    if (value) {
      const data = agencyRedeem.filter((data) => {
        return (
          data?.paymentGateway?.toUpperCase()?.indexOf(value) > -1 ||
          data?.description?.toUpperCase()?.indexOf(value) > -1
        );
      });
      setData(data);
    } else {
      return setData(agencyRedeem);
    }
  };

  const handleDelete = (id) => {
    const data = warning();
    data
      .then((isDeleted) => {
        if (isDeleted) {
          props.deleteRedeem(id);
          alert("Deleted!", `Redeem has been deleted!`, "success");
        }
      })
      .catch((err) => console.log(err));
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
            <b>Success!</b> Redeem Send successfully.
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
            <b>Success!</b> Redeem update successfully.
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
                    Redeem
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
                        <th>PaymentGateway</th>
                        <th>Coin</th>
                        <th>Rupee</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Created At</th>
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
                                <td>{data.paymentGateway}</td>
                                <td style={{ verticalAlign: "middle" }}>
                                  {data.coin}
                                </td>

                                <td style={{ verticalAlign: "middle" }}>
                                  {data.coin / howManyCoins}&nbsp; {currency}
                                </td>
                                <td style={{ verticalAlign: "middle" }}>
                                  {data.description}
                                </td>
                                {data.accepted === true ? (
                                  <td
                                    style={{
                                      verticalAlign: "middle",
                                    }}
                                  >
                                    <button class="btn btn-sm btn-success">
                                      Accepted
                                    </button>
                                  </td>
                                ) : (
                                  <td
                                    style={{
                                      verticalAlign: "middle",
                                    }}
                                  >
                                    <button class="btn btn-sm btn-danger">
                                      Pending
                                    </button>
                                  </td>
                                )}
                                <td style={{ verticalAlign: "middle" }}>
                                  {dayjs(data.createdAt).format("DD MMM, YYYY")}
                                </td>

                                <td style={{ verticalAlign: "middle" }}>
                                  {data.accepted ? (
                                    <button
                                      type="button"
                                      class="btn btn-fill btn-danger btn-sm"
                                      style={{ borderRadius: 5 }}
                                      onClick={() => handleDelete(data._id)}
                                    >
                                      <i class="fas fa-trash pr-2"></i>
                                      Delete
                                    </button>
                                  ) : (
                                    <button
                                      type="button"
                                      class="btn btn-fill btn-primary btn-sm"
                                      style={{ borderRadius: 5 }}
                                      onClick={() => handleEdit(data)}
                                    >
                                      <i class="fas fa-edit pr-2"></i>
                                      Edit
                                    </button>
                                  )}
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
                        <th>PaymentGateway</th>
                        <th>Coin</th>
                        <th>Rupee</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Created At</th>
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
      <AgencyRedeemDialog />
    </Fragment>
  );
};

export default connect(null, { getRedeem, deleteRedeem })(AgencyRedeemTable);
