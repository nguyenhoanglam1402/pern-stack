import React from "react";
import { Table } from "antd";

const CustomizeTable = ({ title, dataSource, columns }) => {
  return (
    <div>
      <h1>{title}</h1>
      <Table
        dataSource={dataSource}
        columns={columns}
        loading={false}
        bordered={true}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default CustomizeTable;
