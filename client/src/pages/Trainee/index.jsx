import { Button, Space, Form, Input } from "antd";
import {
  deleteTraineeAPI,
  fetchAllTrainee,
  searchTraineeAPI,
} from "api/index.test";
import CustomizeTable from "components/landing/Table";
import React, { useEffect, useState } from "react";

const TraineePage = () => {
  const [traineeData, setTraineeData] = useState([]);
  const [refreshData, setRefresh] = useState(0);
  const columns = [
    {
      title: "Fullname",
      dataIndex: "fullname",
      key: "fullname",
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
          <Button type="primary">Update</Button>
          <Button type="primary" onClick={(e) => deleteTrainee(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    fetchAllTrainee()
      .then((respond) => {
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

  const deleteTrainee = async (id) => {
    deleteTraineeAPI(id)
      .then((respond) => console.log(respond))
      .catch((error) => console.error(error.message));
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
          <Button
            type="primary"
            onClick={(e) => setRefresh((oldState) => oldState + 1)}
          >
            Add new
          </Button>
        </Space>
      </Form>
      <CustomizeTable
        title="Trainee List"
        dataSource={traineeData}
        columns={columns}
      />
    </div>
  );
};

export default TraineePage;
