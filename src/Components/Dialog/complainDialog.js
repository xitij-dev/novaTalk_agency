import React, { Fragment, useState, useEffect } from "react";

//alert
import { permissionError } from "../../util/alert";

//redux
import { useSelector, useDispatch, connect } from "react-redux";
import { CLOSE_COMPLAIN_DIALOG } from "../../store/complain/types";

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
import dayjs from "dayjs";

const ComplainDialog = (props) => {
  const dispatch = useDispatch();

  const {
    dialog: open,
    dialogData,
    complain,
  } = useSelector((state) => state.complain);

  const [image, setImage] = useState(null);
  const [mongoId, setMongoId] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [coin, setCoin] = useState("");
  const [message, setMessage] = useState("");
  const [arrived, setArrived] = useState("");

  useEffect(() => {
    if (dialogData) {
      debugger;
      setMongoId(dialogData?._id);
      setImage(baseURL + "/" + dialogData?.image);
      setName(dialogData?.host_id?.name);
      setContact(dialogData?.contact);
      setMessage(dialogData?.message);
      setCoin(dialogData?.host_id?.coin);
      setArrived(dayjs(dialogData?.createdAt).format("DD MMM,YYY"));
    }
  }, [dialogData]);

  const closePopup = () => {
    dispatch({ type: CLOSE_COMPLAIN_DIALOG });
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
        <DialogTitle id="responsive-dialog-title">
          View Complain Detail
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
            <div class="d-flex flex-column">
              <div class="table-responsive">
                <table id="zero_config" class="">
                  <tr>
                    <td>
                      <label class="font-weight-bold">Image</label>
                    </td>
                    <td>
                      <label class="font-weight-bold">&nbsp;:</label>
                    </td>
                    <td>
                      <label>
                        &nbsp;
                        <a href={image} target="_blank">
                          <img
                            height="100px"
                            width="100px"
                            alt="app"
                            src={image}
                            className="p-2 m-3"
                            style={{
                              boxShadow: "0 5px 15px 0 rgb(105 103 103 / 50%)",
                              border: "2px solid #fff",
                              borderRadius: 10,
                              objectFit: "cover",
                            }}
                          />
                        </a>
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label class="font-weight-bold">Host Name</label>
                    </td>
                    <td>
                      <label class="font-weight-bold">&nbsp;:</label>
                    </td>
                    <td>
                      <label>&nbsp;{name}</label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label class="font-weight-bold">Coin</label>
                    </td>
                    <td>
                      <label class="font-weight-bold">&nbsp;:</label>
                    </td>
                    <td>
                      <label>&nbsp;{coin}</label>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ verticalAlign: "top" }}>
                      <label class="font-weight-bold">Message</label>
                    </td>
                    <td style={{ verticalAlign: "top" }}>
                      <label class="font-weight-bold">&nbsp;:</label>
                    </td>
                    <td>
                      <label>&nbsp;{message}</label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label class="font-weight-bold">Contact</label>
                    </td>
                    <td>
                      <label class="font-weight-bold">&nbsp;:</label>
                    </td>
                    <td>
                      <label>&nbsp;{contact}</label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label class="font-weight-bold">Arrived On</label>
                    </td>
                    <td>
                      <label class="font-weight-bold">&nbsp;:</label>
                    </td>
                    <td>
                      <label>&nbsp;{arrived}</label>
                    </td>
                  </tr>
                </table>
              </div>
              <button
                type="button"
                class="btn btn-primary btn-block btn-round  mt-3"
                onClick={closePopup}
              >
                Close
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default connect(null)(ComplainDialog);
