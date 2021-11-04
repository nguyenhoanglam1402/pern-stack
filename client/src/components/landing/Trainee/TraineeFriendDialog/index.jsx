import { Button } from "antd";
import { viewFriends } from "api/TraineeApi";
import CustomizeTable from "components/landing/Table";
import React, { useEffect, useState } from "react";
import "./styles.css";

const TraineeFriendDialog = (props) => {
  const [data, setData] = useState([]);
  console.log(props.uid);
  const columns = [
    {
      title: "Fullname",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "Class",
      dataIndex: "className",
      key: "className",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
  ];
  console.log(props.courseName);
  useEffect(() => {
    viewFriends(props.uid, props.courseName)
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((error) => console.error(error.message));
  }, [props.uid, props.courseName]);

  const studentList = data.map((item, index) => ({
    ...item,
    traineeList: item.ListTraineeClasses,
  }));

  console.log(studentList);

  return props.trigger ? (
    <div className="dialog-background">
      <div className="dialog-row">
        <div className="dialog-panel">
          <CustomizeTable columns={columns} />
          <Button
            type="primary"
            danger={true}
            onClick={(e) => props.setTrigger(false)}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  ) : null;
};

export default TraineeFriendDialog;
