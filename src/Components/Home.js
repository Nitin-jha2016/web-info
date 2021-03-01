import React from "react";
import "../Components/Dashboard.css";
import { MyContext } from "../App";
import styled from "styled-components";
import DataTable,{createTheme}from "react-data-table-component";
import { Modal, Button } from "react-bootstrap";
import "./Home.css";

import { ButtonExportExcel } from '@alckor127/react-button-export-excel'
import '@alckor127/react-button-export-excel/dist/index.css'

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

  const {
    siteData,
    token,
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
    insertSiteData,
    updateSiteData,
    modalType,
    clearInputs,

    isChecked,
    setisChecked,
    sitePort,
    setsitePort,
    setModalShow

  } = React.useContext(MyContext);

  React.useEffect(()=>{
    // alert(2)

    // setbackupSize('')
    // setcountry('')
    // setip('')
    // setoperator('')
    // setbackupPath('')
    // setsitePath('')
    // setsiteUrl('')
    // setsizeFolder('')
    // setbackupIp('')
},[])

  React.useEffect(()=>{
    // alert(1)
    if(siteData.length !== 0 && id && modalType ==='update'){
      console.log('site Data',siteData);
      const filteredData = siteData.filter(data => data.id == id)
      console.log('Fi%%%%%%%ltered Data',filteredData);

      setbackupSize(filteredData[0].backup_size)
      setcountry(filteredData[0].country)
      setip(filteredData[0].ip)
      setoperator(filteredData[0].operator)
      setbackupPath(filteredData[0].backup_path)
      setsitePath(filteredData[0].site_path)
      setsiteUrl(filteredData[0].site_url)
      setsizeFolder(filteredData[0].size_folder)
      setbackupIp(filteredData[0].backup_ip)
      setisChecked(filteredData[0].status)
      setsitePort(filteredData[0].port)
    }else{
      clearInputs()
      // alert('inputs cleared')
    }
  },[modalType,id])

  
