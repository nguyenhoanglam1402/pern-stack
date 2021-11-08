import { Button, Form, Input } from "antd";
import { updateTrainerProfile } from "api/AdminApi";
import React from "react";
import { useHistory, useLocation, useParams } from "react-router";

const UpdateTrainer = () => {
  const history = useHistory();
  const location = useLocation();
  const trainerID = useParams();
  const { fullname, age, Trainer } = location.state;
  const onSubmit = (value) => {
    const request = {
      ...value,
      id: trainerID.id,
    };
    updateTrainerProfile(request).then((data) => {
      alert(`Update ${fullname}'s Profile successfully !`);
      history.goBack();
    });
  };
  return (
    <div className="container">
      <Form onFinish={onSubmit}>
        <h1>Update {fullname}'s Infor</h1>
        <Form.Item name="fullname">
          <Input placeholder="Type trainer name here" defaultValue={fullname} />
        </Form.Item>
        <Form.Item name="age">
          <Input
            type="number"
            placeholder="Type trainer age here"
            defaultValue={age}
          />
        </Form.Item>
        <Form.Item name="specialty">
          <Input
            placeholder="Type trainer specialty here"
            defaultValue={Trainer.specialty}
          />
        </Form.Item>
        <Button htmlType="submit">Submit</Button>
      </Form>
    </div>
  );
};

export default UpdateTrainer;
