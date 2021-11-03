import { Button, Form, Input, Space } from "antd";
import { createTraineeAPI } from "api/index.test";
import React from "react";
import "./styles.css";

const StaffTraineeDialog = (props) => {
  const sendRegisterRequest = async (data) => {
    const requestData = {
      ...data,
      role: "Trainee",
    };
    console.log(requestData);
    createTraineeAPI(requestData)
      .then((data) => console.log(data))
      .catch((error) => console.error(error.message));
  };
  return props.trigger ? (
    <div className="dialog-background">
      <div className="dialog-row">
        <div className="dialog-panel">
          <Form className="dialog" onFinish={sendRegisterRequest}>
            <h2>Trainee Registrer</h2>
            <Form.Item name="email">
              <Input type="email" placeholder="Email" />
            </Form.Item>
            <Form.Item name="password">
              <Input type="password" placeholder="Password" />
            </Form.Item>
            <Form.Item name="fullname">
              <Input type="text" placeholder="Fullname" />
            </Form.Item>
            <Form.Item name="age">
              <Input type="number" placeholder="Age" />
            </Form.Item>
            <Form.Item name="education">
              <Input type="text" placeholder="Education" />
            </Form.Item>
            <Form.Item name="year">
              <Input type="date" placeholder="Year" />
            </Form.Item>
            <Space size="middle">
              <Button type="primary" htmlType="submit">
                Registry
              </Button>
              <Button type="primary" onClick={(e) => props.setTrigger(false)}>
                Cancel
              </Button>
            </Space>
          </Form>
        </div>
      </div>
    </div>
  ) : null;
};

export default StaffTraineeDialog;
