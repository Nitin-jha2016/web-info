import React from "react";
import "./Navbar.css";
import { BiLogOut } from "react-icons/bi";
import { MyContext } from "../App";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

function Navbar() {
  const {
    data,
    ssl,
    isalertOpen,
    setisalertOpen,
    logOut,
    expiredSSL,
  } = React.useContext(MyContext);

  return (
    <div className="nav-buttons">
      <div>
      {/* {console.log('SSl',ssl)} */}
      {/* {ssl.length || expiredSSL.length > 0 ? ( */}
      <Link to="/" class="btn btn-primary">
        Site URL Paths
      </Link>

      <Link to="/ssldata" class="btn btn-primary">
        SSL &nbsp;
        <span className="badge" onClick={() => setisalertOpen(!isalertOpen)}>
          {ssl.length + expiredSSL.length}
        </span>
      </Link>
      {isalertOpen && (
        <div class="alert alert-danger" role="alert">
          <h4>SSL's going expiring soon:</h4>
          <ul>
            {ssl.map((item) => {
              return <li>{item.ssl_url}</li>;
            })}
          </ul>
          <h4>Expired SSL's:</h4>
          <ul>
            {expiredSSL.map((item) => {
              return <li>{item.ssl_url}</li>;
            })}
          </ul>
        </div>
      )}
      <Link to="/dbbackup" class="btn btn-primary">
        Database Backup
      </Link>
      <Link to="/empdata" class="btn btn-primary">
        Employee Data
      </Link>
      </div>
      {/* <button type="button" class="btn btn-primary">
        Database Backup
      </button> */}
      <div>
      <button class="btn btn-danger" onClick={() => logOut()}>
        Logout <BiLogOut />
      </button>
      </div>
     
    </div>
  );
}

export default Navbar;
