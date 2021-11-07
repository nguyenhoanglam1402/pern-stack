import { Button, Space, Form, Input, Select } from "antd";
import {
  createNewClass,
  deleteClass,
  fetchClassByCourse,
  fetchTrainerList,
} from "api/index.test";
import { data } from "autoprefixer";
import CustomizeTable from "components/landing/Table";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

const ClassPage = (_) => {
  const [dataSource, setDataSource] = useState([]);
  const { courseName } = useParams();
  const [refresh, setRefresh] = useState(0);
  const [onForm, setOnForm] = useState(false);
  const [trainers, setTrainer] = useState([]);
  const [isSuccess, setSuccess] = useState(false);
  useEffect(() => {
    fetchClassByCourse(courseName)
      .then((data) => {
        const dataSource = data.map((item, index) => ({
          ...item,
          trainerName: item.Trainer.Account.fullname,
        }));
        setDataSource(dataSource);
      })
      .catch((error) => console.error(error.message));
  }, [refresh, courseName]);

  useEffect(() => {
    fetchTrainerList().then((respond) => {
      console.log(respond);
      setTrainer(respond);
    });
  }, []);

  console.log("Here: ", dataSource);
  const columns = [
    {
      title: "Class Name",
      dataIndex: "ClassName",
      key: "name",
    },
    {
      title: "Trainer Name",
      dataIndex: "trainerName",
      key: "trainerName",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Button type="primary" danger={true} onClick={(e) => onDelete(record)}>
          Delete
        </Button>
      ),
    },
  ];

  const onAddClass = () => {
    setOnForm(true);
  };

  const onDelete = (record) => {
    deleteClass(record.ClassID)
      .then((data) => {
        alert("Delete successfully!");
        setRefresh((preState) => preState + 1);
      })
      .catch((error) => console.error(error.message));
  };

  const onSubmit = (value) => {
    const data = { ...value, courseName: courseName };
    createNewClass(data)
      .then((data) => {
        setSuccess(true);
        setRefresh((preState) => preState + 1);
      })
      .catch((error) => {
        setSuccess(false);
        alert("Class name is already existed");
      });
    console.log(data);
  };

  return (
    <div className="container">
      <CustomizeTable
        title={`Class in ${courseName} course`}
        columns={columns}
        dataSource={dataSource}
      />
      <div style={{ margin: "10px" }}>
        <Space>
          {onForm === false ? (
            <Button type="primary" onClick={(e) => onAddClass()}>
              Add Class
            </Button>
          ) : (
            <Button
              type="primary"
              onClick={(e) => setOnForm(false)}
              danger={true}
            >
              Cancel
            </Button>
          )}
        </Space>
      </div>
      {onForm ? (
        <Form onFinish={onSubmit}>
          <h1>Add class to {courseName}</h1>
          <Form.Item name="name">
            <Input placeholder="Class Name" />
          </Form.Item>
          <Form.Item name="trainerID">
            <Select>
              {trainers.map((item, index) => (
                <Select.Option value={item.id}>{item.fullname}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Button htmlType="submit">Submit</Button>
        </Form>
      ) : null}
    </div>
  );
};

export default ClassPage;
