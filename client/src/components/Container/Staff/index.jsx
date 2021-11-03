import NavigatorStaff from "components/common/Navigator/StaffNavigator";
import CoursePage from "pages/Course";
import HomePage from "pages/Home";
import TraineePage from "pages/Trainee";
import TrainerComponent from "pages/Trainer";
import React from "react";
import { Route } from "react-router";
import Footer from "../../common/Footer";
import "./styles.css";

const StaffContainer = () => {
  return (
    <div className="staff-container">
      <NavigatorStaff />
      <Route path="/staff/home" component={HomePage} />
      <Route path="/staff/course" component={CoursePage} />
      <Route path="/staff/course/class" component={CoursePage} />
      <Route path="/staff/trainer" component={TrainerComponent} />
      <Route path="/staff/trainee" component={TraineePage} />
      <Footer />
    </div>
  );
};

export default StaffContainer;
