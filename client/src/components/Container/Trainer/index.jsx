import React from "react";
import { Route } from "react-router";
import Footer from "../../common/Footer";
import Navigator from "../../common/NavigatorTrainer";
import "./styles.css";

const TrainerContainer = () => {
  return (
    <div className="staff-container">
      <Navigator />
      <Route path="/trainer/home" />
      <Route path="/trainer/courses" />
      <Footer />
    </div>
  );
};

export default TrainerContainer;
