import { Button, Form, Input, Space, Select } from "antd";
import {
  createNewCourse,
  deleteCourse,
  fetchAllCategories,
} from "api/index.test";
import React, { useEffect, useState } from "react";
import "./styles.css";

const AddCourseDialog = (props) => {
  const [categories, setCategories] = useState([]);
  const [choiceCategory, setChoiceCategory] = useState(0);

  const onSubmit = (data) => {
    const request = {
      ...data,
      categoryName: choiceCategory,
    };
    console.log(request);
    createNewCourse(request)
      .then((respond) => {
        props.setTrigger(false);
        console.log(respond);
        props.setRefresh((preState) => preState + 1);
      })
      .catch((error) => console.error(error.message));
  };

  useEffect(
    () =>
      fetchAllCategories()
        .then((data) => {
          setCategories(data);
          console.log(data);
        })
        .catch((error) => {
          console.log(error.message);
        }),
    []
  );
  return props.trigger ? (
    <div className="dialog-background">
      <div className="dialog-row">
        <div className="dialog-panel">
          <Form onFinish={onSubmit} className="dialog">
            <h1>Add Course</h1>
            <Form.Item name="name">
              <Input placeholder="Input your Course Name" />
            </Form.Item>
            <Form.Item name="description">
              <Input placeholder="Input your short description" />
            </Form.Item>
            <Form.Item>
              <Select
                onChange={(value) => setChoiceCategory(value)}
                placeholder="Category"
              >
                {categories.map((item, index) => (
                  <Select.Option value={item.name}>{item.name}</Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Space size="middle">
              <Button type="primary" htmlType="submit">
                Add
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

export default AddCourseDialog;
