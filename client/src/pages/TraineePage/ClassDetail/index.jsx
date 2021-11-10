import { viewFriends } from "api/TraineeApi";
import CustomizeTable from "components/landing/Table";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router";

const ViewDetail = () => {
  const location = useLocation();
  const history = useHistory();
  const [friends, setFriend] = useState([]);
  const { uid, className } = useParams();
  useEffect(() => {
    viewFriends().then((data) => {
      setFriend(data);
    });
  });
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
