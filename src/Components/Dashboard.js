import React from "react";
import "../Components/Dashboard.css";
import { MyContext } from "../App";
import styled from "styled-components";
import DataTable from "react-data-table-component";
import { BiLogOut } from "react-icons/bi";

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

const columns = [
  {
    name: "Path",
    selector: "path",
    sortable: true,
  },
  {
    name: "SSL_Date",
    selector: "SSL_Date",
    sortable: true,
  },
  {
    name: "Server",
    selector: "Server",
    sortable: true,
  },
  {
    name: "Port",
    selector: "port",
    sortable: true,
  },
  {
    name: "URL",
    selector: "URL",
    sortable: true,
  },
];

function Dashboard() {
  const [filterText, setFilterText] = React.useState("");
  const { data, ssl, isalertOpen, setisalertOpen, logOut } = React.useContext(
    MyContext
  );
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
    false
  );

  const filteredItems = data.filter(
    (item) =>
      (item.path &&
        item.path.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.Url && item.Url.toLowerCase().includes(filterText.toLowerCase()))
  );

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <div className="container table-container">
      {ssl.length? (
        <button
          type="button"
          class="btn btn-primary"
          onClick={() => setisalertOpen(!isalertOpen)}
        >
          Notifications <span class="badge">{ssl.length}</span>
        </button>
      ):''}
      <button
        type="button"
        class="btn btn-danger"
        onClick={() => logOut()}
      >
        Logout <BiLogOut/>
      </button>

      {isalertOpen && (
        <div class="alert alert-danger" role="alert">
          <h4>SSL's going expiring soon:</h4>
          <ul>
            {ssl.map((item) => {
              return <li>{item.Url}</li>;
            })}
          </ul>
        </div>
      )}

      {/* <div className="col"> */}
      <DataTable
        title="Running Websites on Server"
        columns={columns}
        data={filteredItems}
        pagination
        paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        persistTableHead
      />
    </div>
    // </div>
  );
}

export default Dashboard;
