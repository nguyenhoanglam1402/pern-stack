import TraineePage from "pages/Trainee";
import TrainerComponent from "pages/Trainer";
import React from "react";
import { Route } from "react-router";
import Footer from "../../common/Footer";
import Navigator from "../../common/NavigatorAdmin";
import "./styles.css";

const AdminContainer = () => {
  return (
    <div className="staff-container">
      <Navigator />
      <Route path="/admin/trainer" component={TrainerComponent} />
      <Route path="/admin/staff" component={TraineePage} />
      <Footer />
    </div>
  );
};

export default AdminContainer;
