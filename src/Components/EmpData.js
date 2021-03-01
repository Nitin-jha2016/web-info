

import React,{useState} from "react";
import "../Components/Dashboard.css";
import { MyContext } from "../App";
import styled from "styled-components";
import DataTable,{createTheme} from "react-data-table-component";
import { Modal, Button } from "react-bootstrap";
import queryString from "query-string";
import "./Home.css";
import EmpRecordModal from "./EmpRecordModal";

import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';


import { MdDelete } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";

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

  const {isChecked,setisChecked,clearInputs,modalType,token,getempData,id,empData,  empName, setempName, project, setproject, backupDestination, setbackupDestination, lastUpdate, setlastUpdate} = React.useContext(MyContext)



  React.useEffect(()=>{
    

    if(empData && empData.length !== 0 && id && modalType =="edit" ){ 
      console.log('empData Data',empData);
      const filteredData = empData.filter(data => data.id == id)
      console.log('Filtered Data',filteredData[0]);
if(filteredData[0]){
      setempName(filteredData[0].Emp_name)
      setbackupDestination(filteredData[0].backup_desti)
      setproject(filteredData[0].project)
      setlastUpdate(filteredData[0].last_update)
      setisChecked(filteredData[0].status)
}
     
           
    }else{
          clearInputs();
    }


  },[modalType,id])




