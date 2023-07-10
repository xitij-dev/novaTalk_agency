import React, { createRef } from "react";
import { BounceLoader } from "react-spinners";

// Redux
import { useSelector } from "react-redux";

// MUI
import Dialog from "@material-ui/core/Dialog";

const Spinner = () => {
  const open = useSelector((state) => state.spinner.networkProgressDialog);
  const ref = createRef();
  return (
    <Dialog
      open={open}
      disableBackdropClick
      disableEscapeKeyDown
      PaperComponent="div"
      ref={ref}
      style={{
        background: "transparent",
        boxShadow: "none",
      }}
    >
      <BounceLoader size={60} color="#3d4977" loading={open} />
    </Dialog>
  );
};

export default React.memo(Spinner);
