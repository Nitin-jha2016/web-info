import React,{useState,useEffect} from "react";
import { MyContext } from "../App";
import { Modal, Button } from "react-bootstrap";
import EmpRecordTable from "./EmpRecordTable";
import DataTable,{createTheme} from "react-data-table-component";
import { MdDelete } from "react-icons/md";
import queryString from "query-string";

function EmpRecordModal() {
  const { show, setShow, id, token, getempDataRecord,modalType,setmodalType,empData,empDataRecord,insertempDataRecord,getLatestEmpRecord } = React.useContext(MyContext);
  const [fromDate, setfromDate] = useState('')
  const [toDate, settoDate] = useState('')
  console.log('MODAL TYPE',modalType);

  const [date, setdate] = useState('')
  const [empName, setempName] = useState('')
  const [project, setproject] = useState('')
  const [backupPath, setbackupPath] = useState('')
  const [workingFrom, setworkingFrom] = useState('')

console.log('empdatarcord&&&&',empDataRecord);

useEffect(() => {
   if(empData.length > 0){console.log('EMP DATA',empData);
  
   let filterdata = empData.filter(data => data.id == id);
   if(filterdata[0]){
   console.log(filterdata);
   setempName(filterdata[0].Emp_name);
   setproject(filterdata[0].project);
   setbackupPath(filterdata[0].backup_desti);
  }
   }

}, [id])

const deleteempDataRecord = (token,id)=>{
  // alert(id)
  fetch("https://webinfo-api.genmail.online/Urls", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
    body: queryString.stringify({
      action: 19,
      empid: id
    }),
  })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then((data) => {
      // getSiteData(token);
      console.log("DELETED", data);
      getLatestEmpRecord(token,id)
      // setaddDataSuccess(true)
    
      // setModalShow(false);
      // alert('Data Deleted Successfully')
      
    })
    .catch((err) => {
      console.log(err);
      alert('Unable to delete record')
    });
}

let columns = [
  {
    name: 'emp_name',
    selector: 'emp_name',
    wrap: true
  },
  {
    name: 'project',
    selector: 'project',
    wrap: true
  },
  {
     name: 'backup_path',
     selector: 'backup_path',
     wrap: true
  } ,
  {
    name: 'working_from',
    selector: '',
    wrap: true
 } ,
 
  {
    name: 'date',
    selector: 'date',
    wrap: true
 },

]

columns.push({
  cell: (row) => (
    <button className="btn btn-danger" onClick={() => {
      console.log("ROW",row)
      // setmodalType('showinfo')
      // setShow(true)
      // setid(row.id)
      // alert(row.id)
      // setempDataRecord()
      deleteempDataRecord(token,row.empid)
      }}>
        <MdDelete/>
      
    </button>
  ),
  ignoreRowClick: true,
  allowOverflow: true,
  button: true,
  // width: '120px'
});

  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-100w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header>
          <Modal.Title id="example-custom-modal-styling-title">
            EMPLOYEE RECORD
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
         {modalType == 'showinfo' && <><div className="modal-inputs">
            <div className="mr-2" style={{ marginLeft: "10px" }}>
              <label> From: &nbsp; </label>
              <input type="date" value={fromDate} onChange={(e)=>{setfromDate(e.target.value)}}></input>
            </div>
            <div style={{ marginLeft: "10px" }}>
              <label>To: &nbsp;</label>
              <input type="date" value={toDate} onChange={(e)=>{settoDate(e.target.value)}}></input>
            </div>

            <div>
              <button
                className="btn btn-primary"
                style={{ marginLeft: "10px" }}
                onClick={
                 ()=>{
                  getempDataRecord(token,id,fromDate,toDate)
                 }
                }
              >
                Get Data
              </button>
            </div>
          </div>
          <DataTable
        // title="SSL DATA"
        columns={columns}
        data={empDataRecord}
        pagination
        paginationPerPage={5}
        // paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
        // subHeader
        // subHeaderComponent={subHeaderComponentMemo}
        // persistTableHead
        // progressPending={isloading}
        // theme= 'solarized'
        striped
      />
          </>
          
          }







          {modalType == 'addinfo' && <>
          <div className="row">
            <div className="form-group col">
              <label for="inputEmail4">Emp Name</label>
              <input type="text" className="form-control" placeholder="URL" value={empName} onChange={(e)=>setempName(e.target.value)}></input>
            </div>
            <div className="form-group col">
              <label for="inputPassword4">Project</label>
              <input type="text" className="form-control" placeholder="Path" value={project} onChange={(e)=>setproject(e.target.value)}></input>
            </div>
          </div>


          <div className="row">
            <div className="form-group col">
              <label for="inputPassword4">Backup Path</label>
              <input type="text" className="form-control" placeholder="Path" value={backupPath} onChange={(e)=>setbackupPath(e.target.value)}></input>
            </div>
          </div>


          <div className="row">
            <div className="form-group col">
              <label for="inputEmail4">Date</label>
              <input type="date" className="form-control" placeholder="SSL Date" value={date} onChange={(e)=> setdate(e.target.value)} required></input>
            </div>
            <div className="form-group col">
              <label for="inputEmail4">Working From:</label>
              <select className = "form-group col form-control" value={workingFrom} onChange={(e)=> setworkingFrom(e.target.value)}>
                <option value="Home">
                    Home
                </option>
                <option value="Office">
                    Office
                </option>
              </select>
              {console.log(workingFrom)}
            </div>
          </div>
          </>
          
          }

          <EmpRecordTable />
        </Modal.Body>
        <Modal.Footer>
       {modalType == 'addinfo' && <Button onClick={()=> insertempDataRecord(token,id,date,empName,project,backupPath,workingFrom)}>Save</Button>}
        <Button onClick={()=> setShow(false)}>Close</Button>
      </Modal.Footer>
      </Modal>
    </>
  );
}

export default EmpRecordModal;
