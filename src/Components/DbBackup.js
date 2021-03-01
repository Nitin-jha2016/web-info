import React from "react";
import "../Components/Dashboard.css";
import { MyContext } from "../App";
import styled from "styled-components";
import DataTable,{createTheme} from "react-data-table-component";
import { Modal, Button } from "react-bootstrap";
import "./Home.css";
import queryString from "query-string";


import { MdDelete } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";

import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';


const TextField = styled.input`
  height: 32px;
  width: 200px;
  border-radius: 3px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: 1px solid #e5e5e5;
  padding: 0 32px 0 16px;

  &:hover {
    cursor: pointer;
  }
`;

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
    <TextField
      id="search"
      type="text"
      placeholder="Filter By Name"
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
    />
    <button className="clear-btn" type="button" onClick={onClear}>
      X
    </button>
  </>
);

function MyVerticallyCenteredModal(props) {

 

const {isChecked,setisChecked,dbData,id,getdbData,token,dbBackupIp,setdbBackupIp,dbBackupPath,setdbBackupPath,dbCountry,setdbCountry,dbName,setdbName,dbIp,setdbIp,dbOperator,setdbOperator,dbSizeOnDesti,setdbSizeOnDesti,dbSizeOnSource,setdbSizeOnSource,modalType,clearInputs} = React.useContext(MyContext)
  
React.useEffect(()=>{
    

  if(dbData && dbData.length !== 0 && id && modalType =="edit" ){
    console.log('sslData Data',dbData);
    const filteredData = dbData.filter(data => data.id == id)
    // console.log('Filtered Data',filteredData[0]);
  if(filteredData.length !==0){
    setdbBackupIp(filteredData[0].backup_ip)
    setdbBackupPath(filteredData[0].backup_path)
    setdbCountry(filteredData[0].country)
    setdbName(filteredData[0].db_name)
    setdbIp(filteredData[0].ip)
    setdbOperator(filteredData[0].operator)
    setdbSizeOnDesti(filteredData[0].size_on_Desti)
    setdbSizeOnSource(filteredData[0].size_on_source)
    setisChecked(filteredData[0].status)
    
  }
         
  }else{
       clearInputs()
  }


},[modalType,id])

// console.log('AAAA',{
//   db_name : dbName,
//   ip: dbIp,
//   operator: dbOperator,
//   country: dbCountry,
//   size_on_source: dbSizeOnSource,
//   size_on_Desti: dbSizeOnDesti,
//   backup_path: dbBackupPath,
//   backup_ip: dbBackupIp,
// });

const updateDbData = (id,token,dbName,dbIp,dbOperator,dbCountry,dbSizeOnSource,dbSizeOnDesti,dbBackupPath,dbBackupIp,isChecked)=>{
  const data = {
    db_name : dbName,
    id: id,
    ip: dbIp,
    operator: dbOperator,
    country: dbCountry,
    size_on_source: dbSizeOnSource,
    size_on_Desti: dbSizeOnDesti,
    backup_path: dbBackupPath,
    backup_ip: dbBackupIp,
    status: +isChecked
  }

  fetch("https://webinfo-api.genmail.online/Urls", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: queryString.stringify({
        action: 9,
        updateRecord: JSON.stringify(data)
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((data) => {
        console.log("UpDATE DB DATA", data);
        getdbData(token)
        alert('Data Updated Successfully')
        
      })
      .catch((err) => {
        console.log(err);
      });
}

const insertDbData = (token,dbName,dbIp,dbOperator,dbCountry,dbSizeOnSource,dbSizeOnDesti,dbBackupPath,dbBackupIp,isChecked)=>{
    const data = {
      db_name : dbName,
      ip: dbIp,
      operator: dbOperator,
      country: dbCountry,
      size_on_source: dbSizeOnSource,
      size_on_Desti: dbSizeOnDesti,
      backup_path: dbBackupPath,
      backup_ip: dbBackupIp,
      status: +isChecked
    }

    // console.log('INSERT DB DATA',data);
https://webinfo-api.genmail.online
    fetch("https://webinfo-api.genmail.online/Urls", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: queryString.stringify({
        action: 8,
        addRecord: JSON.stringify(data)
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((data) => {
        // console.log("DBDATA", data);
        clearInputs()
        getdbData(token)
        // alert('Data Added Successfully')
        
      })
      .catch((err) => {
        console.log(err);
      });
}



  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="modal"
    >
      <Modal.Title id="contained-modal-title-vcenter">
       DB Backup Data
      </Modal.Title>

      <Modal.Body>
        <div className="row">
          <div className="form-group col-md-6">
            <label for="inputEmail4">Database Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Database Name"
              value={dbName}
              onChange={(e)=> setdbName(e.target.value)}
            ></input>
          </div>
          <div className="form-group col-md-6">
            <label for="inputPassword4">IP</label>
            <input
              type="text"
              className="form-control"
              id="inputPassword4"
              placeholder="IP"
              value={dbIp}
              onChange={(e)=> setdbIp(e.target.value)}
            ></input>
          </div>
        </div>

        <div className="row">
          <div className="form-group col-md-6">
            <label for="inputEmail4">Operator</label>
            <input
              type="text"
              className="form-control"
              id="inputEmail4"
              placeholder="Operator"
              value={dbOperator}
              onChange={(e)=>{setdbOperator(e.target.value)}}
            ></input>
          </div>
          <div className="form-group col-md-6">
            <label for="inputPassword4">Country</label>
            <input
              type="text"
              className="form-control"
              placeholder="Country"
              value={dbCountry}
              onChange={(e) => setdbCountry(e.target.value)}
            ></input>
          </div>
        </div>

        <div className="row">
          <div className="form-group col-md-6">
            <label for="inputEmail4">Backup Path</label>
            <input
              type="text"
              className="form-control"
              id="inputEmail4"
              placeholder="Backup Path<"
              value={dbBackupPath}
              onChange={(e) => setdbBackupPath(e.target.value)}
            ></input>
          </div>
          <div className="form-group col-md-6">
            <label for="inputPassword4">Backup IP</label>
            <input
              type="text"
              className="form-control"
              id="inputPassword4"
              placeholder="Backup IP"
              value={dbBackupIp}
              onChange={(e) => setdbBackupIp(e.target.value)}
            ></input>
          </div>
        </div>

        <div className="row">
          <div className="form-group col-md-6">
            <label for="inputEmail4">Size on Source</label>
            <input
              type="text"
              className="form-control"
              id="inputEmail4"
              placeholder="Size on Source"
              value={dbSizeOnSource}
              onChange={(e) => setdbSizeOnSource(e.target.value)}
            ></input>
          </div>
          <div className="form-group col-md-6">
            <label for="inputPassword4">Size on Destination</label>
            <input
              type="text"
              className="form-control"
              id="inputPassword4"
              placeholder="Size on Destination"
              value={dbSizeOnDesti}
              onChange={(e) => setdbSizeOnDesti(e.target.value)}
            ></input>
          </div>
        </div>

        <div className="row">
          <div className="form-group col-md-6 inputCheck">
            <label for="inputEmail4">Status &nbsp;</label>
            <input
              type="checkbox"
              id="inputEmail4"
              placeholder="Size on Source"
              checked={isChecked}
              onChange={() => setisChecked(!isChecked)}
            ></input>
          </div>
        </div>

      
      </Modal.Body>
      <Modal.Footer>
        {modalType == 'add' && <Button onClick={()=> {
          insertDbData(token,dbName,dbIp,dbOperator,dbCountry,dbSizeOnSource,dbSizeOnDesti,dbBackupPath,dbBackupIp,isChecked)
          props.onHide()
          }}>Save</Button>}
        {modalType == 'edit' && <Button onClick={
          ()=> {
          updateDbData(id,token,dbName,dbIp,dbOperator,dbCountry,dbSizeOnSource,dbSizeOnDesti,dbBackupPath,dbBackupIp,isChecked)
          props.onHide()
        }
          }>Update</Button>}
  
        <Button  onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function DbBackup() {
  const [modalShow, setModalShow] = React.useState(false);
  const { dbBackupData, isloading,dbData,setDbData,token,getdbData , setmodalType,setid,isAdmin,selectedFile,setSelectedFile,importData} = React.useContext(MyContext);

  React.useEffect(() =>{
    getdbData(token)
    // console.log('DBDAAAATATATA',dbData);
  },[])

  const deleteDbData = (id)=>{

    fetch("https://webinfo-api.genmail.online/Urls", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: queryString.stringify({
        action: 15,
        recordid: id
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((data) => {
        console.log("DELETED", data);
        // setaddDataSuccess(true)
        getdbData(token);
        // setModalShow(false);
        // alert('Data Deleted Successfully')
        
      })
      .catch((err) => {
        console.log(err);
      });
}


  let columns = [
    {
      name: 'db_name',
      selector: 'db_name',
      wrap: true,
      width: '170px'
    },
    {
      name: 'size_on_source',
      selector: 'size_on_source',
      wrap: true
    },
    {
      name: 'ip',
      selector: 'ip',
      wrap: true,
      width: '140px'
    },
    {
      name: 'backup_ip',
      selector: 'backup_ip',
      wrap: true,
      width: '140px'
    },
    {
      name: 'backup_path',
      selector: 'backup_path',
      wrap: true,
      width: '340px'
    },
    {
      name: 'country',
      selector: 'country',
      wrap: true
    },
    {
      name: 'operator',
      selector: 'operator',
      wrap: true
    },
  
   
    {
      name: 'size_on_Desti',
      selector: 'size_on_Desti',
      wrap: true
    },
  
 
  ];

  columns.push({
            name: 'STATUS',
            cell: (row) => (
              <input type="checkbox" checked={Boolean(row.status)} className="checkbox"></input>
               // <p>{console.log('row',row)}</p>
           ),
           })

  // if (dbData.length > 0) {
  //   console.log(dbData[0]);
  //   Object.keys(dbData[0]).forEach((key) => {

  //     if (key === "status") {
  //       columns.push({
  //         name: key.toUpperCase(),
  //         cell: (row) => (
  //           <input type="checkbox" checked={Boolean(row.status)}></input>
  //           // <p>{console.log('row',row)}</p>
  //         ),
  //       })
  //     }else if(key == "id"){

  //     }
   
  //     else{
  //         columns.push({
  //           name: key.toUpperCase(),
  //           selector: key,
  //           wrap: true,
  //         });
  //     }
  //     console.log(key);
  //     // else{}
    
  //   });
  // }

  columns.unshift({
    name: '#',
    selector: 'key',
    ignoreRowClick: true,
    allowOverflow: true,

  });

  if(isAdmin){
  columns.push({
    cell: (row) => (
      <button className="btn btn-dark" onClick={() => 
        {
          setid(row.id)
          setModalShow(true)
          setmodalType('edit')
        }
     
      }>
        <AiOutlineEdit/>
      </button>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
    width: '60px'
  });

  columns.push({
    cell: (row) => (
      <>
        <button className="btn btn-danger"
         onClick={() => {
         
           let r = window.confirm("Are you sure??"); 
           if(r){
            deleteDbData(row.id)
           }
         }}
        ><MdDelete/></button>
      </>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
    width: '60px'
  });
}
  console.log("COLUMNS: ", columns);
  console.log("dbBackupData", dbBackupData);

  const [filterText, setFilterText] = React.useState("");

  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
    false
  );

  dbData?.forEach((item,index) => {
    item.key = index + 1
  })


  const filteredItems = dbData?.filter(
    (item) =>
      (item.db_name &&
        item.db_name.toLowerCase().includes(filterText.toLowerCase()))
  );

  // const toggleModal = () => {
  //   setModalShow(true);
  //   console.log("modalShow", modalShow);
  // };

  const subHeaderComponentMemo = React.useMemo(() => {


    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    const changeHandler = (event) => {
      console.log('event.target.files',event.target.files[0])
      setSelectedFile(event.target.files[0]);
      // setisFilePicked(true);
    };

    console.log("modalShow", modalShow);
    return (
      <div className="btn-container">
    {isAdmin && <div><input type="file" name="file" onChange={changeHandler}></input><button className="btn btn-primary" onClick={()=> importData(token,3,selectedFile)}>Import</button></div>}
       {isAdmin && <button
       className="btn btn-primary"
       onClick={() =>{ 
          setModalShow(true)
          setmodalType('add')
        }}>Add Data</button>}

        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
        <FilterComponent
          onFilter={(e) => setFilterText(e.target.value)}
          onClear={handleClear}
          filterText={filterText}
        />
      </div>
    );
  }, [filterText, resetPaginationToggle, modalShow, selectedFile]);

  
  createTheme('solarized', {
    text: {
      primary: 'rgba(0,0,0)',
      secondary: '#fff',
    },
    background: {
      // default: '#002b36',
    },
    context: {
      background: '#cb4b16',
      text: '#FFFFFF',
    },
    divider: {
      default: 'rgba(0,0,0,.7)',
    },
    action: {
      button: 'rgba(0,0,0,.54)',
      hover: 'rgba(0,0,0,.08)',
      disabled: 'rgba(0,0,0,.12)',
    },
  });
  const newCol = columns.filter(col => col.name !== '#')
  console.log('fsfsfsfsf',newCol);
  return (
    <>
     <DataTableExtensions
       columns={columns}
       data={filteredItems}
       exportHeaders= {true}
      >
      <DataTable
        title="Database Backup"
        columns={columns}
        data={filteredItems}
        pagination
        paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        persistTableHead
        progressPending={isloading}
        theme= 'solarized'
      />
      </DataTableExtensions>
    </>
  );
}

export default DbBackup;
