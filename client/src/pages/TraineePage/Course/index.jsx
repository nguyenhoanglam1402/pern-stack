import React, { useEffect, useState } from "react";
import CustomizeTable from "components/landing/Table";
import { viewCourseOfTrainee } from "../../../api/TraineeApi/index";
import { useSelector } from "react-redux";
import { Button, Space } from "antd";

const CourseView = () => {
  const store = useSelector((store) => store.authReducer);
  const [data, setData] = useState([]);
  const [onView, setOnView] = useState(false);

  const classesColumns = [
    {
      title: "Class Name",
      dataIndex: "class",
      key: "class",
    },
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
      title: "Action",
      key: "action",
      render: (record) => (
        <Button type="primary" onClick={(e) => onViewClick(record)}>
          View
        </Button>
      ),
    },
  ];
  useEffect(() => {
    viewCourseOfTrainee(store.uid)
      .then((respond) => {
        const dataSource = respond.map((item, index) => ({
          class: item.Class.name,
          course: item.Class.Course.name,
          description: item.Class.Course.description,
        }));
        setData(dataSource);
      })
      .catch((error) => console.error(error.message));
  }, [store.uid]);

  const onViewClick = (record) => {
    setOnView(true);
  };

  return (
    <div className="container">
      <CustomizeTable
        title="Class List"
        dataSource={data}
        columns={classesColumns}
      />
    </div>
  );
};

export default CourseView;
