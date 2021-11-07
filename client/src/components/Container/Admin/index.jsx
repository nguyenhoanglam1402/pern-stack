import React from "react";
import { Route } from "react-router";
import Footer from "../../common/Footer";
import Navigator from "../../common/NavigatorAdmin";
import "./styles.css";

const AdminContainer = () => {
  return (
    <div className="staff-container">
      <Navigator />
      <Route path="/admin/trainer" />
      <Route path="/admin/staff" />
      <Footer />
    </div>
  );
};

export default AdminContainer;
