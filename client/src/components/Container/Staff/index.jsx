import CoursePage from "pages/Staff/Course";
import HomePage from "pages/Home";
import TraineePage from "pages/Staff/Trainee";
import TrainerComponent from "pages/Staff/Trainer";
import React from "react";
import { Route } from "react-router";
import Footer from "../../common/Footer";
import Navigator from "../../common/Navigator";
import "./styles.css";

const StaffContainer = () => {
  return (
    <div className="staff-container">
      <Navigator />
      <Route path="/staff/home" component={HomePage} />
      <Route path="/staff/course" component={CoursePage} />
      <Route path="/staff/trainer" component={TrainerComponent} />
      <Route path="/staff/trainee" component={TraineePage} />
      <Footer />
    </div>
  );
};

export default StaffContainer;
