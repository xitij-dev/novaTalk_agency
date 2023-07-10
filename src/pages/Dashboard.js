// (window, $);
import React, { Fragment, useEffect, useState } from "react";

//router
import { NavLink } from "react-router-dom";

import axios from "axios";

//redux
import { useDispatch, connect, useSelector } from "react-redux";
import { getHost } from "../store/host/action";
import { getAcceptedRedeem, getPendingRedeem } from "../store/redeem/action";
import { getReportedUser } from "../store/reportUser/action";
import { getCoinDetail } from "../store/agencyRedeem/action";
import { getSetting } from "../store/setting/action";

import Tooltip from "@material-ui/core/Tooltip";

//custom css
import "../dist/css/style.min.css";
import "../dist/css/style.css";

import $ from "jquery";

const Dashboard = (props) => {
  const dispatch = useDispatch();
  const agency = useSelector((state) => state.admin.user);
  const acceptedRedeem = useSelector((state) => state.redeem.acceptedRedeem);
  const pendingRedeem = useSelector((state) => state.redeem.pendingRedeem);
  const reportUser = useSelector((state) => state.report.report);

  const host = useSelector((state) => state.host.host);
  const coin = useSelector((state) => state.agencyRedeem.agencyCoin);

  const [data, setData] = useState(null);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    props.getHost(agency.id);
    props.getAcceptedRedeem(agency.id);
    props.getPendingRedeem(agency.id);
    props.getReportedUser(agency.id);
    props.getCoinDetail(agency.id);
    props.getSetting();
  }, []);

  useEffect(() => {
    if (agency.id) {
      axios
        .get(`/dashboard/agency/${agency.id}`)
        .then((res) => {
          debugger;
          setData(res.data.data);
        })
        .catch((error) => {
          debugger;
          console.log(error);
        });
    }
  }, [agency.id]);

  useEffect(() => {
    if (agency.id) {
      props.getHost(agency.id);
      props.getAcceptedRedeem(agency.id);
      props.getPendingRedeem(agency.id);
      props.getReportedUser(agency.id);
      props.getCoinDetail(agency.id);
    }
  }, [agency.id]);

  const copyCode = (event) => {
    debugger;
    var copyText = document.getElementById("myInput");
    var inp = document.createElement("input");
    document.body.appendChild(inp);
    inp.value = copyText.textContent;
    inp.select();
    document.execCommand("copy", false);
    inp.remove();
    setOpen(true);
  };

  return (
    <Fragment>
      <div class="page-breadcrumb">
        <div class="row">
          <div class="col-7 align-self-center">
            <h3
              class="page-title text-truncate text-dark font-weight-500 mb-1 "
              style={{ fontFamily: "Rubik,sans-serif", fontSize: "1.5rem" }}
            >
              Welcome {agency.name} !
              <Tooltip title={open ? "Copied!" : "Copy"} arrow>
                <span
                  style={{ fontSize: 18, cursor: "pointer" }}
                  className="ml-2"
                  id="myInput"
                  onClick={copyCode}
                >
                  <b>{agency.code}</b>
                </span>
              </Tooltip>
            </h3>
            <div class="d-flex align-items-center">
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb m-0 p-0">
                  <li class="breadcrumb-item">
                    <a href="index.html">Dashboard</a>
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div class="container-fluid">
        <div class="card-group row">
          <div class="card border-right mr-3 col-md-4">
            <NavLink to="/admin/host">
              <div class="card-body">
                <div class="d-flex d-lg-flex d-md-block align-items-center">
                  <div>
                    <div class="d-inline-flex align-items-center">
                      <h2 class="text-dark mb-1 font-weight-medium">
                        {host.length}
                      </h2>
                    </div>
                    <h4 class="text-muted font-weight-normal mb-0 w-100 text-truncate">
                      Host
                    </h4>
                  </div>
                  <div class="ml-auto mt-md-3 mt-lg-0">
                    <span class="opacity-7 text-muted">
                      <i
                        data-feather="user-plus"
                        class="fas fa-users fa-lg text-danger"
                      ></i>
                    </span>
                  </div>
                </div>
              </div>
            </NavLink>
          </div>
          <div class="card border-right mr-3 ">
            <NavLink to="/admin/host">
              <div class="card-body">
                <div class="d-flex d-lg-flex d-md-block align-items-center">
                  <div>
                    <div class="d-inline-flex align-items-center">
                      <h2 class="text-dark mb-1 font-weight-medium">
                        {data?.onlineHost}
                      </h2>
                    </div>
                    <h4 class="text-muted font-weight-normal mb-0 w-100 text-truncate">
                      Online Host
                    </h4>
                  </div>
                  <div class="ml-auto mt-md-3 mt-lg-0">
                    <span class="opacity-7 text-muted">
                      <i
                        data-feather="user-plus"
                        class="fas fa-user fa-lg text-primary"
                      ></i>
                    </span>
                  </div>
                </div>
              </div>
            </NavLink>
          </div>
          <div class="card border-right mr-3 ">
            <NavLink to="/admin/host">
              <div class="card-body">
                <div class="d-flex d-lg-flex d-md-block align-items-center">
                  <div>
                    <div class="d-inline-flex align-items-center">
                      <h2 class="text-dark mb-1 font-weight-medium">
                        {data?.liveHost}
                      </h2>
                    </div>
                    <h4 class="text-muted font-weight-normal mb-0 w-100 text-truncate">
                      Live Host
                    </h4>
                  </div>
                  <div class="ml-auto mt-md-3 mt-lg-0">
                    <span class="opacity-7 text-muted">
                      <i
                        data-feather="user-plus"
                        class="fas fa-user fa-lg text-success"
                      ></i>
                    </span>
                  </div>
                </div>
              </div>
            </NavLink>
          </div>
          <div class="card border-right mr-3 col-md-4">
            <NavLink to="/admin/report">
              <div class="card-body">
                <div class="d-flex d-lg-flex d-md-block align-items-center">
                  <div>
                    <div class="d-inline-flex align-items-center">
                      <h2 class="text-dark mb-1 font-weight-medium">
                        {reportUser?.length}
                      </h2>
                    </div>
                    <h4 class="text-muted font-weight-normal mb-0 w-100 text-truncate">
                      Report user
                    </h4>
                  </div>
                  <div class="ml-auto mt-md-3 mt-lg-0">
                    <span class="opacity-7 text-muted">
                      <i
                        data-feather="user-plus"
                        class="fas fa-id-card fa-lg text-warning"
                      ></i>
                    </span>
                  </div>
                </div>
              </div>
            </NavLink>
          </div>
        </div>
        <div class="card-group row">
          <div class="card border-right mr-3">
            <div class="card-body">
              <div class="d-flex d-lg-flex d-md-block align-items-center">
                <div>
                  <div class="d-inline-flex align-items-center">
                    <h2 class="text-dark mb-1 font-weight-medium">
                      {coin?.totalCoin}
                    </h2>
                  </div>
                  <h4 class="text-muted font-weight-normal mb-0 w-100 text-truncate">
                    Net Worth
                  </h4>
                </div>
                <div class="ml-auto mt-md-3 mt-lg-0">
                  <span class="opacity-7 text-muted">
                    <i
                      data-feather="user-plus"
                      class="far fa-clone fa-lg text-warning"
                    ></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="card border-right mr-3 ">
            <NavLink to="/admin/agencyRedeem">
              <div class="card-body">
                <div class="d-flex d-lg-flex d-md-block align-items-center">
                  <div>
                    <div class="d-inline-flex align-items-center">
                      <h2 class="text-dark mb-1 font-weight-medium">
                        {coin?.redeemCoin}
                      </h2>
                    </div>
                    <h4 class="text-muted font-weight-normal mb-0 w-100 text-truncate">
                      Redeem Coin
                    </h4>
                  </div>
                  <div class="ml-auto mt-md-3 mt-lg-0">
                    <span class="opacity-7 text-muted">
                      <i
                        data-feather="user-plus"
                        class="fab fa-connectdevelop fa-lg text-danger"
                      ></i>
                    </span>
                  </div>
                </div>
              </div>
            </NavLink>
          </div>
          <div class="card border-right mr-3 col-md-4">
            <NavLink to="/admin/redeem">
              <div class="card-body">
                <div class="d-flex d-lg-flex d-md-block align-items-center">
                  <div>
                    <div class="d-inline-flex align-items-center">
                      <h2 class="text-dark mb-1 font-weight-medium">
                        {pendingRedeem?.length}
                      </h2>
                    </div>
                    <h4 class="text-muted font-weight-normal mb-0 w-100 text-truncate">
                      Pending Redeem
                    </h4>
                  </div>
                  <div class="ml-auto mt-md-3 mt-lg-0">
                    <span class="opacity-7 text-muted">
                      <i
                        data-feather="user-plus"
                        class="fas fa-registered fa-lg text-primary"
                      ></i>
                    </span>
                  </div>
                </div>
              </div>
            </NavLink>
          </div>
          <div class="card border-right mr-3 col-md-4">
            <NavLink to="/admin/redeem/accepted">
              <div class="card-body">
                <div class="d-flex d-lg-flex d-md-block align-items-center">
                  <div>
                    <div class="d-inline-flex align-items-center">
                      <h2 class="text-dark mb-1 font-weight-medium">
                        {acceptedRedeem?.length}
                      </h2>
                    </div>
                    <h4 class="text-muted font-weight-normal mb-0 w-100 text-truncate">
                      Accepted Redeem
                    </h4>
                  </div>
                  <div class="ml-auto mt-md-3 mt-lg-0">
                    <span class="opacity-7 text-muted">
                      <i
                        data-feather="user-plus"
                        class="fas fa-check-square fa-lg text-success"
                      ></i>
                    </span>
                  </div>
                </div>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default connect(null, {
  getHost,
  getAcceptedRedeem,
  getPendingRedeem,
  getReportedUser,
  getCoinDetail,
  getSetting,
})(Dashboard);
