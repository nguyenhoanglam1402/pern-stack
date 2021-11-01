import React, { useEffect, useState } from "react";
import { Button, Form, Space } from "antd";
import "./styles.css";
import { assignTrainerClass, fetchAllClasses } from "api/index.test";
import { Select } from "antd";

const TrainerAssignDialog = (props) => {
  const [classes, setClasses] = useState([]);
  const [choice, setChoice] = useState("");
  useEffect(() => {
    fetchAllClasses().then((data) => setClasses(data));
  }, []);

  const sendAssignRequest = async () => {
    const request = { trainerID: props.trainerInfor.id, className: choice };
    console.log(request);
    const respond = await assignTrainerClass(request);
    console.log(respond);
  };

  console.log(choice);
  return props.trigger ? (
    <div className="dialog-background">
      <div className="dialog-row">
        <div className="dialog-panel">
          <Form className="dialog">
            <h2>Trainer Assign</h2>
            <p className="alert-line">
              Note: The old Trainer will be replaced by the new trainer if the
              class already exists a trainer
            </p>
            <Form.Item>
              <Select
                defaultValue="GCD0805"
                onChange={(value) => setChoice(value)}
              >
                {classes.map((item, index) => (
                  <Select.Option key={index} value={item.name}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <h3>Review Information</h3>
            <p>Trainer ID: {props.trainerInfor.id}</p>
            <p>Trainer: {props.trainerInfor.fullname}</p>
            <p>Email: {props.trainerInfor.email}</p>
            <p>Assign to: {choice}</p>

            <Space size="middle">
              <Button type="primary" onClick={(e) => sendAssignRequest()}>
                Assign
              </Button>
              <Button
                type="default"
                className="close-button"
                onClick={(e) => props.setTrigger(false)}
              >
                Close
              </Button>
            </Space>
          </Form>
        </div>
      </div>
    </div>
  ) : null;
};

export default TrainerAssignDialog;
