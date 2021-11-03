import { Button, Form, Input, Space } from "antd";
import { changePasswordTrainee } from "api/index.test";
import React from "react";
import "./styles.css";

const TraineeChangePasswordDialog = (props) => {
  const onSubmit = (data) => {
    const request = {
      ...data,
      id: props.id,
    };
    console.log(request);
    changePasswordTrainee(request)
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

export default TraineeChangePasswordDialog;
