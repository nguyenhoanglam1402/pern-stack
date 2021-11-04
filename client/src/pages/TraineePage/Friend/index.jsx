import React, { useEffect, useState } from "react";
import CustomizeTable from "components/landing/Table";
import {
  viewCourseOfTrainee,
  viewFriends,
} from "../../../api/TraineeApi/index";
import { useSelector } from "react-redux";
import { Button, Space } from "antd";
const FriendView = () => {
  const store = useSelector((store) => store.authReducer);
  const [data, setData] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const courseColumns = [
    {
      title: "Course Name",
      dataIndex: "course",
      key: "course",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={(e) => {
              console.log(record);
              onShowFriends(record.course);
            }}
          >
            Classmate
          </Button>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    viewCourseOfTrainee(store.uid)
      .then((respond) => {
        const dataSource = respond.map((item, index) => ({
          course: item.Class.Course.name,
          description: item.Class.Course.description,
        }));
        setData(dataSource);
      })
      .catch((error) => console.error(error.message));
  }, []);

  const onShowFriends = (courseName) => {
    viewFriends(store.uid, courseName)
      .then((data) => {})
      .catch((error) => console.error(error));
  };

  return (
    <div className="container">
      <CustomizeTable
        title="Course List"
        dataSource={data}
        columns={courseColumns}
      />
    </div>
  );
};

export default FriendView;
