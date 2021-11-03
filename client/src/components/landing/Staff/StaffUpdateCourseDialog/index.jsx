import { Button, Form, Input, Select, Space } from "antd";
import { fetchAllCategories, updateCourse } from "api/index.test";
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
  const onSubmit = (data) => {
    const request = {
      ...data,
      categoryName: choice,
      id: props.id,
    };
    updateCourse(request)
      .then((data) => console.log(data))
      .catch((error) => console.error(error.message));
  };
  return props.trigger ? (
    <div className="dialog-background">
      <div className="dialog-row">
        <div className="dialog-panel">
          <Form onFinish={onSubmit}>
            <h1>Update Course</h1>
            <Form.Item name="name">
              <Input placeholder="Course Name" />
            </Form.Item>
            <Form.Item name="description">
              <Input placeholder="Course Description" />
            </Form.Item>
            <Form.Item>
              <Select
                onChange={(value) => setChoice(value)}
                placeholder="Category"
              >
                {categories.map((item) => (
                  <Select.Option value={item.name}>{item.name}</Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Space size="middle">
              <Button type="primary" htmlType="submit">
                Submit
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

export default StaffUpdateCourseDialog;
