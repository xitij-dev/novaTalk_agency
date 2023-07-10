import React, { Fragment, useState } from "react";

//alert
import { permissionError } from "../../util/alert";

//axios
import axios from "axios";

//react router dom
import { Link, NavLink } from "react-router-dom";

//sweet alert
import { warning } from "../../util/alert";

//custom css
// import "../../dist/css/style.css";
import "../../assets/extra-libs/c3/c3.min.css";
import "../../assets/extra-libs/jvector/jquery-jvectormap-2.0.2.css";

//custom javascript
import "../../dist/js/custom.min.js";
// import "../../assets/extra-libs/c3/d3.min.js";
import "../../dist/js/app-style-switcher";
import "../../dist/js/sidebarmenu";
import "../../dist/js/feather.min.js";
import "../../assets/libs/perfect-scrollbar/dist/perfect-scrollbar.jquery.min.js";
// import "../../dist/js/pages/dashboards/dashboard1.min.js";

// import Logo from "../../assets/images/logo-icon.png";
import LogoText from "../../assets/images/logo-text.png";
import Profile from "../../assets/images/users/profile-pic.jpg";

import Logo from "../../images/logo.png";

//MUI
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  makeStyles,
  Snackbar,
  Tooltip,
  Typography,
} from "@material-ui/core";
import Cancel from "@material-ui/icons/Cancel";
import { Alert } from "@material-ui/lab";

//jquery
import $ from "jquery";

//redux
import { UNSET_ADMIN } from "../../store/admin/types";
import { useDispatch, useSelector } from "react-redux";
import { baseURL } from "../../util/serverPath";

import Team from "../../images/team-4.jpg";

