import React from "react";
import "./App.css";
import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login";
import queryString from "query-string";
import { createContext, useContext, useState } from "react";
import axios from "axios";

export const MyContext = createContext();

let date = new Date();

function App() {
  const [token, settoken] = useState(null);

  const handleLogIn = () => {
    console.log("Usernme", username);
    const requestOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: queryString.stringify({
        username: username,
        password: password,
      }),
    };

    fetch("https://webinfo.roomdekho.online/Validate", requestOption)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res.data[0], token);
        settoken(res.data[0].Token);

        console.log("token", token);
        getData(res.data[0].Token);
      }).catch(err =>{
        console.log(err);
      });
  };

  const logOut = () => {
    settoken(null);
  };

  const getData = (token) => {
    axios({
      method: "post",
      url: "https://webinfo.roomdekho.online/GetDbData",
      headers: {
        TokenAuth: token,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then(function (res) {
        console.log(res.data.data[0]);
        setdata(res.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const filterRecords = () => {};

  const [user, setuser] = useState(null);

  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [isloading, setisloading] = useState(false);
  const [isloggedIn, setisloggedIn] = useState(true);
  const [isalertOpen, setisalertOpen] = useState(false);

  const [data, setdata] = useState([]);

  const [search, setsearch] = useState("");
  const [ssl, setssl] = useState([]);

  React.useEffect(() => {
    data.forEach((item) => {
      if (item.SSl_Date) {
        let mydate = new Date()
        let currentDateString = mydate.toISOString().slice(0,10);
        
        let currentDate = new Date(currentDateString).getTime()
        console.log(currentDate);
        // let currentDate = new Date().getTime();
        console.log("Curreent Date", currentDate);
        let trimmedssldate = item.SSl_Date?.slice(0, 10);
        console.log(trimmedssldate);
        let ssldate = new Date(trimmedssldate).getTime();
        console.log("SSL DATE", ssldate);
        if (ssldate - currentDate < 172800000 && ssldate - currentDate >= 0) {
          console.log("Hiiii");

          setssl((prev) => {
            let newValue = [...prev, item];
            return newValue;
          });
        }
      }
    });
  }, [data]);

  return (
    <MyContext.Provider
      value={{
        user,
        setuser,
        token,
        settoken,
        username,
        setusername,
        password,
        setpassword,
        isloading,
        setisloading,
        data,
        setdata,
        search,
        setsearch,
        ssl,
        setssl,
        isalertOpen,
        setisalertOpen,
        handleLogIn,
        logOut,
      }}
    >
      <div className="App">{token ? <Dashboard /> : <Login />}</div>
    </MyContext.Provider>
  );
}

export default App;
