import CustomizeTable from "components/landing/Table";
import React from "react";
import { useLocation } from "react-router";

const ViewDetail = () => {
  const location = useLocation();

  const columns = [
    {
      title: "Fullname",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
  ];
  return (
    <div>
      <CustomizeTable />
    </div>
  );
};

export default ViewDetail;
