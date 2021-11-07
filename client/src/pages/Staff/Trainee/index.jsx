import { UserOutlined } from "@ant-design/icons";
import { Button, Space, Form, Input } from "antd";
import {
  deleteTraineeAPI,
  fetchAllTrainee,
  searchTraineeAPI,
} from "api/index.test";
import StaffAssignTraineeDialog from "components/landing/Staff/StaffAssignTraineeDialog";
import TraineeChangePasswordDialog from "components/landing/Staff/StaffChangePasswordDialog";
import StaffTraineeDialog from "components/landing/Staff/StaffTraineeDialog";
import CustomizeTable from "components/landing/Table";
import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";

const TraineePage = () => {
  const [traineeData, setTraineeData] = useState([]);
  const [refreshData, setRefresh] = useState(0);
  const [isPopUp, setPopUp] = useState(false);
  const [isAssignTraineePopUp, setAssignTraineePopUp] = useState(false);
  const [choice, setChoice] = useState([]);
  const [isChangePasswordPopUp, setChangePasswordPopUp] = useState(false);
  const history = useHistory();
  const columns = [
    {
      title: "Fullname",
      dataIndex: "fullname",
      key: "fullname",
      render: (content) => (
        <Space size="middle">
          <UserOutlined style={{ fontSize: "20px" }} />
          {content}
        </Space>
      ),
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Education",
      dataIndex: "education",
      key: "education",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="middle" key={record.key}>
          <Button type="primary" onClick={(e) => onUpdate(record)}>
            Update
          </Button>
          <Button type="primary" onClick={(e) => onAssignClick(record)}>
            Assign
          </Button>
          <Button
            type="primary"
            onClick={(e) => deleteTrainee(record.id)}
            danger={true}
          >
            Delete
          </Button>
          <Button type="primary" onClick={(e) => onPasswordChangeClick(record)}>
            Change Password
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    fetchAllTrainee()
      .then((respond) => {
        console.log("Respond: ", respond);
        const data = respond.map((item, index) => ({
          ...item,
          key: index,
          education: item.Trainee.education,
          year: item.Trainee.year,
        }));
        setTraineeData(data);
      })
      .catch((error) => console.error(error.message));
  }, [refreshData]);

  console.log(refreshData);
  const searchTrainee = async (value) => {
    searchTraineeAPI(value)
      .then((respond) => {
        console.log(respond);
        const dataTable = respond.map((item, index) => ({
          ...item,
          key: index,
          education: item.Trainee.education,
        }));
        setTraineeData(dataTable);
      })
      .catch((error) => console.error(error.message));
  };

  const onUpdate = async (record) => {
    history.push({
      pathname: `/staff/trainee/update/${record.id}`,
      state: record,
    });
  };

  const deleteTrainee = async (id) => {
    deleteTraineeAPI(id)
      .then((respond) => {
        setRefresh((oldState) => oldState + 1);
        console.log(respond);
      })
      .catch((error) => console.error(error.message));
  };

  const onAssignClick = (record) => {
    setChoice(record);
    setAssignTraineePopUp(true);
  };

  const onPasswordChangeClick = (record) => {
    console.log("UID: ", record.id);
    setChoice(record);
    setChangePasswordPopUp(true);
  };
  console.log(traineeData);
  return (
    <div className="container">
      <Form style={{ padding: "10px" }} onFinish={searchTrainee}>
        <h1>Search Trainee</h1>
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Please enter the name" }]}
        >
          <Input style={{ width: "30%" }} placeholder="Trainee name" />
        </Form.Item>
        <Form.Item
          name="age"
          rules={[{ required: true, message: "Please enter the age" }]}
        >
          <Input style={{ width: "30%" }} placeholder="Trainee age" />
        </Form.Item>
        <Space size="middle">
          <Button type="primary" htmlType="submit">
            Search
          </Button>
          <Button
            type="primary"
            onClick={(e) => setRefresh((oldState) => oldState + 1)}
          >
            Refresh
          </Button>
          <Button type="primary" onClick={(e) => setPopUp(true)}>
            Add new
          </Button>
        </Space>
      </Form>
      <CustomizeTable
        title="Trainee List"
        dataSource={traineeData}
        columns={columns}
      />
      <StaffTraineeDialog trigger={isPopUp} setTrigger={setPopUp} />
      <StaffAssignTraineeDialog
        data={choice}
        trigger={isAssignTraineePopUp}
        setTrigger={setAssignTraineePopUp}
      />
      <TraineeChangePasswordDialog
        trigger={isChangePasswordPopUp}
        setTrigger={setChangePasswordPopUp}
        id={choice.id}
      />
    </div>
  );
};

export default TraineePage;
