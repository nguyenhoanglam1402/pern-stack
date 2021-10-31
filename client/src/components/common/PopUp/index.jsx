import React from "react";
import "./styles.css";

const PopUpDialog = (props) => {
  return props.trigger ? (
    <div className="dialog-background">
      <div className="dialog-row">
        <div className="dialog-panel">{props.component}</div>
      </div>
    </div>
  ) : null;
};

export default PopUpDialog;
