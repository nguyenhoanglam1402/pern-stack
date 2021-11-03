import CustomizeTable from "components/landing/Table";
import React, { useEffect, useState } from "react";
import { Space, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { fetchTrainerList } from "api/index.test";
import TrainerAssignDialog from "components/landing/Staff/StaffTrainerDialog";

const TrainerComponent = () => {
  const [data, setData] = useState([]);
  const [popUp, setPopUp] = useState(false);
  const [trainerInfor, setTrainerInfor] = useState({});
  const columns = [
    {
      title: "Fullname",
      dataIndex: "fullname",
      key: "fullname",
      render: (content) => (
        <Space size="middle">
          <UserOutlined style={{ fontSize: "20px" }} />
          {content}
        </Space>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
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
      render: (record) => {
        return (
          <Space size="middle" key={record.key}>
            <Button type="primary" onClick={(e) => onAssignDialog(record)}>
              Assign for course
            </Button>
          </Space>
        );
      },
    },
  ];

  const onAssignDialog = (record) => {
    setTrainerInfor(record);
    setPopUp(true);
  };

  useEffect(() => {
    fetchTrainerList()
      .then((data) => {
        const dataTable = data.map((item, index) => {
          return {
            ...item,
            specialty: item.Trainer.specialty,
            key: index,
          };
        });
        console.log(dataTable);
        setData(dataTable);
      })
      .catch((error) => console.error(error));
  }, []);

  console.log(data);
  return (
    <div className="container">
      <CustomizeTable
        title="Trainer List"
        dataSource={data}
        columns={columns}
      />
      <TrainerAssignDialog
        trigger={popUp}
        setTrigger={setPopUp}
        trainerInfor={trainerInfor}
      />
    </div>
  );
};

export default TrainerComponent;
