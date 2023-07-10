// (window, $);
import React, { Fragment, useEffect, useState } from "react";

//router
import { Link } from "react-router-dom";

//dayjs
import dayjs from "dayjs";

//redux
import { connect, useSelector, useDispatch } from "react-redux";
import { getComplain, solvedComplain } from "../../store/complain/action";
import ComplainDialog from "../Dialog/complainDialog";

//types
import { OPEN_COMPLAIN_DIALOG } from "../../store/complain/types";

//custom css
import "../../dist/css/style.min.css";
import "../../dist/css/style.css";

//MUI
import { TablePagination } from "@material-ui/core";

import TablePaginationActions from "./TablePagination";
import { baseURL } from "../../util/serverPath";

const PendingComplainTable = (props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const complain = useSelector((state) => state.complain.complain);
  const { id } = useSelector((state) => state.admin.user);

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
    setData(complain);
  }, [complain]);

  useEffect(() => {
    props.getComplain("solved", id);
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toUpperCase();
    if (value) {
      const data = complain.filter((data) => {
        return (
          data?.host_id.name?.toUpperCase()?.indexOf(value) > -1 ||
          data?.contact?.toUpperCase()?.indexOf(value) > -1
        );
      });
      setData(data);
    } else {
      return setData(complain);
    }
  };
  const handleOpenComplain = (data) => {
    dispatch({ type: OPEN_COMPLAIN_DIALOG, payload: data });
  };

  return (
    <>
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
                    Solved Complain
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
                    <h3 class="card-title">Solved Complain</h3>
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
                        <th>Contact</th>
                        <th>Solved On</th>
                        <th>View Detail</th>
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
                                    <a
                                      href={baseURL + "/" + data.image}
                                      target="_blank"
                                    >
                                      <img
                                        src={baseURL + "/" + data.image}
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
                                    </a>
                                  }
                                  {data.host_id.name}
                                </td>
                                <td style={{ verticalAlign: "middle" }}>
                                  {data.host_id.coin}
                                </td>
                                <td style={{ verticalAlign: "middle" }}>
                                  {data.contact}
                                </td>

                                <td style={{ verticalAlign: "middle" }}>
                                  {dayjs(data.updatedAt).format("DD MMM, YYYY")}
                                </td>
                                <td style={{ verticalAlign: "middle" }}>
                                  <button
                                    type="button"
                                    class="btn waves-effect waves-light btn-warning btn-sm"
                                    data-toggle="modal"
                                    style={{ borderRadius: 5 }}
                                    onClick={() => handleOpenComplain(data)}
                                  >
                                    <i class="fas fa-eye"></i> View
                                  </button>
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
                        <th>Contact</th>
                        <th>Solved On</th>
                        <th>View Detail</th>
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
      <ComplainDialog />
    </>
  );
};

export default connect(null, {
  getComplain,
})(PendingComplainTable);
