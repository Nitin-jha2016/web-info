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



function EmpRecordTable() {

    const {empDataRecord} = React.useContext(MyContext)

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


    return (
        <div>
            
        </div>
    )
}

export default EmpRecordTable
