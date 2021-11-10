import React from "react";
import ClassPage from "pages/TraineePage/Course";
import CoursePage from "pages/TraineePage/Friend";
import HomePage from "pages/Home";
import { Route } from "react-router";
import Footer from "../../common/Footer";
import Navigator from "../../common/NavigatorTrainee";
import "./styles.css";
import ViewDetail from "pages/TraineePage/ClassDetail";
const TraineeContainer = () => {
  return (
    <div className="trainee-container">
      <Navigator />
      <Route path="/trainee/home" component={HomePage} />
      <Route path="/trainee/classes" component={ClassPage} />
      <Route path="/trainee/classes/:uid/:className" component={ViewDetail} />
      <Route path="/trainee/profile" component={HomePage} />
      <Footer />
    </div>
  );
};

export default TraineeContainer;
