import { Button, Form, Input } from "antd";
import { updateCategoryName } from "api/index.test";
import React from "react";
import { useLocation, useParams, useHistory } from "react-router";

const UpdateCategory = () => {
  const location = useLocation();
  const history = useHistory();
  const { id } = useParams();
  const { name, description } = location.state;
  const onSubmit = (value) => {
    const request = {
      ...value,
      id: id,
    };
    updateCategoryName(request)
      .then((data) => {
        alert(`Updated ${name} category infor`);
        history.goBack();
      })
      .catch((error) => alert(`Error: ${error.message}`));
  };

  return (
    <div className="container">
      <Form onFinish={onSubmit} style={{ width: "35%", margin: "auto" }}>
        <h1>Update {name} Category</h1>
        <Form.Item name="name">
          <Input placeholder="Type new name" defaultValue={name} />
        </Form.Item>
        <Form.Item name="description">
          <Input
            placeholder="Type new short description"
            defaultValue={description}
          />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default UpdateCategory;
