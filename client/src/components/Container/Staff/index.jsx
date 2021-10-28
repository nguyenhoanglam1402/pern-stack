import HomePage from "pages/Home";
import TrainerComponent from "pages/Trainer";
import React from "react";
import { Route } from "react-router";
import Footer from "../../common/Footer";
import Navigator from "../../common/Navigator";
import "./styles.css";

const StaffContainer = () => {
  return (
    <div className="staff-container">
      <Navigator />
      <Route path="/admin/home" component={HomePage} />
      <Route path="/admin/course" component={HomePage} />
      <Route path="/admin/trainer" component={TrainerComponent} />
      <Route path="/admin/trainee" component={HomePage} />
      <Footer />
    </div>
  );
};

export default StaffContainer;
