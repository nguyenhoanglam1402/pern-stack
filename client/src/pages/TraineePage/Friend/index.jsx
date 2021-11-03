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
  const [isRefresh, setRefresh] = useState(0);
  const [isOpen, setOpen] = useState(false);
  const courseColumns = [
    {
      title: "Course Name",
      dataIndex: "Course",
      key: "Course",
    },
    {
      title: "Description",
      dataIndex: "Desciption",
      key: "Desciption",
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <Space size="middle">
          <Button type="primary">Search friends</Button>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    viewCourseOfTrainee(store)
      .then((respond) => {
        const dataSource = respond.map((item, index) => ({
          Course: item.Class.Course.name,
          Desciption: item.Class.Course.description,
        }));
        setData(dataSource);
      })
      .catch((error) => console.error(error.message));
  }, [isRefresh]);
  const onSearchFriends = (store, courseName) => {
    viewFriends(store, courseName)
      .then()
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
