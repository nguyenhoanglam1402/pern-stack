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
  });
  return props.trigger ? (
    <div className="dialog-background">
      <div className="dialog-row">
        <div className="dialog-panel">
          <Form>
            <Form.Item name="name">
              <Input placeholder="Course Name" />
            </Form.Item>
            <Form.Item name="description">
              <Input placeholder="Course Description" />
            </Form.Item>
            <Select onChange={(value) => setChoice(value)}>
              {categories.map((item) => (
                <Select.Option value={item.name}>{item.name}</Select.Option>
              ))}
            </Select>
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
