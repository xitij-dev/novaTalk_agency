import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";

//redux
import { connect, useSelector } from "react-redux";
import { getProfile } from "../store/admin/action";

import { getCountry } from "../store/country/action";

import { getReportedUser } from "../store/reportUser/action";

//components

import CountryTable from "../Components/Table/CountryTable";
import ReportUserTable from "../Components/Table/ReportUserTable";
import ViewReportUserTable from "../Components/Table/ViewReportUserTable";

import HostTable from "../Components/Table/HostTable";
import ProfilePage from "./Profile";

import DashboardPage from "./Dashboard";
import Navbar from "../Components/Navbar/Navbar";
import RedeemTable from "../Components/Table/RedeemTable";
import AcceptedRedeemTable from "../Components/Table/AcceptedRedeemTable";
import Spinner from "../Components/Spinner";
import HostAnalytic from "../Components/Table/HostAnalytic";
import AgencyRedeemTable from "../Components/Table/AgencyRedeemTable";
import PendingComplainTable from "../Components/Table/PendingComplainTable";
import SolvedComplainTable from "../Components/Table/SolvedComplainTable";
import PendingRequestTable from "../Components/Table/PendingHostRequestTable";

import { getSetting } from "../store/setting/action";
import { getCoinDetail } from "../store/agencyRedeem/action";

const Admin = (props) => {
  const location = useRouteMatch();
  const history = useHistory();

  const agency = useSelector((state) => state.admin.user);

  useEffect(() => {
    if (history.location.pathname === "/admin") {
      history.push("/admin/dashboard");
    }
  }, []);

  (() => {
    if (window.localStorage) {
      if (history.location.pathname === "/admin") {
        history.push("/admin/dashboard");
      }

      if (!localStorage.getItem("firstLoad")) {
        localStorage["firstLoad"] = true;
        window.location.reload(true);
      }
    }
  })();

  useEffect(() => {
    props.getCountry();
    props.getSetting();
    props.getReportedUser();
    props.getProfile();
    props.getCoinDetail(agency.id);
  }, []);

  // console.log(location.path);
  return (
    <Fragment>
      <div
        id="main-wrapper"
        data-theme="light"
        data-layout="vertical"
        data-navbarbg="skin6"
        data-sidebartype="full"
        data-sidebar-position="fixed"
        data-header-position="fixed"
        data-boxed-layout="full"
      >
        <Navbar />
        {/* </div> */}
        <div class="page-wrapper" style={{ display: "block" }}>
          <Switch>
            <Route
              path={`${location.path}/dashboard`}
              exact
              component={DashboardPage}
            />
            <Route
              path={`${location.path}/country`}
              exact
              component={CountryTable}
            />

            <Route path={`${location.path}/host`} exact component={HostTable} />
            <Route
              path={`${location.path}/host/analytic/:id`}
              exact
              component={HostAnalytic}
            />
            <Route
              path={`${location.path}/request`}
              exact
              component={PendingRequestTable}
            />
            <Route
              path={`${location.path}/report`}
              exact
              component={ReportUserTable}
            />
            <Route
              exact
              path={`${location.path}/report/:id`}
              component={ViewReportUserTable}
            />

            <Route
              path={`${location.path}/redeem`}
              exact
              component={RedeemTable}
            />
            <Route
              path={`${location.path}/agencyRedeem`}
              exact
              component={AgencyRedeemTable}
            />
            <Route
              path={`${location.path}/redeem_/accepted`}
              exact
              component={AcceptedRedeemTable}
            />

            <Route
              path={`${location.path}/profile`}
              exact
              component={ProfilePage}
            />
            <Route
              path={`${location.path}/complain`}
              exact
              component={PendingComplainTable}
            />
            <Route
              path={`${location.path}/complain_/solved`}
              exact
              component={SolvedComplainTable}
            />
          </Switch>
          <Spinner />
        </div>
      </div>
    </Fragment>
  );
};

export default connect(null, {
  getCountry,
  getSetting,
  getReportedUser,
  getProfile,
  getCoinDetail,
})(Admin);

export const state = "https://dev.digicean.com/api/clientpackagechk";
