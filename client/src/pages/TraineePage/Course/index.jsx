import React, { useEffect, useState } from "react";
import CustomizeTable from "components/landing/Table";
import { viewCourseOfTrainee } from "../../../api/TraineeApi/index";
import { useSelector } from "react-redux";

const CourseView = () => {
  const store = useSelector((store) => store.authReducer);
  const [data, setData] = useState([]);
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
      dataIndex: "desciption",
      key: "desciption",
    },
  ];
  useEffect(() => {
    viewCourseOfTrainee(store.uid)
      .then((respond) => {
        console.log(respond[1].Class);
        const dataSource = respond.map((item, index) => ({
          class: item.Class.name,
          course: item.Class.Course.name,
          desciption: item.Class.Course.description,
        }));
        setData(dataSource);
      })
      .catch((error) => console.error(error.message));
  }, []);
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
