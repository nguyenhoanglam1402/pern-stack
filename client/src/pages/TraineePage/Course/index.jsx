import React, { useEffect, useState } from "react";
import CustomizeTable from "components/landing/Table";
import { viewCourseOfTrainee } from "../../../api/TraineeApi/index";
import { useSelector } from "react-redux";

const CourseView = () => {
  const store = useSelector((store) => store.authReducer);
  const [data, setData] = useState([]);
  const [isRefresh, setRefresh] = useState(0);
  const classesColumns = [
    {
      title: "Class Name",
      dataIndex: "Class",
      key: "Class",
    },
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
  ];
  useEffect(() => {
    viewCourseOfTrainee(store)
      .then((respond) => {
        console.log(respond[1].Class);
        const dataSource = respond.map((item, index) => ({
          Class: item.Class.name,
          Course: item.Class.Course.name,
          Desciption: item.Class.Course.description,
        }));
        setData(dataSource);
      })
      .catch((error) => console.error(error.message));
  }, [isRefresh]);
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
