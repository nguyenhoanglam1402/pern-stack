import CustomizeTable from "components/landing/Table";
import React, { useState } from "react";

const CoursePage = () => {
  const [data, setData] = useState([]);
  const columns = [
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
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
    },
  ];
  return (
    <div className="container">
      <CustomizeTable dataSource={data} columns={columns} />
    </div>
  );
};

export default CoursePage;
