import { Button, Space } from "antd";
import AddCourseDialog from "components/landing/StaffCourseDialog";
import CustomizeTable from "components/landing/Table";
import React, { useEffect, useState } from "react";
import { deleteCourse, fetchAllCourse } from "../../api/index.test";

const CoursePage = () => {
  const [data, setData] = useState([]);
  const [isCourseAddPopUp, setCoursePopUp] = useState(false);
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
      dataIndex: "actions",
      key: "actions",
      render: (item) => (
        <Space size="middle">
          <Button type="primary">Classes</Button>
          <Button type="primary">{console.log(item)} Hehe</Button>
          <Button type="primary" onClick={(e) => onDeleteCourse(item.id)}>
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
      })
      .catch((error) => console.error(error.message));
  }, []);

  const onDeleteCourse = (id) => {
    deleteCourse()
      .then((data) => console.log("Delete successfully!", data))
      .catch((error) => console.error(error));
  };

  return (
    <div className="container">
      <CustomizeTable
        title="Course List"
        dataSource={data}
        columns={courseColumns}
      />
      <Button type="primary" onClick={(e) => setCoursePopUp(true)}>
        Add course
      </Button>
      <AddCourseDialog trigger={isCourseAddPopUp} setTrigger={setCoursePopUp} />
    </div>
  );
};

export default CoursePage;
