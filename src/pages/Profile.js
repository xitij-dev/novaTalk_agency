import React, { useState, useEffect } from "react";

//alert
import { permissionError } from "../util/alert";

//router
import { NavLink } from "react-router-dom";

//serverpath
import { baseURL } from "../util/serverPath";

//redux
import { connect, useDispatch, useSelector } from "react-redux";
import { UNSET_ADMIN } from "../store/admin/types";
import { getProfile, updateProfile } from "../store/admin/action";

//argon css
import "./css/Profile.css";

import Back from "../images/img-1.jpg";
import Team from "../images/team-4.jpg";
import {
  Avatar,
  ListItem,
  makeStyles,
  Snackbar,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles(() => ({
  avatar: {
    height: 140,
    width: 140,
    border: "3px solid #fff",
  },
}));

const ProfilePage = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  //profile
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [imageData, setImageData] = useState(null);
  const [imagePath, setImagePath] = useState(null);

  //password
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openProfileSuccess, setOpenProfileSuccess] = useState(false);
  const [oldpasssword, setOldPassword] = useState("");
  const [passsword, setPassword] = useState("");
  const [confirmPasssword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({
    old: "",
    new: "",
    confirm: "",
  });

  const { user: admin } = useSelector((state) => state.admin);

  const handleEditImage = () => {
    document.getElementById("profileImage").click();
  };

  const handleChangeImage = (e) => {
    //
    if (e.target.files[0]) {
      // console.log("picture: ", e.target.files);
      setImageData(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImagePath(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      axios
        .patch("/agency/updateImage", formData)
        .then((res) => {
          console.log(res.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    props.getProfile();
  }, []);

  useEffect(() => {
    setName(admin.name);
    setEmail(admin.email);
  }, [admin]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name,
    };

    props.updateProfile(data);
    setOpenProfileSuccess(true);
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
  };
  const handleCloseProfileSuccess = () => {
    setOpenProfileSuccess(false);
  };

  const handleCloseError = () => {
    setOpenError(false);
  };

  const submitChangePass = (e) => {
    e.preventDefault();

    if (!passsword || !oldpasssword || !confirmPasssword) {
      const errors = {};

      if (!oldpasssword) {
        errors.old = "Old password can't be a blank!";
      }
      if (!passsword) {
        errors.new = "New password can't be a blank!";
      }
      if (!confirmPasssword) {
        errors.confirm = "Confirm password can't be a blank!";
      }

      return setErrors({ ...errors });
    }
    setError("");
    if (passsword !== confirmPasssword) {
      return setError("Password & Confirm Password does not match");
    }

    axios
      .put("/agency", {
        oldPass: oldpasssword,
        password: passsword,
        confirmPass: confirmPasssword,
      })
      .then((res) => {
        setOldPassword("");
        setConfirmPassword("");
        setPassword("");
        setOpenSuccess(true);
      })
      .catch(({ response }) => {
        setOpenError(true);
      });
  };

  return (
    <div class="main-content" id="panel">
      <Snackbar
        open={openSuccess}
        autoHideDuration={1000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSuccess} severity="success">
          Password update successfully.
        </Alert>
      </Snackbar>
      <Snackbar
        open={openError}
        autoHideDuration={1000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseError} severity="error">
          Old Password does not match.
        </Alert>
      </Snackbar>
      <Snackbar
        open={openProfileSuccess}
        autoHideDuration={1000}
        onClose={handleCloseProfileSuccess}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseProfileSuccess} severity="success">
          Profile update successfully.
        </Alert>
      </Snackbar>

      <div
        class="header pb-6 d-flex align-items-center"
        id="header"
        style={{
          minHeight: "500px",
          // backgroundImage: url("../assets/img/theme/profile-cover.jpg"),
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        {/* <!-- Mask --> */}
        <span class="mask bg-gradient-default opacity-8"></span>
        {/* <!-- Header container --> */}
        <div class="container-fluid d-flex align-items-center">
          <div class="row">
            <div class="col-lg-12 col-md-12">
              <h1 class="display-2 text-white">Hello {name}</h1>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Page content --> */}
      <div class="container-fluid mt--6">
        <div class="row">
          <div class="col-xl-4 order-xl-2">
            <div class="card card-profile" id="card">
              <img src={Back} alt="Image placeholder" class="card-img-top" />
              <div class="row justify-content-center">
                <div class="col-lg-3 order-lg-2">
                  <div class="card-profile-image" onClick={handleEditImage}>
                    <input
                      name="image"
                      id="profileImage"
                      type="file"
                      hidden="hidden"
                      accept="image/*"
                      onChange={handleChangeImage}
                    ></input>
                    <Avatar
                      className={classes.avatar}
                      // class="rounded-circle"
                      src={
                        !imagePath
                          ? !admin.image
                            ? Team
                            : baseURL + "/" + admin.image
                          : imagePath
                      }
                      id="avatar"
                      // style={{ overflow: "hidden" }}
                    />

                    {/* <div class="row">
                      <div class="col-lg-12">
                        <a
                          class="btn btn-default float-right"
                          onClick={handleEditImage}
                        >
                          Edit profile
                        </a>
                      </div>
                    </div>*/}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-8 order-xl-1">
            <div class="card" id="card">
              <div class="card-header">
                <div class="row align-items-center">
                  <div class="col-8">
                    <h3 class="mb-0">Edit profile </h3>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <form>
                  <h6 class="heading-small text-muted mb-4">
                    User information
                  </h6>
                  <div class="pl-lg-4">
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group">
                          <label
                            class="form-control-label"
                            for="input-username"
                          >
                            Name
                          </label>
                          <input
                            type="text"
                            id="input-username"
                            class="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group">
                          <label class="form-control-label" for="input-email">
                            Email address
                          </label>
                          <input
                            type="email"
                            id="input-email"
                            class="form-control"
                            value={email}
                            disabled
                            // onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-12">
                      <a
                        href="#!"
                        class="btn btn-default float-right"
                        onClick={handleSubmit}
                      >
                        Edit profile
                      </a>
                    </div>
                  </div>
                  <hr class="my-4" />
                  {/* <!-- Address --> */}
                  <h6 class="heading-small text-muted mb-4">Change Password</h6>
                  <div class="pl-lg-4">
                    <div class="row">
                      <div class="col-lg-4">
                        <div class="form-group">
                          <label class="form-control-label" for="input-city">
                            Old Password
                          </label>
                          <input
                            type="password"
                            id="input-city"
                            class="form-control"
                            value={oldpasssword}
                            onChange={(e) => {
                              setOldPassword(e.target.value);
                              if (!e.target.value) {
                                return setErrors({
                                  ...errors,
                                  old: "Old password can't be a blank!",
                                });
                              } else {
                                return setErrors({ ...errors, old: "" });
                              }
                            }}
                          />
                          {errors.old && (
                            <div class="pl-1 text-left">
                              <Typography variant="caption" color="error">
                                {errors.old}
                              </Typography>
                            </div>
                          )}
                        </div>
                      </div>
                      <div class="col-lg-4">
                        <div class="form-group">
                          <label class="form-control-label" for="input-country">
                            New Password
                          </label>
                          <input
                            type="password"
                            id="input-country"
                            class="form-control"
                            value={passsword}
                            onChange={(e) => {
                              setPassword(e.target.value);
                              if (!e.target.value) {
                                return setErrors({
                                  ...errors,
                                  new: "New password can't be a blank!",
                                });
                              } else {
                                return setErrors({ ...errors, new: "" });
                              }
                            }}
                          />
                          {errors.new && (
                            <div class="pl-1 text-left">
                              <Typography variant="caption" color="error">
                                {errors.new}
                              </Typography>
                            </div>
                          )}
                        </div>
                      </div>
                      <div class="col-lg-4">
                        <div class="form-group">
                          <label class="form-control-label" for="input-country">
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            id="input-postal-code"
                            class="form-control"
                            value={confirmPasssword}
                            onChange={(e) => {
                              setConfirmPassword(e.target.value);

                              if (!e.target.value) {
                                return setErrors({
                                  ...errors,
                                  confirm: "Confirm password can't be a blank!",
                                });
                              } else {
                                return setErrors({ ...errors, confirm: "" });
                              }
                            }}
                          />
                          {errors.confirm && (
                            <div class="pl-1 text-left">
                              <Typography variant="caption" color="error">
                                {errors.confirm}
                              </Typography>
                            </div>
                          )}
                          {error && (
                            <div class="pl-1 text-left">
                              <Typography variant="caption" color="error">
                                {error}
                              </Typography>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-12">
                      <a
                        onClick={submitChangePass}
                        class="btn btn-default float-right text-white"
                      >
                        Submit
                      </a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Footer --> */}
      </div>
    </div>
  );
};

export default connect(null, { getProfile, updateProfile })(ProfilePage);
