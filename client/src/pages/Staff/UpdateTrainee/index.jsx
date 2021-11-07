import { Button, Form, Input } from "antd";
import { updateTraineeProfile } from "api/index.test";
import React from "react";
import { useHistory, useLocation, useParams } from "react-router";

const UpdateTrainee = () => {
  const location = useLocation();
  const { fullname, age, education, year } = location.state;
  const traineeID = useParams();
  const history = useHistory();

  const onSubmit = (value) => {
    const request = {
      ...value,
      id: traineeID.id,
    };
    console.log(request);
    updateTraineeProfile(request)
      .then((respond) => {
        alert(`Infor of ${fullname} is updated`);
        history.goBack();
      })
      .catch((error) => {
        alert(`Opps! Update fail x.x\nError: ${error.message}`);
      });
  };
  return (
    <div>
      <Form onFinish={onSubmit} style={{ width: "35%", margin: "auto" }}>
        <h1>Update {fullname}'s Information</h1>
        <Form.Item name="fullname">
          <Input placeholder="Type trainee new name" defaultValue={fullname} />
        </Form.Item>
        <Form.Item name="age">
          <Input
            type="number"
            placeholder="Type trainee new age"
            defaultValue={age}
          />
        </Form.Item>
        <Form.Item name="education">
          <Input
            placeholder="Type trainee new education"
            defaultValue={education}
          />
        </Form.Item>
        <Form.Item name="year">
          <Input
            type="date"
            placeholder="Type trainee new year"
            defaultValue={year}
          />
        </Form.Item>
        <Button htmlType="submit">Submit</Button>
      </Form>
    </div>
  );
};

export default UpdateTrainee;
