import React, { Fragment, useState, useEffect } from "react";

//alert
import { permissionError } from "../../util/alert";

//redux
import { useSelector, useDispatch, connect } from "react-redux";
import { CLOSE_HOST_DIALOG } from "../../store/host/types";
import { createNewHost, editHost } from "../../store/host/action";

//server path
import { baseURL } from "../../util/serverPath";

//custom css
import "../../dist/css/style.min.css";
import "../../dist/css/style.css";

//custom javascript
import "../../dist/js/custom.min.js";
import "../../dist/js/app-style-switcher";
import "../../dist/js/sidebarmenu";
import "../../dist/js/feather.min.js";
import "../../assets/libs/perfect-scrollbar/dist/perfect-scrollbar.jquery.min.js";

//icon
import Cancel from "@material-ui/icons/Cancel";
import {
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
  Typography,
} from "@material-ui/core";

//dialog
import Dialog from "@material-ui/core/Dialog";

const HostDialog = (props) => {
  const dispatch = useDispatch();

  const { id } = useSelector((state) => state.admin.user);
  const { dialog: open, dialogData, host } = useSelector((state) => state.host);

  const [imageData, setImageData] = useState(null);
  const [imagePath, setImagePath] = useState(null);
  const [mongoId, setMongoId] = useState("");
  const [name, setName] = useState("");
  // const [username, setUserName] = useState("");
  const [bio, setBio] = useState("");

  const [password, setPassword] = useState({
    value: "",
    show: false,
  });
  const [hostId, setHostId] = useState("");

  const [errors, setError] = useState({
    hostId: "",
    password: "",
    name: "",
    image: "",
    // username: "",
    bio: "",
  });

  useEffect(() => {
    if (dialogData) {
      setMongoId(dialogData?._id);
      setHostId(dialogData?.hostId);
      setPassword({ value: dialogData?.password });
      setName(dialogData?.name);
      setImagePath(dialogData?.image);
      // setUserName(dialogData.username);
      setBio(dialogData.bio);
    }
  }, [dialogData]);

  const removeImage = () => {
    setImageData(null);
    setImagePath(null);
  };

  useEffect(
    () => () => {
      setError({
        hostId: "",
        password: "",
        name: "",
        image: "",
        // username: "",
        bio: "",
      });
      setMongoId("");
      setHostId("");
      setPassword("");
      setName("");

      // setUserName("");
      setBio("");

      setImageData(null);
      setImagePath(null);
    },
    [open]
  );

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

  const handleShowPassword = () => {
    setPassword({ ...password, show: !password.show });
  };

  const createHostId = () => {
    const randomChars = "0123456789";
    let hostId_ = "";
    for (let i = 0; i < 10; i++) {
      hostId_ += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length)
      );
      setHostId(hostId_);
    }
  };

  const createPassword = () => {
    const randomChars = "0123456789";
    let pass = "";
    for (let i = 0; i < 10; i++) {
      pass += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length)
      );
      setPassword({ value: pass });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !password.value || !hostId) {
      const errors = {};
      if (!name) {
        errors.name = "Name can't be a blank!";
      }
      // if (!username) {
      //   errors.username = "User Name can't be a blank!";
      // }
      if (!password.value) {
        errors.password = "Password can't be a blank!";
      }
      if (!hostId) {
        errors.hostId = "Host Id can't be a blank!";
      }

      if (!imageData || !imagePath) {
        errors.image = "Please select an Image!";
      }

      return setError({ ...errors });
    }

    if (hostId.toString().length > 10)
      return setError({
        ...errors,
        hostId: "Maximum 10 Digits are Allowed!",
      });
    if (hostId.toString().length < 10)
      return setError({
        ...errors,
        hostId: "Minimum 10 Digits are Allowed!",
      });

    if (password.value.toString().length > 10)
      return setError({
        ...errors,
        password: "Maximum 10 Digits are Allowed!",
      });
    if (password.value.toString().length < 10)
      return setError({
        ...errors,
        password: "Minimum 10 Digits are Allowed!",
      });

    if (!mongoId) {
      const index = host.findIndex((host) => host.hostId === hostId);
      if (index > -1) {
        return setError({ ...errors, hostId: "Host Id already exist." });
      }
      if (!imageData || !imagePath) {
        return setError({ ...errors, image: "Please select an Image!" });
      }
    } else {
      const index = host.find((host) => host.hostId === hostId);
      if (index !== undefined) {
        if (index._id === mongoId) {
        } else {
          return setError({ ...errors, hostId: "Host Id already exist." });
        }
      }
      if (!imageData && !imagePath) {
        return setError({ ...errors, image: "Please select an Image!" });
      }
    }

    const formData = new FormData();
    formData.append("hostId", hostId);
    formData.append("password", password.value);
    formData.append("name", name);
    formData.append("image", imageData);
    formData.append("username", name);
    formData.append("bio", bio);
    formData.append("agencyId", id);

    if (mongoId) {
      props.editHost(formData, mongoId);
    } else {
      props.createNewHost(formData);
    }
  };

  const closePopup = () => {
    dispatch({ type: CLOSE_HOST_DIALOG });
  };

  return (
    <Fragment>
      <Dialog
        open={open}
        aria-labelledby="responsive-dialog-title"
        onClose={closePopup}
        disableBackdropClick
        disableEscapeKeyDown
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="responsive-dialog-title" style={{ marginLeft: 20 }}>
          Host
        </DialogTitle>

        <IconButton
          style={{
            position: "absolute",
            right: 0,
            color: "#5E72E4",
          }}
        >
          <Tooltip title="Close">
            <Cancel onClick={closePopup} />
          </Tooltip>
        </IconButton>
        <DialogContent>
          <div class="modal-body pt-1 px-1 pb-3">
            <div class="d-flex flex-column text-center">
              <form>
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group">
                      <label class="float-left">Name</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Enter Name"
                        required
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);

                          if (!e.target.value) {
                            return setError({
                              ...errors,
                              name: "Name can't be a blank!",
                            });
                          } else {
                            return setError({
                              ...errors,
                              name: "",
                            });
                          }
                        }}
                      />
                      {errors.name && (
                        <div class="pl-1 text-left">
                          <Typography variant="caption" color="error">
                            {errors.name}
                          </Typography>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* <div class="col-md-6">
                    <div class="form-group">
                      <label class="float-left">UserName</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Enter Username"
                        required
                        value={username}
                        onChange={(e) => {
                          setUserName(e.target.value);

                          if (!e.target.value) {
                            return setError({
                              ...errors,
                              username: "User Name can't be a blank!",
                            });
                          } else {
                            return setError({
                              ...errors,
                              username: "",
                            });
                          }
                        }}
                      />
                      {errors.username && (
                        <div class="pl-1 text-left">
                          <Typography variant="caption" color="error">
                            {errors.username}
                          </Typography>
                        </div>
                      )}
                    </div>
                  </div> */}
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group">
                      <label class="float-left">Image</label>
                      <input
                        class="form-control"
                        type="file"
                        required=""
                        onChange={handleInputImage}
                      />
                      {errors.image && (
                        <div class="pl-1 text-left">
                          <Typography variant="caption" color="error">
                            {errors.image}
                          </Typography>
                        </div>
                      )}
                      <div className="row mb-0 ml-2">
                        {imagePath && (
                          <Fragment>
                            <img
                              src={imagePath}
                              class="mt-3 rounded float-left mb-2"
                              height="50px"
                              width="50px"
                            />
                            {/* <div
                              class="img-container"
                              style={{
                                display: "inline",
                                position: "relative",
                                float: "left",
                              }}
                            >
                              <i
                                class="fas fa-times-circle material-icons remove_img text-primary"
                                style={{
                                  position: "absolute",
                                  right: "-6px",
                                  top: "10px",
                                  cursor: "pointer",
                                }}
                                onClick={removeImage}
                              ></i>
                            </div> */}
                          </Fragment>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form-group ">
                  <label class="float-left">Bio</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter bio"
                    required
                    value={bio}
                    onChange={(e) => {
                      setBio(e.target.value);

                      if (!e.target.value) {
                        return setError({
                          ...errors,
                          bio: "Bio can't be a blank!",
                        });
                      } else {
                        return setError({
                          ...errors,
                          bio: "",
                        });
                      }
                    }}
                  />
                  {errors.bio && (
                    <div class="pl-1 text-left">
                      <Typography variant="caption" color="error">
                        {errors.bio}
                      </Typography>
                    </div>
                  )}
                </div>
                <div class="row d-flex">
                  <div class="col-md-9">
                    <div class="form-group">
                      <label class="float-left">Host Id</label>
                      <input
                        type="number"
                        class="form-control"
                        placeholder="Enter host id"
                        required
                        value={hostId}
                        onChange={(e) => {
                          setHostId(e.target.value);

                          if (!e.target.value) {
                            return setError({
                              ...errors,
                              hostId: "Host Id can't be a blank!",
                            });
                          } else {
                            return setError({
                              ...errors,
                              hostId: "",
                            });
                          }
                        }}
                      />
                      {errors.hostId && (
                        <div class="pl-1 text-left">
                          <Typography variant="caption" color="error">
                            {errors.hostId}
                          </Typography>
                        </div>
                      )}
                    </div>
                  </div>

                  <div class="col-md-3 pl-0">
                    <label class="float-right text-white"> AUTO </label>

                    <button
                      type="button"
                      class="btn btn-fill btn-warning btn-sm ml-2 mt-lg-2 float-left"
                      style={{ borderRadius: 5 }}
                      onClick={createHostId}
                    >
                      Auto Generate
                    </button>
                  </div>
                </div>
                <div class="row d-flex">
                  <div class="col-md-9">
                    <div class="form-group">
                      <label class="float-left">Password</label>
                      <div class="input-group mb-3">
                        <div class="input-group-prepend">
                          <span class="input-group-text" id="basic-addon1">
                            {password.show ? (
                              <i
                                class="fas fa-eye icon"
                                onClick={handleShowPassword}
                              ></i>
                            ) : (
                              <i
                                class="fas fa-eye-slash icon"
                                onClick={handleShowPassword}
                              ></i>
                            )}
                          </span>
                        </div>
                        <input
                          type={password.show ? "number" : "password"}
                          class="form-control"
                          placeholder="Enter Password"
                          required
                          value={password.value}
                          onChange={(e) => {
                            setPassword({ value: e.target.value });

                            if (!e.target.value) {
                              return setError({
                                ...errors,
                                password: "Password can't be a blank!",
                              });
                            } else {
                              return setError({
                                ...errors,
                                password: "",
                              });
                            }
                          }}
                        />
                      </div>
                      {errors.password && (
                        <div class="pl-1 text-left">
                          <Typography variant="caption" color="error">
                            {errors.password}
                          </Typography>
                        </div>
                      )}
                    </div>
                  </div>
                  <div class="col-md-3 pl-0">
                    <label class="float-right text-white"> AUTO </label>

                    <button
                      type="button"
                      class="btn btn-fill btn-warning btn-sm ml-2 mt-lg-2 float-left"
                      style={{ borderRadius: 5 }}
                      onClick={createPassword}
                    >
                      Auto Generate
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  class="btn btn-primary btn-block btn-round"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default connect(null, { createNewHost, editHost })(HostDialog);
