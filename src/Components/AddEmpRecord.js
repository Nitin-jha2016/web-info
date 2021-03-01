// import React,{useState} from "react";
// import { MyContext } from "../App";
// import { Modal, Button } from "react-bootstrap";
// import EmpRecordTable from "./EmpRecordTable";

// function AddEmpRecord() {
//   const { show, setShow, id, token, getempDataRecord } = React.useContext(MyContext);
//   const [fromDate, setfromDate] = useState('')
//   const [toDate, settoDate] = useState('')
//   return (
//     <>
//       <Modal
//         show={show}
//         onHide={() => setShow(false)}
//         dialogClassName="modal-100w"
//         aria-labelledby="example-custom-modal-styling-title"
//       >
//         <Modal.Header closeButton>
//           <Modal.Title id="example-custom-modal-styling-title">
//             EMPLOYEE RECORD
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <div className="modal-inputs">
//             <div className="mr-2" style={{ marginLeft: "10px" }}>
//               <label> From: &nbsp; </label>
//               <input type="date" value={fromDate} onChange={(e)=>{setfromDate(e.target.value)}}></input>
//             </div>
//             <div style={{ marginLeft: "10px" }}>
//               <label>To: &nbsp;</label>
//               <input type="date" value={toDate} onChange={(e)=>{settoDate(e.target.value)}}></input>
//             </div>

//             <div>
//               <button
//                 className="btn btn-primary"
//                 style={{ marginLeft: "10px" }}
//                 onClick={
//                  ()=>{
//                   getempDataRecord(token,id,fromDate,toDate)
//                  }
//                 }
//               >
//                 Get Data
//               </button>
//             </div>
//           </div>

//           <EmpRecordTable />
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// }

// export default AddEmpRecord;
