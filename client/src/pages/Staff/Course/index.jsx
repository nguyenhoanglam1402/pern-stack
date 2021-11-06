import { Button, Space, Form, Input } from "antd";
import AddCourseDialog from "components/landing/Staff/StaffCourseDialog";
import StaffUpdateCourseDialog from "components/landing/Staff/StaffUpdateCourseDialog";
import CustomizeTable from "components/landing/Table";
import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router";
import {
  deleteCourse,
  fetchAllCourse,
  searchCourse,
} from "../../../api/index.test";

const CoursePage = () => {
  const [data, setData] = useState([]);
  const [isCourseAddPopUp, setCoursePopUp] = useState(false);
  const [isUpdateCoursePopUp, setUpdateCoursePopUp] = useState(false);
  const [isRefresh, setRefresh] = useState(0);
  const [isSearch, setSearchState] = useState(false);
  const [choiceCourse, setChoice] = useState();
  const history = useHistory();
  const courseColumns = [
    {
      title: "Course Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Catergoty",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <Space size="middle" key={record.id}>
          <Button
            type="primary"
            onClick={(e) => {
              console.log(record);
              history.push({
                pathname: `/staff/course/classes/${record.name}`,
              });
            }}
          >
            Classes
          </Button>
          <Button type="primary" onClick={(e) => onUpdateCourse(record)}>
            Update
          </Button>
          <Button
            type="primary"
            onClick={(e) => onDeleteCourse(record.id)}
            danger={true}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    fetchAllCourse()
      .then((respond) => {
        console.log(respond);
        const dataSource = respond.map((item, index) => ({
          ...item,
          category: item.CourseCategory.name,
        }));
        setData(dataSource);
        setSearchState(false);
      })
      .catch((error) => console.error(error.message));
  }, [isRefresh]);

  const onUpdateCourse = (record) => {
    setUpdateCoursePopUp(true);
    setChoice(record.id);
  };

  const onDeleteCourse = (id) => {
    deleteCourse(id)
      .then((data) => setRefresh((preState) => preState + 1))
      .catch((error) => console.error(error));
  };

  const onSearchCourse = (data) => {
    console.log(data);
    searchCourse(data.name)
      .then((respond) => {
        console.log(respond);
        const dataSource = {
          ...respond,
          category: respond.CourseCategory.name,
        };
        console.log(dataSource);
        setData([dataSource]);
        setSearchState(true);
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="container">
      <CustomizeTable
        title="Course List"
        dataSource={data}
        columns={courseColumns}
      />
      <Form onFinish={onSearchCourse}>
        <Form.Item name="name">
          <Input placeholder="Search" />
        </Form.Item>
      </Form>
      <Space>
        <Button type="primary" onClick={(e) => setCoursePopUp(true)}>
          Add course
        </Button>
        {isSearch ? (
          <Button
            type="dashed"
            onClick={(e) => setRefresh((preState) => preState + 1)}
          >
            Reset table
          </Button>
        ) : null}
      </Space>
      <AddCourseDialog
        trigger={isCourseAddPopUp}
        setTrigger={setCoursePopUp}
        setRefresh={setRefresh}
      />
      <StaffUpdateCourseDialog
        trigger={isUpdateCoursePopUp}
        setTrigger={setUpdateCoursePopUp}
        id={choiceCourse}
      />
    </div>
  );
};

export default CoursePage;
