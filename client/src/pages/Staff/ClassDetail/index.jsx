import { Button, Space } from "antd";
import { getTraineeInClass, kickTraineeClass } from "api/index.test";
import CustomizeTable from "components/landing/Table";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router";

const ClassDetail = () => {
  const location = useLocation();
  const history = useHistory();
  const className = useParams();
  const { trainerID } = location.state;
  const [trainees, setTrainee] = useState([]);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const request = {
      trainerID: trainerID,
      className: className.name,
    };
    console.log(request);
    getTraineeInClass(request).then((respond) => {
      const traineeList = respond.map((item, index) => ({
        ...item,
        key: index,
        fullname: item.Trainee.Account.fullname,
        id: item.Trainee.Account.id,
      }));
      setTrainee(traineeList);
      console.log(traineeList);
    });
  }, [refresh]);
  console.log(trainees);
  const onKick = (record) => {
    kickTraineeClass(record).then((data) => {
      setRefresh((preState) => preState + 1);
    });
  };
  const columns = [
    {
      title: "Student Name",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space>
          <Button type="primary" danger={true} onClick={(e) => onKick(record)}>
            Kick
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="container">
      <CustomizeTable columns={columns} dataSource={trainees} />
    </div>
  );
};

export default ClassDetail;
