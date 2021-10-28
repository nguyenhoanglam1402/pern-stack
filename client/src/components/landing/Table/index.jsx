import React from "react";
import { Table, Space, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";

const CustomizeTable = ({ title, dataSourse, columns }) => {
  return (
    <div>
      <h1>{title}</h1>
      <Table
        dataSource={dataSourse}
        columns={columns}
        loading={false}
        bordered={true}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default CustomizeTable;
