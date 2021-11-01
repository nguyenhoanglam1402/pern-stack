import { Button, Form, Select, Space } from "antd";
import { assignTraineeClass, fetchAllClasses } from "api/index.test";
import React, { useEffect, useState } from "react";
import "./styles.css";

const StaffAssignTraineeDialog = (props) => {
  const [classes, setClasses] = useState([]);
  const [choice, setChoice] = useState();
  useEffect(() => {
    fetchAllClasses()
      .then((respond) => {
        setClasses(respond);
        console.log(respond);
      })
      .catch((error) => console.error(error.message));
  }, []);

  const onSubmit = () => {
    const data = {
      traineeEmail: props.data.email,
      className: choice,
    };
    assignTraineeClass(data)
      .then((respond) => {
        console.log(respond);
        props.setTrigger(false);
      })
      .catch((error) => console.error(error.message));
  };

  return props.trigger ? (
    <div className="dialog-background">
      <div className="dialog-row">
        <div className="dialog-panel">
          <Form onFinish={onSubmit}>
            <h1>Assign Trainee to Course</h1>
            <h3>Review Information</h3>
            <p>Trainee Name: {props.data.fullname}</p>
            <p>Trainee Email: {props.data.email}</p>
            <Select
              style={{ width: "30%", margin: "10px" }}
              placeholder="Class"
              onChange={setChoice}
            >
              {classes.map((item, index) => (
                <Select.Option value={item.name} key={index}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
            <div>
              <Space size="middle">
                <Button type="primary" htmlType="submit">
                  Assign
                </Button>
                <Button onClick={(e) => props.setTrigger(false)}>Cancel</Button>
              </Space>
            </div>
          </Form>
        </div>
      </div>
    </div>
  ) : null;
};

export default StaffAssignTraineeDialog;
