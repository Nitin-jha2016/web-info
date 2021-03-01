import React from "react";
import "../Components/Dashboard.css";
import Home from "./Home";
import SSLData from "./SSLData";
import DbBackup from "./DbBackup";
import EmpData from "./EmpData";
import Navbar from "./Navbar";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="container table-container">
      <Navbar />
      <Switch>
        <Route path="/" component={Home} exact></Route>
        <Route path="/ssldata" component={SSLData}></Route>
        <Route path="/dbbackup" component={DbBackup}></Route>
        <Route path="/empdata" component={EmpData}></Route>
      </Switch>
    </div>
  );
}

export default Dashboard;
