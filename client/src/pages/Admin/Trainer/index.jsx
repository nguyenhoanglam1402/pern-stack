import { Button, Space, Form, Input } from "antd";
import {
  deleteSystemStaff,
  getAllTrainer,
  registerStaffAndTrainer,
} from "api/AdminApi";
import TrainerChangePasswordDialog from "components/landing/Admin/TrainerChangePassword";
import CustomizeTable from "components/landing/Table";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

const TrainerManagePage = () => {
  const [staffs, setStaffs] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [choiceID, setChoiceID] = useState("");
  const [onForm, setOnForm] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const history = useHistory();
  const columns = [
    {
      title: "Fullname",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={(e) => {
              history.push({
                pathname: `/admin/trainer/update/${record.id}`,
                state: record,
              });
            }}
          >
            Update
          </Button>
          <Button
            type="primary"
            onClick={(e) => {
              setChoiceID(record.id);
              setTrigger(true);
            }}
          >
            Change Password
          </Button>
          <Button
            type="primary"
            danger={true}
            onClick={(e) => onDelete(record)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    getAllTrainer()
      .then((data) => setStaffs(data))
      .catch((error) => console.error(error.message));
  }, [refresh]);

  const onDelete = (record) => {
    deleteSystemStaff(record.id)
      .then((data) => setRefresh((preState) => preState + 1))
      .catch((error) => console.error(error.message));
  };

  const onAdd = (value) => {
    const requestData = {
      ...value,
      role: "Trainer",
    };
    console.log(requestData);
    registerStaffAndTrainer(requestData)
      .then((data) => alert("Register successfully!"))
      .catch((error) => alert("Cannot register this account"));
  };

  return (
    <div className="container">
      <CustomizeTable dataSource={staffs} columns={columns} />
      <TrainerChangePasswordDialog
        trigger={trigger}
        setTrigger={setTrigger}
        id={choiceID}
      />
      <Button
        type="primary"
        onClick={(e) => setOnForm((preState) => !preState)}
        danger={onForm ? true : false}
      >
        {onForm ? "Cancel" : "Add"}
      </Button>
      {onForm ? (
        <Form onFinish={onAdd}>
          <h1>Create Trainer</h1>
          <Form.Item name="fullname">
            <Input placeholder="Type trainer name" />
          </Form.Item>
          <Form.Item name="email">
            <Input placeholder="Type trainer email" />
          </Form.Item>
          <Form.Item name="password">
            <Input placeholder="Type trainer password" />
          </Form.Item>
          <Form.Item name="age">
            <Input type="number" placeholder="Type trainer age" />
          </Form.Item>
          <Form.Item name="specialty">
            <Input placeholder="Type staff specialty" />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      ) : null}
    </div>
  );
};

export default TrainerManagePage;
