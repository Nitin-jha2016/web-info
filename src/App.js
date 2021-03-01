import React from "react";
import "./App.css";
import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login";
import queryString from "query-string";
import { createContext, useState } from "react";


export const MyContext = createContext();

function App() {
  const [token, settoken] = useState(null);
  const [tokenExpiaryDate, settokenExpiaryDate] = useState(null);
  const [isTokenExpied, setisTokenExpied] = useState(false);
  const [user, setuser] = useState(null);
  const [isAdmin, setisAdmin] = useState(false);

  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [isloading, setisloading] = useState(false);
  const [isalertOpen, setisalertOpen] = useState(false);

  const [search, setsearch] = useState("");



  //DATA
  const [siteData, setSiteData] = useState([]); 
  const [dbData, setdbData] = useState([]);
  const [empData, setempData] = useState([]);
  const [empDataRecord, setempDataRecord] = useState([])
  const [isChecked, setisChecked] = useState(false)

  //FILE
  const [selectedFile, setSelectedFile] = useState()
  const [isFilePicked, setisFilePicked] = useState(false)

  //SITE DATA
  const [id, setid] = useState("")
  const [siteUrl, setsiteUrl] = useState("");
  const [sitePath, setsitePath] = useState("");
  const [ip, setip] = useState("");
  const [sizeFolder, setsizeFolder] = useState("");
  const [operator, setoperator] = useState("");
  const [country, setcountry] = useState("");
  const [backupIp, setbackupIp] = useState("");
  const [backupSize, setbackupSize] = useState("");
  const [backupPath, setbackupPath] = useState("");
  const [sitePort, setsitePort] = useState("")
  
  //SSL Data
  const [sslData, setsslData] = React.useState([]);
  const [sslUrl, setsslUrl] = useState('')
  const [path, setpath] = useState('')
  const [sslDate, setsslDate] = useState('')

  const [ssl, setssl] = useState([]);
  const [expiredSSL, setexpiredSSL] = useState([]);

  //DB DATA 
  const [dbBackupIp, setdbBackupIp] = useState('')
  const [dbBackupPath, setdbBackupPath] = useState('')
  const [dbCountry, setdbCountry] = useState('')
  const [dbName, setdbName] = useState('')
  const [dbIp, setdbIp] = useState('')
  const [dbOperator, setdbOperator] = useState('')
  const [dbSizeOnDesti, setdbSizeOnDesti] = useState('')
  const [dbSizeOnSource, setdbSizeOnSource] = useState('')

  //EMP DATA
  const [empName, setempName] = useState('')
  const [project, setproject] = useState('') 
  const [backupDestination, setbackupDestination] = useState('')
  const [lastUpdate, setlastUpdate] = useState('')

  //EMP RECORD MODAL
  const [show, setShow] = useState(false);


  const [addDataSuccess, setaddDataSuccess] = useState(false)

  const [modalShow, setModalShow] = React.useState(false);
  const [modalType, setmodalType] = useState('')

  //CHECK IF THE USER EXISTS OR NOT
  React.useEffect(() => {
    const tk = localStorage.getItem("token");
    // console.log("FOunded token", tk);

    const tokenExDate = localStorage.getItem("tokenExpiaryDate");
    const admin = localStorage.getItem("admin");
    // console.log("Token Exp Date", tokenExDate);

    if(admin == 'admin'){
      setisAdmin(true)
    }
    const currentDateObj = new Date();
    // console.log("currentDate", currentDateObj);

    if (tk && tokenExDate) {
      let edatetrimmed = tokenExDate.substr(0, 19);
      // console.log("Expiarydate trimmed", edatetrimmed);
      let expDateObj = new Date(edatetrimmed);
      // console.log("exp date obj", expDateObj);

      if (currentDateObj < expDateObj) {
        settoken(tk);
        getSiteData(tk);
        getSslData(tk)
        
      } else {
        alert("Token Expired");
        setisTokenExpied(true);
        logOut();
      }
    }
    console.log('IS ADMIIN',isAdmin);
    // console.log('SIte Daata',siteData);
  }, [token]);

  // React.useEffect(() => {
  //     //  getSiteData(token)
  // }, [addDataSuccess])

  //LOGIN
  const handleLogIn = () => {
    // console.log("Usernme", username);

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

    fetch("https://webinfo-api.genmail.online/validate", requestOption)
      .then((res) => {
        
        return res.json();
      })
      .then((res) => {
        if(res.status !== 200){
            alert("Wrong Credientials")
        }else{
        console.log("RdgdsgES", res.data);
        
            if(res.data.member === 'admin'){
              setisAdmin(true)
              console.log('MEMBER$$$$$$$',res.data.member);
            }else{
              setisAdmin(false)
            }
        
        settoken(res.data.token);
        settokenExpiaryDate(res.data.expiration_time);
        localStorage.setItem("tokenExpiaryDate", res.data.expiration_time);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("admin", res.data.member);
        getSiteData(res.data.token);
      }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //LOG OUT
  const logOut = () => {
    // setisAdmin(false)
    settoken(null);
    settokenExpiaryDate(null);
    setssl([]);
    setexpiredSSL([]);
    localStorage.clear();
  };

  //GET DATA
  const getSiteData = (token) => {
    var requestOptions = {
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        token: token,
      },
      body: queryString.stringify({ action: 1 }),
    };

    setisloading(true);
    fetch("https://webinfo-api.genmail.online/Urls", requestOptions)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((data) => {
        // console.log('DATA',data.data.ssllist);
        // data.data.forEach((item) => {
        //   if (!item.hasOwnProperty("SSL_Date")) {

        //     item.SSL_Date = "No SSL DATE";
        //   }
        // });
        if (data) {
          setSiteData(data.data.ssllist);
          {console.log('SITE $$$$$$Data',data.data.ssllist);}
          setisloading(false);

        }

        // let mydate = new Date();
        // let currentDateString = mydate.toISOString().slice(0, 10);
        // let currentDateTime = new Date(currentDateString).getTime();

        // data.data.forEach((item) => {
        //   if (item.SSL_Date) {
        //     let sslDateTime = new Date(item.SSL_Date).getTime();
        //     let difference = sslDateTime - currentDateTime;
        //     if (difference <= 172800000 && difference >= 0) {
        //       // console.log("Hi");
        //       setssl((prev) => {
        //         let newValue = [...prev, item];
        //         return newValue;
        //       });
        //     }
        //     if (difference < 0) {
        //       // console.log("hii");
        //       setexpiredSSL((prev) => {
        //         let Value = [...prev, item];
        //         return Value;
        //       });
        //     }
        //   }
        // });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //GET SSL DATA
  const getSslData = (token)=>{
    fetch("https://webinfo-api.genmail.online/Urls", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
    body: queryString.stringify({
      action: 4
    }),
  })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then((data) => {
      // console.log('SSLData',sslData);
      console.log("SSL DATA", data.data.ssllist);
      setsslData(data.data.ssllist)
      // setaddDataSuccess(true)
      // setModalShow(false);
      setssl([])
      setexpiredSSL([])

      let mydate = new Date();
      let currentDateString = mydate.toISOString().slice(0, 10);
      let currentDateTime = new Date(currentDateString).getTime();
console.log('GEtting ssl data');
      data.data.ssllist.forEach((item) => {
        // console.log('Item', item);
        if (item.ssl_date) {
          let sslDateTime = new Date(item.ssl_date).getTime();
          let difference = sslDateTime - currentDateTime;
          if (difference <= 172800000 && difference >= 0) {
            console.log("Hi");
            setssl((prev) => {
              let newValue = [...prev, item];
              return newValue;
            });

          }
          if (difference < 0) {
            console.log("hii");
            setexpiredSSL((prev) => {
              let Value = [...prev, item];
              return Value;
            });
          }
        }
      });




      
    })
    .catch((err) => {
      console.log(err);
    });
  }


  // GET DB DATA

  const getdbData = (token) => {

    fetch("https://webinfo-api.genmail.online/Urls", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: queryString.stringify({
        action: 7
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((data) => {
        // console.log('SSLData',sslData);
        console.log("DB DATA", data.data.ssllist);
        // console.log("DB DATA",data);
        setdbData(data.data.ssllist)






        // setaddDataSuccess(true)
        // setModalShow(false);
        
      })
      .catch((err) => {
        console.log(err);
      });
    
  }

  //Get EMP DATA_TABLE
  const getempData = (token) => {

    fetch("https://webinfo-api.genmail.online/Urls", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: queryString.stringify({
        action: 10
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((data) => {
        // console.log('SSLData',sslData);
        console.log("EMP DATA", data.data);
        // console.log("DB DATA",data);
        setempData(data.data.ssllist)
        // setaddDataSuccess(true)
        // setModalShow(false);
        
      })
      .catch((err) => {
        console.log(err);
      });
    
  }


   //Get EMP RECORD DATA
   const getempDataRecord = (token,recordid,fromdate,todate) => {

    fetch("https://webinfo-api.genmail.online/Urls", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: queryString.stringify({
        action: 17,
        recordid: recordid,
        todate: todate,
        fromdate: fromdate
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((data) => {
        // console.log('SSLData',sslData);
        console.log("EMP DATA RECORD", data);
        // console.log("DB DATA",data);
        setempDataRecord(data.dataList)
        // setaddDataSuccess(true)
        // setModalShow(false);
        
      })
      .catch((err) => {
        console.log(err);
      });
    
  }

  
   //Get LATEST EMP RECORD DATA
  const getLatestEmpRecord = (token) => {

    fetch("https://webinfo-api.genmail.online/Urls", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: queryString.stringify({
        action: 20,
        recordid: id,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((data) => {
        // console.log('SSLData',sslData);
        console.log("EMP DATA RECORD$$$$", data);
        // console.log("DB DATA",data);
        setempDataRecord(data.data.dataList)
        // setaddDataSuccess(true)
        // setModalShow(false);
        
      })
      .catch((err) => {
        console.log(err);
        alert('Unable to get data')
      });
    
  }


  const insertempDataRecord = (token,id,date,emp_name,project,backup_path,worktype) => {

    let data = {
      id: `${id}`,
      date: date,
      emp_name:emp_name,
      project: project,
      backup_path: backup_path,
      worktype: worktype,
      statuscode: '1'

    }

    console.log('DATAA',data);
    fetch("https://webinfo-api.genmail.online/Urls", {
      method: "post",
      headers: {
        "Content-Type": 'application/x-www-form-urlencoded',
        // "Content-Type": 'application/json',
        token: token,
      },
      body: queryString.stringify({
        action: 18,
        addRecord: JSON.stringify(data)
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((data) => {
        if(data.status === 200){
          alert('Data inserted successfully')
        }
       else{
         alert('Unable to add data')
       }
        
      })
      .catch((err) => {
        console.log(err);
      });
    
  }


  //INSERT SITE DATA
  const insertSiteData = (
    token,
    siteUrl,
    sitePath,
    ip,
    sizeFolder,
    operator,
    country,
    backupIp,
    backupSize,
    backupPath,
    sitePort,
    isChecked
  ) => {
    const data = {
      site_url: siteUrl,
      site_path: sitePath,
      ip: ip,
      size_folder: sizeFolder,
      operator: operator,
      country: country,
      backup_ip: backupIp,
      backup_size: backupSize,
      backup_path: backupPath,
      port: sitePort,
      status: + isChecked
    };

    console.log("Data", data);

    clearInputs()


    fetch("https://webinfo-api.genmail.online/Urls", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: queryString.stringify({
        action: 2,
        addRecord: JSON.stringify(data)
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((data) => {
        // console.log("DATA", data);
        // setaddDataSuccess(true)
        getSiteData(token);
        // setModalShow(false);
        // alert('Data Added Successfully')
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

//UPDATE SITE DATA
  const updateSiteData = (

    token,
    id,
    siteUrl,
    sitePath,
    ip,
    sizeFolder,
    operator,
    country,
    backupIp,
    backupSize,
    backupPath,
    sitePort,
    isChecked
  ) => {
    const data = {
      id: id,
      site_url: siteUrl,
      site_path: sitePath,
      ip: ip,
      size_folder: sizeFolder,
      operator: operator,
      country: country,
      backup_ip: backupIp,
      backup_size: backupSize,
      backup_path: backupPath,
      port: sitePort,
      status: +isChecked
    };

    // console.log("Data", data);


    fetch("https://webinfo-api.genmail.online/Urls", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: queryString.stringify({
        action: 3,
        updateRecord: JSON.stringify(data)
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((data) => {
        console.log("DATA", data);
        // setaddDataSuccess(true)
        getSiteData(token);
        // setModalShow(false);
        // alert('Data Updated Successfully')
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const clearInputs = ()=>{
    setbackupSize('')
    setcountry('')
    setip('')
    setoperator('')
    setbackupPath('')
    setsitePath('')
    setsiteUrl('')
    setsitePath('')
    setsizeFolder('')
    setbackupIp('')
    setdbBackupIp('')
    setdbBackupPath('')
    setdbCountry('')
    setdbName('')
    setdbIp('')
    setdbOperator('')
    setdbSizeOnDesti('')
    setdbSizeOnSource('')
    setsitePort('')

    setempName('')
    setproject('')
    setlastUpdate('')
    setbackupDestination('')

    setsslUrl('');
    setpath('');
    setsslDate('');
  }


  //DELETE SITE DATA
  const deleteSiteUrl = (id) => {    
    
    fetch("https://webinfo-api.genmail.online/Urls", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: queryString.stringify({
        action: 13,
        recordid: id
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((data) => {
        getSiteData(token);
        console.log("DELETED", data);
        // setaddDataSuccess(true)
      
        // setModalShow(false);
        // alert('Data Deleted Successfully')
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //IMPORT DATA 
  const importData = (token,action,file)=>{
     
    console.log("FILLEELE",file);
    const formData = new FormData();
    formData.append('excel',file)
    formData.append('action', action)
     console.log('FILEeeeee',file);
    console.log('FORM DATA', formData);
    setisloading(true)
    fetch("https://webinfo-api.genmail.online/Upload", {
      method: "POST",
      headers: {
        token: token,
        // "Content-Type": "multipart/octet-stream",
        
      },
      body: formData
    })
      .then((res) => {
        console.log('RESPONSE IMPORT',res);
         
          return res.json();

      
       
        setisloading(false)
      })
      .then((data) => {
        console.log('DATA IMPORT',data);
        if(data.status == 200){
        if(action == '1'){
          getSiteData(token)
        }
        if(action == '2'){
          getSslData(token)
        }
        if(action == '3'){
         getdbData(token)
        }
        if(action == '4'){
          getempData(token)
        }
        alert('Data added successfully')
      }else{
        alert('Unable to add data')
      }
       
        setisloading(false)
      })
      .catch((err) => {
        alert('Unable to add data')
        console.log(err);
        setisloading(false)
      });


  }



  const filterRecords = () => {};

  // const addSslData = ()=>{
  //   fetch("http://5.189.146.57:9049/WebInfoUpdated/",requestOptions)
  // }

  // console.log("Expired SSl", expiredSSL);
  return (
    
    <MyContext.Provider
      value={{
        isAdmin,
        isChecked,
        setisChecked,
        sslData,
        getSslData,
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
        siteData,
        setSiteData,
        search,
        setsearch,
        ssl,
        setssl,
        isalertOpen,
        setisalertOpen,
        handleLogIn,
        logOut,
        expiredSSL,

        dbData,
        getdbData,
        setdbData,
        empData,
        setempData,
        getempData,

        insertSiteData,
        updateSiteData,

        id,
        setid,

        siteUrl,
        setsiteUrl,

        sitePath,
        setsitePath,

        ip,
        setip,

        sizeFolder,
        setsizeFolder,

        operator,
        setoperator,

        country,
        setcountry,

        backupIp,
        setbackupIp,

        backupSize,
        setbackupSize,

        backupPath,
        setbackupPath,

        sitePort,
        setsitePort,

        setSiteData,

        setaddDataSuccess,

        sslUrl,setsslUrl,path,setpath,sslDate,setsslDate, ssl,setssl,expiredSSL,setexpiredSSL,//SSLDATA

        dbBackupIp,setdbBackupIp,dbBackupPath,setdbBackupPath,dbCountry,setdbCountry,dbName,setdbName,dbIp,setdbIp,dbOperator,setdbOperator,dbSizeOnDesti,setdbSizeOnDesti,dbSizeOnSource,setdbSizeOnSource,//DBDATA

        empName, setempName, project, setproject, backupDestination, setbackupDestination, lastUpdate, setlastUpdate, //EMPDATA

        modalShow,
         setModalShow,

         modalType,
         setmodalType,

         clearInputs,

         deleteSiteUrl,

         selectedFile, setSelectedFile, isFilePicked,setisFilePicked,

         importData,
         show, setShow,empDataRecord,getempDataRecord ,insertempDataRecord,setempDataRecord,getLatestEmpRecord//EMP RECORD Data
      }}
    >
      <div className="App">{token ? <Dashboard /> : <Login />}</div>
    </MyContext.Provider>
  );
}

export default App;
