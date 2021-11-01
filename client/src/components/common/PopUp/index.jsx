import { Button } from "antd";
import React from "react";
import "./styles.css";

const PopUpDialog = (props) => {
  return props.trigger ? (
    <div className="dialog-background">
      <div className="dialog-row">
        <div className="dialog-panel">
          {props.component}
          <Button type="primary" onClick={(e) => props.setTrigger(false)}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  ) : null;
};

export default PopUpDialog;
