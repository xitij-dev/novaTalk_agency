import React, { Fragment, useState, useEffect } from "react";

//alert
import { permissionError } from "../../util/alert";

//redux
import { useSelector, useDispatch, connect } from "react-redux";
import { CLOSE_REDEEM_ACCEPT_DIALOG } from "../../store/redeem/types";
import { acceptRedeemRequest } from "../../store/redeem/action";

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

const RedeemAcceptDialog = (props) => {
  const dispatch = useDispatch();

  const { id } = useSelector((state) => state.admin.user);
  const {
    dialog: open,
    dialogData,
    redeem,
  } = useSelector((state) => state.redeem);

  const [imageData, setImageData] = useState(null);
  const [imagePath, setImagePath] = useState(null);
  const [mongoId, setMongoId] = useState("");

  const [errors, setError] = useState({
    image: "",
  });

  useEffect(() => {
    if (dialogData) {
      setMongoId(dialogData?._id);
      setImagePath(dialogData?.image);
    }
  }, [dialogData]);

  useEffect(
    () => () => {
      setError({
        image: "",
      });
      setMongoId("");

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!imageData || !imagePath) {
      const errors = {};

      if (!imageData || !imagePath) {
        errors.image = "Please select an Image!";
      }

      return setError({ ...errors });
    }

    const formData = new FormData();

    formData.append("image", imageData);

    if (mongoId) {
      props.acceptRedeemRequest(mongoId, formData);
    }
  };

  const closePopup = () => {
    dispatch({ type: CLOSE_REDEEM_ACCEPT_DIALOG });
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
        <DialogTitle id="responsive-dialog-title">Add Image</DialogTitle>

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
                              height="70px"
                              width="70px"
                            />
                          </Fragment>
                        )}
                      </div>
                    </div>
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

export default connect(null, { acceptRedeemRequest })(RedeemAcceptDialog);
