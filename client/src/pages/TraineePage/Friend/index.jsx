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
      dataIndex: "desciption",
      key: "desciption",
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <Space size="middle">
          <Button type="primary">Classmate</Button>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    viewCourseOfTrainee(store)
      .then((respond) => {
        const dataSource = respond.map((item, index) => ({
          course: item.Class.Course.name,
          desciption: item.Class.Course.description,
        }));
        setData(dataSource);
      })
      .catch((error) => console.error(error.message));
  }, []);

  const onSearchFriends = (store, courseName) => {
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
