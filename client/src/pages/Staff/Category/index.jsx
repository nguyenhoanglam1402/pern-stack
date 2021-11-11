import { Button, Space, Form, Input } from "antd";
import {
  addCategory,
  deleteCategory,
  fetchAllCategories,
} from "api/index.test";
import CustomizeTable from "components/landing/Table";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [onForm, setForm] = useState(false);
  const history = useHistory();
  const columns = [
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      key: "description",
      render: (record) => (
        <Space size="middle" key={record.id}>
          <Button type="primary" onClick={(e) => onUpdate(record)}>
            Update
          </Button>
          <Button
            type="primary"
            danger={true}
            onClick={(e) => onDelete(record.name)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    fetchAllCategories()
      .then((respond) => {
        setCategories(respond);
      })
      .catch((error) => {
        alert(`Error: ${error.message}`);
      });
  }, [refresh]);

  const onDelete = (name) => {
    if (window.confirm(`Are you sure to remove ${name}?`)) {
      deleteCategory(name)
        .then((data) => {
          setRefresh((preState) => preState + 1);
        })
        .catch((error) => {
          alert("Cannot delete this category");
        });
    }
  };

  const onAdd = (value) => {
    console.log(value);
    addCategory(value)
      .then((data) => {
        setRefresh((preState) => preState + 1);
      })
      .catch((error) => alert(`Error ${error.message}`));
  };

  const onUpdate = (record) => {
    history.push({
      pathname: `/staff/category/update/${record.id}`,
      state: record,
    });
  };

  return (
    <div className="container">
      <CustomizeTable columns={columns} dataSource={categories} />
      <Button
        type="primary"
        onClick={(e) => setForm((preState) => !preState)}
        danger={onForm}
      >
        {onForm ? "Cancel" : "Add Category"}
      </Button>
      {onForm ? (
        <Form
          onFinish={onAdd}
          style={{ padding: "20px", margin: "auto", width: "35%" }}
        >
          <h1>Create more Category</h1>
          <Form.Item name="name">
            <Input placeholder="Type the category name here" />
          </Form.Item>
          <Form.Item name="description">
            <Input placeholder="Type the category description here" />
          </Form.Item>
          <Button htmlType="submit">Add</Button>
        </Form>
      ) : null}
    </div>
  );
};

export default CategoryPage;
