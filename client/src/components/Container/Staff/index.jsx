import CoursePage from "pages/Staff/Course";
import HomePage from "pages/Home";
import TraineePage from "pages/Staff/Trainee";
import TrainerComponent from "pages/Staff/Trainer";
import React from "react";
import { Route } from "react-router";
import Navigator from "../../common/Navigator";
import "./styles.css";
import ClassPage from "pages/Staff/Class";
import UpdateTrainee from "pages/Staff/UpdateTrainee";
import CategoryPage from "pages/Staff/Category";
import UpdateCategory from "pages/Staff/UpdateCategory";
import ClassDetail from "pages/Staff/ClassDetail";

const StaffContainer = () => {
  return (
    <div className="staff-container">
      <Navigator />
      <Route path="/staff/home" component={HomePage} />
      <Route path="/staff/course" exact component={CoursePage} />
      <Route
        path="/staff/course/classes/detail/:name"
        exact
        component={ClassDetail}
      />
      <Route
        path="/staff/course/classes/:courseName"
        exact
        component={ClassPage}
      />
      <Route path="/staff/trainer" exact component={TrainerComponent} />
      <Route path="/staff/trainee" exact component={TraineePage} />
      <Route path="/staff/category" exact component={CategoryPage} />
      <Route path="/staff/category/update/:id" component={UpdateCategory} />
      <Route path="/staff/trainee/update/:id" component={UpdateTrainee} />
    </div>
  );
};

export default StaffContainer;
