import CustomizeTable from "components/landing/Table";
import React from "react";
import { Space, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";

const TrainerComponent = () => {
  const dataSource = [
    {
      name: "Bùi Xuân Huấn",
      age: 25,
      specialty: "Tiến sĩ",
    },
    {
      name: "Thành Võ",
      age: 21,
      specialty: "Tiến sĩ",
    },
    {
      name: "Bùi Thị Minh Nguyệt",
      age: 20,
      specialty: "Tiến sĩ",
    },
    {
      name: "Phạm Trung Nam",
      age: 25,
      specialty: "Tiến sĩ",
    },
    {
      name: "Thành Võ",
      age: 21,
      specialty: "Tiến sĩ",
    },
    {
      name: "Bùi Thị Minh Nguyệt",
      age: 20,
      specialty: "Tiến sĩ",
    },
    {
      name: "Phạm Trung Nam",
      age: 25,
      specialty: "Tiến sĩ",
    },
    {
      name: "Thành Võ",
      age: 21,
      specialty: "Tiến sĩ",
    },
    {
      name: "Bùi Thị Minh Nguyệt",
      age: 20,
      specialty: "Tiến sĩ",
    },
    {
      name: "Phạm Trung Nam",
      age: 25,
      specialty: "Tiến sĩ",
    },
  ];
  const columns = [
    {
      title: "Fullname",
      dataIndex: "name",
      key: "name",
      render: (content) => (
        <Space size="middle">
          <UserOutlined style={{ fontSize: "20px" }} />
          {content}
        </Space>
      ),
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Specialty",
      dataIndex: "specialty",
      key: "specialty",
    },
    {
      title: "Actions",
      key: "action",
      render: () => (
        <Space size="middle">
          <Button type="primary">Assign for course</Button>
        </Space>
      ),
    },
  ];
  return (
    <div className="container">
      <CustomizeTable
        title="Trainer List"
        dataSourse={dataSource}
        columns={columns}
      />
    </div>
  );
};

export default TrainerComponent;
