import { Button, Form, Input, Space } from "antd";
import { changePasswordSystemStaff } from "api/AdminApi";
import React from "react";
import "./styles.css";

const TrainerChangePasswordDialog = (props) => {
  const onSubmit = (data) => {
    const request = {
      ...data,
      id: props.id,
    };
    console.log(request);
    changePasswordSystemStaff(request)
      .then((respond) => {
        props.setTrigger(false);
        console.log(respond);
      })
      .catch((error) => console.error(error.message));
  };
  return props.trigger ? (
    <div className="dialog-background">
      <div className="dialog-row">
        <div className="dialog-panel">
          <Form onFinish={onSubmit} className="dialog">
            <h1>Change Password</h1>
            <Form.Item name="newPassword">
              <Input placeholder="New password" />
            </Form.Item>
            <Space size="middle">
              <Button type="primary" htmlType="submit">
                Change
              </Button>
              <Button type="ghost" onClick={(e) => props.setTrigger(false)}>
                Cancel
              </Button>
            </Space>
          </Form>
        </div>
      </div>
    </div>
  ) : null;
};

export default TrainerChangePasswordDialog;
