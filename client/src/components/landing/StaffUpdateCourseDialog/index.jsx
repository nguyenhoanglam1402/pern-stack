import { Button, Form, Input, Select } from "antd";
import { fetchAllCategories } from "api/index.test";
import React, { useEffect, useState } from "react";
import "./styles.css";

const StaffUpdateCourseDialog = (props) => {
  const [categories, setCategories] = useState([]);
  const [choice, setChoice] = useState();
  useEffect(() => {
    fetchAllCategories()
      .then((data) => setCategories(data))
      .catch((error) => console.error(error.message));
  }, []);
  const onSubmit = (data) => {};
  return props.trigger ? (
    <div className="dialog-background">
      <div className="dialog-row">
        <div className="dialog-panel">
          <Form onFinish={onSubmit}>
            <Form.Item name="name">
              <Input placeholder="Course Name" />
            </Form.Item>
            <Form.Item name="description">
              <Input placeholder="Course Description" />
            </Form.Item>
            <Form.Item>
              <Select onChange={(value) => setChoice(value)}>
                {categories.map((item) => (
                  <Select.Option value={item.name}>{item.name}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
          <Button type="primary" onClick={(e) => props.setTrigger(false)}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  ) : null;
};

export default StaffUpdateCourseDialog;
