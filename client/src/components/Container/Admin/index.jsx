import StaffManagePage from "pages/Admin/Staff";
import TrainerManagePage from "pages/Admin/Trainer";
import UpdateStaff from "pages/Admin/UpdateStaff";
import UpdateTrainer from "pages/Admin/UpdateTrainer";
import React from "react";
import { Route } from "react-router";
import Footer from "../../common/Footer";
import Navigator from "../../common/NavigatorAdmin";
import "./styles.css";

const AdminContainer = () => {
  return (
    <div className="staff-container">
      <Navigator />
      <Route path="/admin/trainer" exact component={TrainerManagePage} />
      <Route path="/admin/staff" exact component={StaffManagePage} />
      <Route path="/admin/staff/update/:id" exact component={UpdateStaff} />
      <Route path="/admin/trainer/update/:id" exact component={UpdateTrainer} />
      <Footer />
    </div>
  );
};

export default AdminContainer;