const updateEmpData = (id,token,empName,project,backupDestination,lastUpdate,isChecked)=>{
  const data = {
    id: id,
    Emp_name:empName,
    project:project,
    last_update:lastUpdate,
    backup_desti:backupDestination,
    status: +isChecked
  }

  fetch("https://webinfo-api.genmail.online/Urls", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: queryString.stringify({
        action: 12,
        updateRecord: JSON.stringify(data)
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((data) => {
        console.log("empData", data);
        getempData(token)
        // alert('Data Updated Successfully')
        
      })
      .catch((err) => {
        console.log(err);
      });
}

const insertEmpData = (token,empName,project,backupDestination,lastUpdate,isChecked)=>{
    const data = {
      Emp_name:empName,
      project:project,
      last_update:lastUpdate,
      backup_desti:backupDestination,
      status: +isChecked
    }



    console.log('EMP DATA',data);

    fetch("https://webinfo-api.genmail.online/Urls", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: queryString.stringify({
        action: 11,
        addRecord: JSON.stringify(data)
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((data) => {
        console.log("empData", data);
        getempData(token)

        // alert('Data Added Successfully')
        clearInputs()
        
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
       Employee Data
      </Modal.Title>

      <Modal.Body>
      <div className="row">
            <div className="form-group col-md-6">
              <label for="inputEmail4">Name</label>
              <input type="text" className="form-control" id="inputEmail4" placeholder="Emp Name" value={empName} onChange={(e) => setempName(e.target.value)}></input>
            </div>
            <div className="form-group col-md-6">
              <label for="inputPassword4">Project</label>
              <input type="text" className="form-control" id="inputPassword4" placeholder="Project" value={project} onChange={(e)=> setproject(e.target.value)}></input>
            </div>
          </div>

          <div className="row">
            <div className="form-group col-md-6">
              <label for="inputEmail4">Backup Destination</label>
              <input type="text" className="form-control" id="inputEmail4" placeholder="Backup Destination" value={backupDestination} onChange={(e)=> setbackupDestination(e.target.value)}></input>
            </div>
            <div className="form-group col-md-6">
              <label for="inputPassword4">Last Update</label>
              <input type="text" className="form-control" placeholder="Last Update" value={lastUpdate} onChange={(e)=> setlastUpdate(e.target.value)}></input>
            </div>
          </div>

          <div className="row">
            <div className="form-group col-md-6 inputCheck">
              <label for="inputEmail4">Status &nbsp;</label>
              <input type="checkbox" id="inputEmail4" checked={isChecked} onChange={()=> setisChecked(!isChecked)}></input>
            </div>
           
          </div>
          
        
      </Modal.Body>
      <Modal.Footer>
        {modalType == 'add' && <Button onClick={()=>{
          props.onHide()
           insertEmpData(token,empName,project,backupDestination,lastUpdate,isChecked)
        }
           
           }>Save</Button>}
        {modalType == 'edit'&& <Button onClick={()=>{
           props.onHide()
           updateEmpData(id,token,empName,project,backupDestination,lastUpdate,isChecked)
        }
           }>Update</Button>}
        <Button  onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function EmpData() {

  const [modalShow, setModalShow] = React.useState(false);

  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
    false
  );

  const {isloading,token, setmodalType,empData,getempData,setid,isAdmin ,selectedFile,setSelectedFile,importData,show,setShow,getempDataRecord,setempDataRecord,getLatestEmpRecord} = React.useContext(MyContext);

  

  React.useEffect(()=>{
    getempData(token)
  },[])

  //DELETE empData
    const deleteEmpData = (id)=>{

      fetch("https://webinfo-api.genmail.online/Urls", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: queryString.stringify({
          action: 16,
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
          getempData(token);
          // setModalShow(false);
          // alert('Data Deleted Successfully')
          
        })
        .catch((err) => {
          console.log(err);
        });
  }

let columns = [
  {
     name: 'Emp_name',
     selector: 'Emp_name',
     wrap: true
  },
  {
    name: 'project',
    selector: 'project',
    wrap: true
 },
 {
  name: 'backup_desti',
  selector: 'backup_desti',
  wrap: true
},
{
  name: 'last_update',
  selector: 'last_update',
  wrap: true
}
]
  // if (empData.length > 0) {
  //   // console.log(empData[0]);
  //   Object.keys(empData[0]).forEach((key) => {

  //     if (key === "status") {
  //       columns.push({
  //         name: key.toUpperCase(),
  //         cell: (row) => (
  //           <input type="checkbox" checked={Boolean(row.status)}></input>
  //           // <p>{console.log('row',row)}</p>
  //         ),
  //       })
  //     }
  //     else if(key === "id"){

  //     }
  //     else{
  //     columns.push({
  //       name: key.toUpperCase(),
  //       selector: key,
  //       wrap: true,
  //     });
  //   }
      
  //   });
  // } 

  columns.unshift({
    name: '#',
    selector: 'key',
    ignoreRowClick: true,
    allowOverflow: true,

  });

    columns.push({
            name: 'status',
            cell: (row) => (
              <input type="checkbox" checked={Boolean(row.status)}></input>
               // <p>{console.log('row',row)}</p>
           ),
           })
if(isAdmin) {


  
  columns.push({
    cell: (row) => (
      <button className="btn btn-dark" onClick={() => {
        setShow(true)
        setmodalType('addinfo')
        setid(row.id)
        // alert(row.id)
        }}>
          Add Info
      </button>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
    width: '120px'
  });


  columns.push({
    cell: (row) => (
      <button className="btn btn-dark" onClick={() => {
        setmodalType('showinfo')
        setShow(true)
        setid(row.id)
        alert(row.id)
        setempDataRecord()
        getLatestEmpRecord(token,row.id)
        }}>
          Show Info
      </button>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
    width: '120px'
  });

  columns.push({
    cell: (row) => (
      <button className="btn btn-dark" onClick={() => {
        setModalShow(true)
        setmodalType('edit')
        setid(row.id)
        // alert(row.id)
        }}>
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
         onClick={()=>{
           setid(row.id)
        

           let r = window.confirm("Are you sure??"); 
           if(r){
            deleteEmpData(row.id)
           }
         }
         }
         ><MdDelete/></button>
      </>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
    width: '60px'
  });
}


empData?.forEach((item,index) => {
  item.key = index + 1
})

  const filteredItems = empData?.filter(
    (item) =>
      (item.Emp_name &&
        item.Emp_name.toLowerCase().includes(filterText.toLowerCase()))
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


    return (
      <div className="btn-container">
         {isAdmin && <div><input type="file" name="file" onChange={changeHandler}></input><button className="btn btn-primary" onClick={()=> importData(token,4,selectedFile)}>Import</button></div>}
        {isAdmin && <button
        className="btn btn-primary"
        onClick={() =>{
              setModalShow(true)
              setmodalType('add')

        }         
          }
           >Add Data</button>}
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
  }, [filterText, resetPaginationToggle, modalShow,selectedFile]);

  
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
       data={empData}
       exportHeaders= {true}
      >
      <DataTable
        title="Running Websites on Server"
        columns={columns}
        data={filteredItems}
        pagination
        paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        persistTableHead
        progressPending={isloading}
        // theme= 'solarized'
      />
      </DataTableExtensions>
      <EmpRecordModal/>
    </>
  );
}

export default EmpData;