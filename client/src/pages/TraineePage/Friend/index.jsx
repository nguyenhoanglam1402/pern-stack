import React, { useEffect, useState } from "react";
import CustomizeTable from "components/landing/Table";
import { viewCourseOfTrainee } from "../../../api/TraineeApi/index";
import { useSelector } from "react-redux";
import { Button, Space } from "antd";
import TraineeFriendDialog from "components/landing/Trainee/TraineeFriendDialog";
const FriendView = () => {
  const store = useSelector((store) => store.authReducer);
  const [data, setData] = useState([]);
  const [course, setCourseChoice] = useState("");
  const [isFriendPopUp, setFriendPopUp] = useState(false);
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
              console.log(record.course);
              onShowFriends(record.course);
            }}
          >
            Course mate
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
  }, [store.uid]);

  const onShowFriends = (courseName) => {
    setCourseChoice(courseName);
    setFriendPopUp(true);
  };

  return (
    <div className="container">
      <CustomizeTable
        title="Course List"
        dataSource={data}
        columns={courseColumns}
      />
      <TraineeFriendDialog
        trigger={isFriendPopUp}
        setTrigger={setFriendPopUp}
        courseName={course}
        uid={store.uid}
      />
    </div>
  );
};

export default FriendView;
