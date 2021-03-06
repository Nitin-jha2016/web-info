import React from "react";
import "../Components/Login.css";
import { MdLock } from "react-icons/md";
import { MyContext } from "../App";

function Login() {
  const {
    handleLogIn,
    isLoggedin,
    token,
    settoken,
    username,
    setusername,
    password,
    setpassword,
  } = React.useContext(MyContext);
  // console.log('My Context',context);
  const SubmitHandler = (e) => {
      e.preventDefault();
    handleLogIn();
  };
  return (
    <div className="container-fluid login-container">
      <form className="login" onSubmit={SubmitHandler}>
        {/* <div className="input-group"> */}
        <MdLock className="login-icon" />
        <input
          type="text"
          class="form-control"
          placeholder="Username"
          value={username}
          onChange={(e) => setusername(e.target.value)}
        ></input>
        <input
          type="password"
          class="form-control"
          placeholder="Password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        ></input>
        <button className="btn btn-primary login-btn" type="submit">
          Log In
        </button>
        {/* </div> */}
      </form>
    </div>
  );
}

export default Login;
