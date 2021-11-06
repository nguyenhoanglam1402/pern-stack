import { Button, Space } from "antd";
import { fetchClassByCourse } from "api/index.test";
import CustomizeTable from "components/landing/Table";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

const ClassPage = (_) => {
  const [dataSource, setDataSource] = useState([]);
  const { courseName } = useParams();
  useEffect(() => {
    fetchClassByCourse(courseName)
      .then((data) => {
        const dataSource = data.map((item, index) => ({
          ...item,
          trainerName: item.Trainer.Account.fullname,
        }));
        setDataSource(dataSource);
      })
      .catch((error) => console.error(error.message));
  }, []);
  console.log("Here: ", dataSource);
  const columns = [
    {
      title: "Class Name",
      dataIndex: "ClassName",
      key: "name",
    },
    {
      title: "Trainer Name",
      dataIndex: "trainerName",
      key: "trainerName",
    },
  ];
  return (
    <div className="container">
      <CustomizeTable
        title={`Class in ${courseName} course`}
        columns={columns}
        dataSource={dataSource}
      />
      <div style={{ margin: "10px" }}>
        <Space>
          <Button>Add Course</Button>
        </Space>
      </div>
    </div>
  );
};

export default ClassPage;
