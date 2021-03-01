import React,{useState} from "react";
import "../Components/Dashboard.css";
import { MyContext } from "../App";
import styled from "styled-components";
import DataTable,{createTheme} from "react-data-table-component";
import { Modal, Button } from "react-bootstrap";
import queryString from "query-string";
import "./Home.css";

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

  const {modalType,token,getSslData,id,sslData,sslUrl,setsslUrl,path,setpath,sslDate,setsslDate,clearInputs,setModalShow} = React.useContext(MyContext)



  React.useEffect(()=>{
    

    if(sslData && sslData.length !== 0 && id && modalType =="edit" ){
      console.log('sslData Data',sslData);
      const filteredData = sslData.filter(data => data.id == id)

      


      console.log('Filtered Data',filteredData);

      setsslUrl(filteredData[0].ssl_url);
      setpath(filteredData[0].path);
      setsslDate(filteredData[0].ssl_date);
           
    }else{
       clearInputs()
    }


  },[modalType,id])




const updateSslData = (token,id,sslUrl,path,sslDate)=>{
  const data = {
    id: id,
    ssl_url:sslUrl,
    path:path,
    ssl_date:sslDate
  }

  fetch("https://webinfo-api.genmail.online/Urls", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: queryString.stringify({
        action: 6,
        updateRecord: JSON.stringify(data)
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((data) => {
        console.log("SSLDATA", data);
        getSslData(token)

        // alert('Data Updated Successfully')
        
      })
      .catch((err) => {
        console.log(err);
      });
}

const insertSslData = (token,sslUrl,path,sslDate)=>{
    const data = {
      ssl_url:sslUrl,
      path:path,
      ssl_date:sslDate
    }

    clearInputs() 

    fetch("https://webinfo-api.genmail.online/Urls", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: queryString.stringify({
        action: 5,
        addRecord: JSON.stringify(data)
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((data) => {
        console.log("SSLDATA", data);
        getSslData(token)
  
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
        Modal heading
      </Modal.Title>

      <Modal.Body>
          <div className="row">
            <div className="form-group col">
              <label for="inputEmail4">Site URL</label>
              <input type="text" className="form-control" placeholder="URL" value={sslUrl} onChange={(e)=>setsslUrl(e.target.value)}></input>
            </div>
           
          </div>

          <div className="row">
            <div className="form-group col">
              <label for="inputPassword4">Path</label>
              <input type="text" className="form-control" placeholder="Path" value={path} onChange={(e)=>setpath(e.target.value)}></input>
            </div>
          </div>

          <div className="row">
            <div className="form-group col">
              <label for="inputEmail4">SSL Date</label>
              <input type="date" className="form-control" placeholder="SSL Date" value={sslDate} onChange={(e)=> setsslDate(e.target.value)} required></input>
            </div>
          </div>

          
        
      </Modal.Body>
      <Modal.Footer>
        {modalType == 'add' && <Button 
        onClick={()=>{
          props.onHide()
           insertSslData(token,sslUrl,path,sslDate)
          
        }}
        >Save</Button>}
        {modalType == 'edit'&& <Button onClick={()=> {
          // {console.log(ModalShow)}
          props.onHide()
          updateSslData(token,id,sslUrl,path,sslDate)

          }}>Update</Button>}
        <Button  onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function SSLData() {

  const [modalShow, setModalShow] = React.useState(false);

  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
    false
  );
 


  const {isloading,token, setmodalType,sslData,getSslData,setid,setssl,setexpiredSSL,isAdmin, selectedFile,setSelectedFile,importData } = React.useContext(MyContext);

  

  React.useEffect(()=>{
  
    getSslData(token)
    
  },[])

  //DELETE SSLData
    const deleteSslData = (id)=>{

      fetch("https://webinfo-api.genmail.online/Urls", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: queryString.stringify({
          action: 14,
          recordid: id
        }),
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          }
        })
        .then((data) => {
          // console.log("DELETED", data);
          // setaddDataSuccess(true)
          getSslData(token);
          // setModalShow(false);
          // alert('Data Deleted Successfully')
          
        })
        .catch((err) => {
          console.log(err);
        });
  }
      
  let columns = [
    {
      name: 'ssl_url',
      selector: 'ssl_url',
      wrap: true,
      width: '320px'
    },
    {
      name: 'path',
      selector: 'path',
      wrap: true,
      width: '350px'
    },
    {
      name: 'ssl_date',
      selector: 'ssl_date',
      wrap: true,
      // width: '150px'
    },
  ];
  // if (sslData.length > 0) {
  //   console.log(sslData[0]);
  //   Object.keys(sslData[0]).forEach((key) => {

  //     if (key === "id"){
        
  //     }else{
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
    width: '80px'

  });

  if(isAdmin){
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
            deleteSslData(row.id)
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
  
sslData?.forEach((item,index) => {
  item.key = index + 1
})

  const filteredItems = sslData?.filter(
    (item) =>
      (item.path && item.ssl_url && item.ssl_url.toLowerCase().includes(filterText.toLowerCase()))
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
         {isAdmin && <div><input type="file" name="file" onChange={changeHandler}></input><button className="btn btn-primary" onClick={()=> importData(token,2,selectedFile)}>Import</button></div>}
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
       data={filteredItems}
       exportHeaders= {true}
      >
      <DataTable
        title="SSL DATA"
        columns={columns}
        data={filteredItems}
        pagination
        paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        persistTableHead
        progressPending={isloading}
        // theme= 'solarized'
        striped
      />
      </DataTableExtensions>
    </>
  );
}

export default SSLData;