const useStyles = makeStyles(() => ({
  navLink: {
    color: "#7C8798",
    fontSize: "16px",
    display: "flex",
    whiteSpace: "nowrap",
    alignItems: "center",
    lineHeight: "27px",
    opacity: "0.7",
    marginRight: "1px",
    "&.active": {
      padding: "12px 0px",
      borderRadius: "0 60px 60px 0",
      color: "#fff!important",
      background:
        "linear-gradient(to right,#8971ea,#7f72ea,#7574ea,#6a75e9,#5f76e8)",
      boxShadow: " 0 7px 12px 0 rgba(95,118,232,.21)",
      opacity: "1",
    },
  },
}));
const Navbar = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleDrawer = () => {
    $("#main-wrapper").removeClass("show-sidebar");
  };
  const hasPermission = useSelector((state) => state.admin.user.flag);

  const [imageData, setImageData] = useState(null);
  const [imagePath, setImagePath] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [openSuccess, setOpenSuccess] = useState(false);
  const [errors, setError] = useState({
    title: "",
    image: "",
    description: "",
  });

  const handleLogout = () => {
    handleDrawer();
    const data = warning();
    data
      .then((isDeleted) => {
        if (isDeleted) {
          dispatch({ type: UNSET_ADMIN });
        }
      })
      .catch((err) => console.log(err));
  };

  const admin = useSelector((state) => state.admin.user);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setError({
      title: "",
      image: "",
      description: "",
      type: "",
    });
    setTitle("");
    setDescription("");
    setImageData(null);
    setImagePath(null);
    $("#file").val("");
  };

  const handleInputImage = (e) => {
    if (e.target.files[0]) {
      setImageData(e.target.files[0]);
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        setImagePath(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) {
      const errors = {};

      if (!title) {
        errors.title = "Title can't be a blank!";
      }
      if (!description) {
        errors.description = "Description can't be a blank!";
      }

      if (!imageData || !imagePath) {
        errors.image = "Please select an Image!";
      }

      return setError({ ...errors });
    }

    if (!imageData || !imagePath) {
      return setError({ ...errors, image: "Please select an Image!" });
    }

    setError({ ...errors, image: "" });
    if (!hasPermission) return permissionError();

    const formData = new FormData();
    formData.append("image", imageData);
    formData.append("title", title);
    formData.append("description", description);

    axios
      .post("/notification/send", formData)
      .then((res) => {
        if (res.data.data === true) {
          setOpenSuccess(true);
          setOpen(false);

          setError({
            title: "",
            image: "",
            description: "",
            type: "",
          });
          setTitle("");
          setDescription("");
          setImageData(null);
          setImagePath(null);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
  };

  return (
    <Fragment>
      <Snackbar
        open={openSuccess}
        autoHideDuration={2000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSuccess} severity="success">
          <span style={{ color: "#184d47" }}>
            <b>Success!</b> Notification Send Successfully.
          </span>
        </Alert>
      </Snackbar>

      <header class="topbar" data-navbarbg="skin6">
        <nav class="navbar top-navbar navbar-expand-md">
          <div class="navbar-header" data-logobg="skin6">
            <a
              class="nav-toggler waves-effect waves-light d-block d-md-none"
              href="javascript:void(0)"
            >
              <i class="ti-menu ti-close"></i>
            </a>

            <div class="navbar-brand">
              <a href="#" class="d-flex">
                <b class="logo-icon">
                  <img
                    src={Logo}
                    alt="homepage"
                    class="dark-logo"
                    height="40"
                  />

                  <img
                    src={Logo}
                    alt="homepage"
                    class="light-logo"
                    height="40"
                  />
                </b>

                <span class="logo-text">
                  {/* <img src={LogoText} alt="homepage" class="dark-logo" /> */}
                  <h1 class="mt-4 ml-2 align-items-center">NovaTalk</h1>
                  {/* <img src={LogoText} class="light-logo" alt="homepage" /> */}
                </span>
              </a>
            </div>

            <a
              class="topbartoggler d-block d-md-none waves-effect waves-light"
              href="javascript:void(0)"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i class="ti-more"></i>
            </a>
          </div>

          <div class="navbar-collapse collapse" id="navbarSupportedContent">
            <ul class="navbar-nav float-left mr-auto ml-3 pl-1">
              {/* <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle pl-md-3 position-relative"
                  href="javascript:void(0)"
                  onClick={handleClickOpen}
                >
                  <span>
                    <i data-feather="bell" class="far fa-bell svg-icon"></i>
                  </span>
                </a>
              </li> */}
            </ul>

            {/* dialog */}

            <Dialog
              open={open}
              aria-labelledby="responsive-dialog-title"
              onClose={handleClose}
              disableBackdropClick
              disableEscapeKeyDown
              fullWidth
              maxWidth="xs"
            >
              <DialogTitle id="responsive-dialog-title">
                {"Notification"}
              </DialogTitle>

              <IconButton
                style={{
                  position: "absolute",
                  right: 0,
                  color: "#5E72E4",
                }}
              >
                <Tooltip title="Close">
                  <Cancel onClick={handleClose} />
                </Tooltip>
              </IconButton>
              <DialogContent>
                <div class="modal-body pt-1 px-1 pb-3">
                  <div class="d-flex flex-column text-center">
                    <form>
                      <div class="form-group mt-3">
                        <label class="float-left">Title</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Title"
                          required
                          value={title}
                          onChange={(e) => {
                            setTitle(e.target.value);

                            if (!e.target.value) {
                              return setError({
                                ...errors,
                                title: "Title can't be a blank!",
                              });
                            } else {
                              return setError({
                                ...errors,
                                title: "",
                              });
                            }
                          }}
                        />
                        {errors.title && (
                          <div class="pl-1 text-left">
                            <Typography variant="caption" color="error">
                              {errors.title}
                            </Typography>
                          </div>
                        )}
                      </div>
                      <div class="form-group">
                        <label class="float-left">Description</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Description"
                          required
                          value={description}
                          onChange={(e) => {
                            setDescription(e.target.value);

                            if (!e.target.value) {
                              return setError({
                                ...errors,
                                description: "Description can't be a blank!",
                              });
                            } else {
                              return setError({
                                ...errors,
                                description: "",
                              });
                            }
                          }}
                        />
                        {errors.description && (
                          <div class="pl-1 text-left">
                            <Typography variant="caption" color="error">
                              {errors.description}
                            </Typography>
                          </div>
                        )}
                      </div>

                      <div class="form-group">
                        <label class="float-left">Image</label>
                        <input
                          class="form-control"
                          type="file"
                          required=""
                          id="file"
                          onChange={handleInputImage}
                        />
                        {errors.image && (
                          <div class="pl-1 text-left">
                            <Typography variant="caption" color="error">
                              {errors.image}
                            </Typography>
                          </div>
                        )}
                        {imagePath && (
                          <div class="row pl-5">
                            <img
                              src={imagePath}
                              class="mt-3 rounded float-left"
                              height="100px"
                              width="100px"
                              alt="img"
                            />
                          </div>
                        )}
                      </div>

                      <button
                        type="button"
                        class="btn btn-primary btn-round float-right"
                        onClick={handleSubmit}
                      >
                        <i class="fas fa-paper-plane mr-2"></i> Send
                      </button>
                    </form>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <ul class="navbar-nav float-right">
              <li class="nav-item d-none d-md-block">
                <a class="nav-link" href="javascript:void(0)">
                  <form>
                    <div class="customize-input">
                      <input
                        class="form-control custom-shadow custom-radius border-0 bg-white"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                      />
                      <i class="form-control-icon" data-feather="search"></i>
                    </div>
                  </form>
                </a>
              </li>

              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="javascript:void(0)"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <img
                    src={!admin.image ? Team : baseURL + "/" + admin.image}
                    alt="user"
                    class="rounded-circle"
                    width="40"
                    height="40"
                  />
                  <span class="ml-2 d-none d-lg-inline-block">
                    <span>Hello,</span>{" "}
                    <span class="text-dark">{admin.name} </span>
                    <i data-feather="chevron-down" class="svg-icon"></i>
                  </span>
                </a>
                <div class="dropdown-menu dropdown-menu-right user-dd animated flipInY">
                  <Link to="/admin/profile" class="dropdown-item">
                    <i data-feather="user" class="svg-icon mr-2 ml-1"></i>
                    My Profile
                  </Link>

                  <div class="dropdown-divider"></div>
                  <a
                    class="dropdown-item"
                    href="javascript:void(0)"
                    onClick={handleLogout}
                  >
                    <i data-feather="power" class="svg-icon mr-2 ml-1"></i>
                    Logout
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <aside class="left-sidebar" data-sidebarbg="skin6">
        <div
          class="scroll-sidebar"
          data-sidebarbg="skin6"
          style={{ overflowY: "auto" }}
        >
          <nav class="sidebar-nav">
            <ul id="sidebarnav">
              <li class="sidebar-item" onClick={handleDrawer}>
                <NavLink
                  to="/admin/dashboard"
                  className={classes.navLink}
                  id="sidebar-link"
                >
                  <i
                    data-feather="home"
                    class="fas fa-home feather-icon pl-5 mr-3"
                  ></i>
                  <span class="hide-menu">Dashboard</span>
                </NavLink>
              </li>

              <li class="sidebar-item mt-4" onClick={handleDrawer}>
                <NavLink to="/admin/host" className={classes.navLink}>
                  <i
                    data-feather="home"
                    class="fas fa-smile feather-icon pl-5 mr-3"
                  ></i>
                  <span class="hide-menu">Host</span>
                </NavLink>
              </li>

              <li class="sidebar-item mt-4" onClick={handleDrawer}>
                <NavLink to="/admin/request" className={classes.navLink}>
                  {/* <a class="sidebar-link sidebar-link" aria-expanded="false"> */}
                  <i
                    data-feather="home"
                    class="fas fa-retweet feather-icon pl-5 mr-3"
                  ></i>
                  <span class="hide-menu">Host Request</span>
                  {/* </a> */}
                </NavLink>
              </li>

              <li class="sidebar-item mt-4" onClick={handleDrawer}>
                <NavLink to="/admin/country" className={classes.navLink}>
                  <i
                    data-feather="home"
                    class="fas fa-globe feather-icon pl-5 mr-3"
                  ></i>
                  <span class="hide-menu">Country</span>
                </NavLink>
              </li>
              <li class="sidebar-item mt-4" onClick={handleDrawer}>
                <NavLink to="/admin/agencyRedeem" className={classes.navLink}>
                  <i
                    data-feather="home"
                    class="fas fa-share-square feather-icon pl-5 mr-3"
                  ></i>
                  <span class="hide-menu">Send Redeem Request</span>
                </NavLink>
              </li>

              <li class="sidebar-item mt-3 ml-3 mb-0">
                <a
                  class="sidebar-link has-arrow"
                  href="javascript:void(0)"
                  aria-expanded="false"
                  id="arrow"
                >
                  <i
                    data-feather="grid"
                    class="fas fa-registered feather-icon mr-3"
                  ></i>
                  <span class="hide-menu">Host Redeem </span>
                </a>
                <ul
                  aria-expanded="false"
                  class="collapse  first-level base-level-line"
                  id="sub"
                >
                  <li class="sidebar-item mt-4" onClick={handleDrawer}>
                    <NavLink to="/admin/redeem" className={classes.navLink}>
                      <i
                        data-feather="home"
                        class="fas fa-registered feather-icon pl-4 mr-3"
                      ></i>
                      <span class="hide-menu">Pending Redeem</span>
                    </NavLink>
                  </li>
                  <li class="sidebar-item mt-4" onClick={handleDrawer}>
                    <NavLink
                      to="/admin/redeem_/accepted"
                      className={classes.navLink}
                    >
                      <i
                        data-feather="home"
                        class="fas fa-check-square feather-icon pl-4 mr-3"
                      ></i>
                      <span class="hide-menu">Accepted Redeem</span>
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li class="sidebar-item mt-0 ml-3 mb-0">
                <a
                  class="sidebar-link has-arrow"
                  href="javascript:void(0)"
                  aria-expanded="false"
                  id="arrow"
                >
                  <i
                    data-feather="grid"
                    class="far fa-clipboard feather-icon mr-3"
                  ></i>
                  <span class="hide-menu">Host Complain </span>
                </a>
                <ul
                  aria-expanded="false"
                  class="collapse  first-level base-level-line"
                  id="sub"
                >
                  <li class="sidebar-item mt-4" onClick={handleDrawer}>
                    <NavLink to="/admin/complain" className={classes.navLink}>
                      <i
                        data-feather="home"
                        class="far fa-clipboard feather-icon pl-4 mr-3"
                      ></i>
                      <span class="hide-menu">Pending Complain</span>
                    </NavLink>
                  </li>
                  <li class="sidebar-item mt-4" onClick={handleDrawer}>
                    <NavLink
                      to="/admin/complain_/solved"
                      className={classes.navLink}
                    >
                      <i
                        data-feather="home"
                        class="far fa-clipboard feather-icon pl-4 mr-3"
                      ></i>
                      <span class="hide-menu">Solved Complain</span>
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li class="sidebar-item mt-2 mb-2" onClick={handleDrawer}>
                <NavLink to="/admin/report" className={classes.navLink}>
                  <i
                    data-feather="home"
                    class="fas fa-id-card feather-icon pl-5 mr-3"
                  ></i>

                  <span class="hide-menu">Report User</span>
                </NavLink>
              </li>
              <li class="sidebar-item mt-4" onClick={handleDrawer}>
                <NavLink to="/admin/profile" className={classes.navLink}>
                  <i
                    data-feather="home"
                    class="fas fa-user feather-icon pl-5 mr-3"
                  ></i>
                  <span class="hide-menu">Profile</span>
                </NavLink>
              </li>

              <li
                class="sidebar-item mt-4"
                onClick={handleLogout}
                style={{ cursor: "pointer" }}
              >
                <i
                  data-feather="home"
                  class="fas fa-sign-out-alt feather-icon pl-5 mr-3"
                ></i>
                <span class="hide-menu">Logout</span>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </Fragment>
  );
};

export default Navbar;
