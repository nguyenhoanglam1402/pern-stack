import CustomizeTable from "components/landing/Table";
import React from "react";

const Profile = () => {
  const columns = [
    {
      title: "Fullname",
      dataIndex: "email",
      key: "email",
    },
  ];
  return (
    <div className="container">
      <CustomizeTable columns={columns} />
    </div>
  );
};

export default Profile;
