import React, { Fragment, useState, useEffect } from "react";

//redux
import { useSelector, useDispatch, connect } from "react-redux";
import { CLOSE_REDEEM_DIALOG } from "../../store/agencyRedeem/types";
import { createRedeem, editRedeem } from "../../store/agencyRedeem/action";

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

const AgencyRedeemDialog = (props) => {
  const dispatch = useDispatch();

  const {
    dialog: open,
    dialogData,
    agencyRedeem,
    agencyCoin,
  } = useSelector((state) => state.agencyRedeem);
  const agency = useSelector((state) => state.admin.user);
  const { redeemGateway } = useSelector((state) => state.setting.setting);

  const [mongoId, setMongoId] = useState("");
  const [description, setDescription] = useState("");
  const [payment, setPayment] = useState("");
  const [paymentGateWay, setPaymentGateWay] = useState([]);

  // const payment_GateWay = redeemGateway.split(",");
  useEffect(() => {
    debugger;
    // if (payment_GateWay) {
    setPaymentGateWay(redeemGateway.split(","));
    // }
  }, []);

  const [errors, setError] = useState({
    description: "",
    payment: "",
  });

  useEffect(() => {
    if (dialogData) {
      setMongoId(dialogData?._id);
      setDescription(dialogData.description);
      setPayment(dialogData.paymentGateway);
    }
  }, [dialogData]);

  useEffect(
    () => () => {
      setError({
        description: "",
        payment: "",
      });
      setMongoId("");
      setDescription("");
      setPayment("");
    },
    [open]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !payment) {
      const errors = {};
      if (!description) {
        errors.description = "Description can't be a blank!";
      }
      if (!payment) {
        errors.payment = "Please Select Payment Gateway!";
      }

      return setError({ ...errors });
    }

    const data = {
      agency_id: agency.id,
      coin: agencyCoin.redeemCoin,
      paymentGateway: payment,
      description,
    };
    debugger;
    console.log(data);
    if (mongoId) {
      props.editRedeem(data, mongoId);
    } else {
      props.createRedeem(data);
    }
  };

  const closePopup = () => {
    dispatch({ type: CLOSE_REDEEM_DIALOG });
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
        <DialogTitle id="responsive-dialog-title">Redeem</DialogTitle>

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
                <div class="form-group ">
                  <label class="float-left">Description</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter Your Detail"
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
                <div class="form-group ">
                  <label class="float-left">Payment GateWay</label>

                  <select
                    class="form-select form-control"
                    aria-label="Default select example"
                    value={payment}
                    onChange={(e) => {
                      setPayment(e.target.value);

                      if (!e.target.value) {
                        return setError({
                          ...errors,
                          payment: "Please select a payment!",
                        });
                      } else if (e.target.value == "Select Payment") {
                        return setError({
                          ...errors,
                          payment: "Please select a payment!",
                        });
                      } else {
                        return setError({
                          ...errors,
                          payment: "",
                        });
                      }
                    }}
                  >
                    <option selected>Select Payment</option>
                    {paymentGateWay.map((data) => {
                      return <option value={data}>{data}</option>;
                    })}
                  </select>
                  {errors.payment && (
                    <div class="pl-1 text-left">
                      <Typography variant="caption" color="error">
                        {errors.payment}
                      </Typography>
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  class="btn btn-primary btn-block btn-round"
                  onClick={handleSubmit}
                >
                  Send Redeem
                </button>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default connect(null, { createRedeem, editRedeem })(AgencyRedeemDialog);
