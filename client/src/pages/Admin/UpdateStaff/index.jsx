import { Button, Form, Input } from "antd";
import { updateStaffProfile } from "api/AdminApi";
import React from "react";
import { useHistory, useLocation, useParams } from "react-router";

const UpdateStaff = () => {
  const history = useHistory();
  const location = useLocation();
  const staffID = useParams();
  const { fullname, age } = location.state;
  const onSubmit = (value) => {
    const request = {
      ...value,
      id: staffID,
    };
    updateStaffProfile(request).then((data) => {
      alert(`Update ${fullname}'s Profile successfully !`);
      history.goBack();
    });
  };
  return (
    <div className="container">
      <Form onFinish={onSubmit}>
        <h1>Update {fullname}'s Infor</h1>
        <Form.Item name="fullname">
          <Input placeholder="Type Staff name here" defaultValue={fullname} />
        </Form.Item>
        <Form.Item name="age">
          <Input
            type="number"
            placeholder="Type Staff age here"
            defaultValue={age}
          />
        </Form.Item>
        <Button htmlType="submit">Submit</Button>
      </Form>
    </div>
  );
};

export default UpdateStaff;
