import React, { Fragment, useState, useEffect } from "react";

//alert
import { permissionError } from "../../util/alert";

//redux
import { useSelector, useDispatch, connect } from "react-redux";
import { CLOSE_REQUEST_DIALOG } from "../../store/pendingHostRequest/types";
import {
  getPendingRequest,
  acceptPendingRequest,
} from "../../store/pendingHostRequest/action";
import { getHost } from "../../store/host/action";

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

const RequestDialog = (props) => {
  const dispatch = useDispatch();
  const hasPermission = useSelector((state) => state.admin.user.flag);

  const {
    dialog: open,
    dialogData,
    request,
  } = useSelector((state) => state.request);

  const host = useSelector((state) => state.host.host);

  const [mongoId, setMongoId] = useState("");

  const [password, setPassword] = useState({
    value: "",
    show: false,
  });
  const [hostId, setHostId] = useState("");
  const [agency, setAgency] = useState("");

  const [errors, setError] = useState({
    hostId: "",
    password: "",
    agency: "",
  });

  useEffect(() => {
    props.getHost();
  }, []);

  useEffect(() => {
    if (dialogData) {
      setMongoId(dialogData?._id);
      setHostId(dialogData?.hostId);
      setPassword({ value: dialogData?.password });
      setAgency(dialogData?.agencyId !== null && dialogData?.agencyId._id);
    }
  }, [dialogData]);

  useEffect(
    () => () => {
      setError({
        hostId: "",
        password: "",
        agency: "",
      });
      setMongoId("");
      setHostId("");
      setAgency("");
      setPassword("");
    },
    [open]
  );

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
    if (!password.value || !hostId || !agency) {
      const errors = {};
      if (!password.value) {
        errors.password = "Password can't be a blank!";
      }
      if (!hostId) {
        errors.hostId = "Host Id can't be a blank!";
      }
      if (!agency) {
        errors.agency = "Agency can't be a blank!";
      }

      return setError({ ...errors });
    }
    if (agency == "Agency") {
      return setError({
        ...errors,
        agency: "Please select an Agency!",
      });
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

    const index = host.find((host) => host.hostId === hostId);
    if (index !== undefined) {
      if (index._id === mongoId) {
      } else {
        return setError({ ...errors, hostId: "Host Id already exist." });
      }
    }

    if (!hasPermission) return permissionError();

    const data = {
      hostId,
      password: password.value,
      agencyId: agency,
    };

    if (mongoId) {
      props.acceptPendingRequest(data, mongoId);
    }
  };

  const closePopup = () => {
    dispatch({ type: CLOSE_REQUEST_DIALOG });
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
        maxWidth="xs"
      >
        <DialogTitle id="responsive-dialog-title">Add Detail</DialogTitle>

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
          <div class="modal-body pt-1 px-1 pb-3 pr-1">
            <div class="d-flex flex-column text-center">
              <form>
                <div class="row d-flex">
                  <div class="col-md-8">
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

                  <div class="col-md-4 pl-0">
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
                  <div class="col-md-8">
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
                  <div class="col-md-4 pl-0">
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

export default connect(null, {
  getPendingRequest,
  getHost,
  acceptPendingRequest,
})(RequestDialog);
