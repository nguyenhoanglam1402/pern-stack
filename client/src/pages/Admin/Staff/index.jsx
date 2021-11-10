import { Button, Input, Space } from "antd";
import {
  deleteSystemStaff,
  getAllStaff,
  registerStaffAndTrainer,
} from "api/AdminApi";
import StaffChangePasswordDialog from "components/landing/Admin/StaffChangePasswordDialog";
import CustomizeTable from "components/landing/Table";
import { Form } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { data } from "autoprefixer";

const StaffManagePage = () => {
  const [staffs, setStaffs] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [choiceID, setChoiceID] = useState("");
  const [onForm, setOnForm] = useState(false);
  const [refresh, setFresh] = useState(0);
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
          <Button type="primary" onClick={(e) => onUpdate(record)}>
            Update
          </Button>
          <Button
            type="primary"
            onClick={(e) => {
              setChoiceID(record.id);
              console.log("choice", choiceID);
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
    getAllStaff()
      .then((data) => setStaffs(data))
      .catch((error) => console.error(error.message));
  }, [refresh]);

  console.log(staffs);

  const onUpdate = (record) => {
    history.push({
      pathname: `/admin/staff/update/${record.id}`,
      state: record,
    });
  };

  const onAdd = (value) => {
    const requestData = {
      ...value,
      role: "Staff",
    };
    registerStaffAndTrainer(requestData)
      .then((data) => {
        alert("Register successfully!");
        setFresh((preState) => preState + 1);
      })
      .catch((error) => alert("Cannot register this account"));
  };

  const onDelete = (record) => {
    console.log(record);
    deleteSystemStaff(record.id).then((data) => {
      alert("Delete successfully");
      setFresh((preState) => preState + 1);
    });
  };

  return (
    <div className="container">
      <CustomizeTable dataSource={staffs} columns={columns} />
      <StaffChangePasswordDialog
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
          <h1>Create Staff</h1>
          <Form.Item name="fullname">
            <Input placeholder="Type staff name" />
          </Form.Item>
          <Form.Item name="email">
            <Input placeholder="Type staff email" />
          </Form.Item>
          <Form.Item name="password">
            <Input placeholder="Type staff password" />
          </Form.Item>
          <Form.Item name="age">
            <Input type="number" placeholder="Type staff age" />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      ) : null}
    </div>
  );
};

export default StaffManagePage;