console.log('Modal Type',modalType);
  return (
    
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="modal"
    >
      <Modal.Title id="contained-modal-title-vcenter">
        SITE URL PATHS
      </Modal.Title>

      <Modal.Body>
        <div className="row">
          <div className="form-group col-md-6">
            <label for="inputEmail4">Site URL</label>
            <input
              type="text"
              className="form-control"
              id="inputEmail4"
              placeholder="URL"
              value={siteUrl}
              onChange={(e) => setsiteUrl(e.target.value)}
              required
            ></input>
          </div>
          <div className="form-group col-md-6">
            <label for="inputPassword4">Path</label>
            <input
              type="text"
              className="form-control"
              placeholder="path"
              value={sitePath}
              onChange={(e) => setsitePath(e.target.value)}
            ></input>
          </div>
        </div>

        <div className="row">
          <div className="form-group col-md-6">
            <label for="inputEmail4">Size of folder</label>
            <input
              type="text"
              className="form-control"
              id="inputEmail4"
              placeholder="Size of folder"
              value={sizeFolder}
              onChange={(e) => setsizeFolder(e.target.value)}
            ></input>
          </div>
          <div className="form-group col-md-6">
            <label for="inputPassword4">Operator</label>
            <input
              type="text"
              className="form-control"
              placeholder="Operator"
              value={operator}
              onChange={(e) => setoperator(e.target.value)}
            ></input>
          </div>
        </div>

        <div className="row">
          <div className="form-group col-md-6">
            <label for="inputEmail4">Country</label>
            <input
              type="text"
              className="form-control"
              placeholder="Country"
              value={country}
              onChange={(e) => setcountry(e.target.value)}
            ></input>
          </div>
          <div className="form-group col-md-6">
            <label for="inputPassword4">Backup IP</label>
            <input
              type="text"
              className="form-control"
              placeholder="Backup IP"
              value={backupIp}
              onChange={(e) => setbackupIp(e.target.value)}
            ></input>
          </div>
        </div>

        <div className="row">
          <div className="form-group col-md-6">
            <label for="inputEmail4">Backup Size</label>
            <input
              type="text"
              className="form-control"
              placeholder="Backup Size"
              value={backupSize}
              onChange={(e) => setbackupSize(e.target.value)}
            ></input>
          </div>
          <div className="form-group col-md-6">
            <label for="inputPassword4">Backup Path</label>
            <input
              type="text"
              className="form-control"
              id="inputPassword4"
              placeholder="Backup Path"
              value={backupPath}
              onChange={(e) => setbackupPath(e.target.value)}
            ></input>
          </div>
        </div>

        <div className="row">
          <div className="form-group col">
            <label for="inputPassword4">IP</label>
            <input
              type="text"
              className="form-control"
              placeholder="IP"
              value={ip}
              onChange={(e) => setip(e.target.value)}
            ></input>
          </div>
          <div className="form-group col">
            <label for="inputPassword4">PORT</label>
            <input
              type="text"
              className="form-control"
              placeholder="IP"
              value={sitePort}
              onChange={(e) => setsitePort(e.target.value)}
            ></input>
          </div>
        </div>

        <div className="row">
          <div className="form-group col text-center inputCheckbox">
            <label for="inputPassword4">Status: &nbsp; </label>
            <input
              type="checkbox"
              // className="inputCheck"
              placeholder="IP"
              checked={isChecked}
              onChange={() => setisChecked(!isChecked)                
              }
            ></input>
            {console.log('ISCHECKED',isChecked)}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
    {modalType == "add" &&  <Button
          onClick={() => {
                 props.onHide()
            insertSiteData(
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
 ); 
          }}
        >
          Save
        </Button>}
       {modalType === 'update' && <Button
          onClick={() => {
            props.onHide()
          updateSiteData(
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
              isChecked);
          }}
        >
          Update
        </Button>}
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function Home() {
 
  const { siteData, isloading,modalShow,setModalShow,setid,setmodalType,clearInputs,deleteSiteUrl,setsslUrl,setpath,setsslDate,isAdmin, selectedFile, setSelectedFile, isFilePicked,setisFilePicked, importData, token} = React.useContext(MyContext);

let columns = [
  {
    name: 'site_url',
    selector: 'site_url',
    wrap: true,
    width: '250px'
  },
  {
    name: 'site_path',
    selector: 'site_path',
    wrap: true,
    width: '390px',
  },
  {
    name: 'ip',
    selector: 'ip',
    wrap: true,
    width: '180px'
  },
  {
    name: 'port',
    selector: 'port',
    wrap: true
  },
  {
    name: 'country',
    selector: 'country',
    wrap: true,
  },
  {
    name: 'size_folder',
    selector: 'size_folder',
    wrap: true
  },
  {
    name: 'backup_path',
    selector: 'backup_path',
    wrap: true,
    width: '200px'
  },
  {
    name: 'backup_ip',
    selector: 'backup_ip',
    wrap: true,
    width: '120px'
  },
  {
    name: 'backup_size',
    selector: 'backup_size',
    wrap: true
  },
    

];

columns.push({
         name: 'status',
        cell: (row) => (
          <input type="checkbox" checked={Boolean(row.status)}></input>
          // <p>{console.log('row',row)}</p>
         ),
         width: '80px'
        });



       columns.unshift({
          name: '#',
         selector: 'key',
          ignoreRowClick: true,
          allowOverflow: true,
          width: '50px'
      
        });


  console.log('IS ADMIN',isAdmin);
if(isAdmin){


  const editHandler=(id)=>{
    // console.log('ROW',id);
    // alert(id)
    setid(id)
    setModalShow(true)
    setmodalType('update')
  }

  columns.push({
    cell: (row) => (
      <button className="btn btn-dark" onClick={() => editHandler(row.id)}>
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
        <button className="btn btn-danger" onClick={()=>{
          setid(row.id)
          // alert(row.id)
          let r = window.confirm("Are you sure??"); 
          if(r){
            deleteSiteUrl(row.id)
          }
         
         
        }}><MdDelete/></button>
      </>

    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
    width: '60px'
  });
}

  // console.log("COLUMNS: ", columns);
  // console.log("DATA", siteData);

  const [filterText, setFilterText] = React.useState("");

  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
    false
  );
  // console.log('SIte Daata',siteData);

  siteData?.forEach((item,index) => {
    item.key = index + 1
 })

  const filteredItems = siteData?.filter(
    (item) =>
    {
     return (
        item.site_path.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.site_url.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.ip.includes(filterText)) 

    }
     
  
  );

  console.log('SELECTED FILE',selectedFile);

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
      console.log('event.target.files',event.target.files)
      setSelectedFile(event.target.files[0]);
      setisFilePicked(true);
    };
 

    console.log("modalShow", modalShow);
    return (
      <div className="btn-container">
          
          {isAdmin && <div><input type="file" name="file" onChange={changeHandler}></input><button className="btn btn-primary" onClick={()=> importData(token,1,selectedFile)}>Import</button></div>}

       {isAdmin && <button onClick={() => {         
          
          setmodalType('add')
          setModalShow(true)
          // clearInputs()
    
          }} className="btn btn-primary">Add Data</button>}

     

         {/* {isAdmin && <ButtonExportExcel outline data={siteData} filename='example'>
        ¡Export now!
      </ButtonExportExcel>
} */}

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
        title="Running Websites on Server"
        columns={columns}
        data={filteredItems}
        pagination
        paginationTotalRows={siteData.length}
        paginationPerPage= {10}
        // paginationRowsPerPageOptions= {10}
        paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        persistTableHead
        progressPending={isloading}
        theme='solarized'
        // export
      />
      </DataTableExtensions>
    </>
  );
}

export default Home;
