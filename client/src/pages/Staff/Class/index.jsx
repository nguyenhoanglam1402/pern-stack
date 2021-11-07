import { Button, Space, Form, Input, Select } from "antd";
import {
  createNewClass,
  deleteClass,
  fetchClassByCourse,
  fetchTrainerList,
} from "api/index.test";
import CustomizeTable from "components/landing/Table";
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";

const ClassPage = (_) => {
  const [dataSource, setDataSource] = useState([]);
  const { courseName } = useParams();
  const [refresh, setRefresh] = useState(0);
  const [onForm, setOnForm] = useState(false);
  const [trainers, setTrainer] = useState([]);
  const history = useHistory();
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
        <Space size="middle">
          <Button type="primary" onClick={(e) => onDetail(record)}>
            Detail
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

  const onDetail = (record) => {
    const requestData = {
      ...record,
      trainerID: record.Trainer.Account.id,
    };
    console.log(requestData);
    history.push({
      pathname: `/staff/course/classes/detail/${record.ClassName}`,
      state: requestData,
    });
  };

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
        setRefresh((preState) => preState + 1);
      })
      .catch((error) => {
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
