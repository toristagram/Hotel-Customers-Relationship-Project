import React, { useState, useEffect } from "react";
import { Table, Button, Checkbox } from "antd";
import FirebaseDB from "../firebase";
import { ref, onValue } from "firebase/database";
import { useNavigate } from "react-router-dom";

const db = FirebaseDB();

const RoomTableData = () => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const [showFreeRoomsOnly, setShowFreeRoomsOnly] = useState(false);
  const [columns, setColumns] = useState([
    {
      title: "Number",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      filters: [
        {
          text: "Standard",
          value: "standard",
        },
        {
          text: "Deluxe",
          value: "deluxe",
        },
        {
          text: "Suite",
          value: "suite",
        },
      ],
      onFilter: (value, record) => record.type.indexOf(value) === 0,
    },
    {
      title: "Occupancy",
      dataIndex: "occupancy",
      key: "occupancy",
      filters: [
        {
          text: "1",
          value: "1",
        },
        {
          text: "2",
          value: "2",
        },
        {
          text: "3",
          value: "3",
        },
        {
          text: "4",
          value: "4",
        },
        {
          text: "5",
          value: "5",
        },
      ],
      onFilter: (value, record) =>
        String(record.occupancy).indexOf(value) === 0,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Guest",
      dataIndex: "guest",
      key: "guest",
      filters: [
        {
          text: "Golden Branch",
          value: "Golden Branch",
        },
        {
          text: "Ratliff Schwartz",
          value: "Ratliff Schwartz",
        },
        {
          text: "Merritt Page",
          value: "Merritt Page",
        },
        {
          text: "Maggie Rollins",
          value: "Maggie Rollins",
        },
        {
          text: "Barker Frost",
          value: "Barker Frost",
        },
        {
          text: "Macias Nash",
          value: "Macias Nash",
        },
        {
          text: "Natalia Soto",
          value: "Natalia Soto",
        },
        {
          text: "Page Walton",
          value: "Page Walton",
        },
        {
          text: "Shelia Sanders",
          value: "Shelia Sanders",
        },
        {
          text: "Morgan Reed",
          value: "Morgan Reed",
        },
        {
          text: "Delgado Santana",
          value: "Delgado Santana",
        },
        {
          text: "Horne Downs",
          value: "Horne Downs",
        },
      ],
      onFilter: (value, record) => record.guest.startsWith(value),
      filterSearch: true,
    },
  ]);

  useEffect(() => {
    const dbRef = ref(db, "Rooms");

    const unsubscribe = onValue(dbRef, (snapshot) => {
      let records = [];
      snapshot.forEach((childSnapshot) => {
        let keyName = childSnapshot.key;
        let data = childSnapshot.val();
        records.push({ key: keyName, ...data });
      });
      setTableData(records);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleClearFilters = () => {
    const updatedColumns = columns.map((column) => {
      if (column.filters) {
        return {
          ...column,
          filteredValue: [],
        };
      }
      return column;
    });

    setColumns(updatedColumns);
  };

  const handleClearAll = () => {
    const updatedColumns = columns.map((column) => {
      if (column.filters) {
        return {
          ...column,
          filteredValue: [],
        };
      }
      if (column.sorter) {
        return {
          ...column,
          sortOrder: null,
        };
      }
      return column;
    });

    setColumns(updatedColumns);
  };

  const handleFreeRoomsOnlyChange = (e) => {
    setShowFreeRoomsOnly(e.target.checked);
  };

  const handleMoreInformation = (record) => {
    navigate(`/room/${record.key}`);
  };

  const clearFiltersButton = (
    <Button
      onClick={handleClearFilters}
      type="primary"
      htmlType="submit"
      className="filter-btn"
    >
      Clear All Filters
    </Button>
  );

  const clearAllButton = (
    <Button
      onClick={handleClearAll}
      type="primary"
      htmlType="submit"
      className="filter-btn"
      >
        Clear All
    </Button>
  )

  const filteredTableData = showFreeRoomsOnly
    ? tableData.filter((record) => !record.guest)
    : tableData;

  const actionColumn = {
    key: "action",
    render: (record) => (
      <div style={{ textAlign: "end" }}>
        <Button type="primary" onClick={() => handleMoreInformation(record)}>
          More Information
        </Button>
      </div>
    ),
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "95%" }}>
        {clearFiltersButton}
        {clearAllButton}
        <Checkbox
          onChange={handleFreeRoomsOnlyChange}
          checked={showFreeRoomsOnly}
        >
          Free rooms only
        </Checkbox>
        <Table
          columns={[...columns, actionColumn]}
          dataSource={filteredTableData}
          pagination={{
            position: ["bottomCenter"],
          }}
          onChange={(pagination, filters, sorter, extra) => {
            const updatedColumns = columns.map((column) => {
              if (column.filters) {
                return {
                  ...column,
                  filteredValue: filters[column.dataIndex] || [],
                };
              }
              if (column.sorter) {
                return {
                  ...column,
                  sortOrder: sorter.columnKey === column.key ? sorter.order : null,
                };
              }
              return column;
            });
            setColumns(updatedColumns);
          }}
        />
      </div>
    </div>
  );
};

export default RoomTableData;


















// class RoomTableData extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       tableData: [],
//       columns: columns,
//       showFreeRoomsOnly: false,
//       selectedRoom: null,
//     };
//   }

//   componentDidMount() {
//     const dbRef = ref(db, "Rooms");

//     onValue(dbRef, (snapshot) => {
//       let records = [];
//       snapshot.forEach((childSnapshot) => {
//         let keyName = childSnapshot.key;
//         let data = childSnapshot.val();
//         records.push({ key: keyName, ...data });
//       });
//       this.setState({ tableData: records });
//     });
//   }

//   handleClearFilters = () => {
//     const updatedColumns = this.state.columns.map((column) => {
//       if (column.filters) {
//         return {
//           ...column,
//           filteredValue: [],
//         };
//       }
//       return column;
//     });

//     this.setState({
//       columns: updatedColumns,
//     });
//   };

//   handleFreeRoomsOnlyChange = (e) => {
//     this.setState({
//       showFreeRoomsOnly: e.target.checked,
//     });
//   };

//   render() {
//     const clearFiltersButton = (
//       <Button
//         onClick={this.handleClearFilters}
//         type="primary"
//         htmlType="submit"
//         className="filter-btn"
//       >
//         Clear All Filters
//       </Button>
//     );

//     const { showFreeRoomsOnly, selectedRoom } = this.state;

//     const filteredTableData = showFreeRoomsOnly
//       ? this.state.tableData.filter((record) => !record.guest)
//       : this.state.tableData;

//     return (
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//         }}
//       >
//         <div style={{ width: "95%" }}>
//           {clearFiltersButton}
//           <Checkbox
//             onChange={this.handleFreeRoomsOnlyChange}
//             checked={showFreeRoomsOnly}
//           >
//             Free rooms only
//           </Checkbox>
//           <Table
//             columns={[...this.state.columns]}
//             dataSource={filteredTableData}
//             pagination={{
//               position: ["bottomCenter"],
//             }}
//             onChange={(pagination, filters, sorters, extra) => {
//               const updatedColumns = this.state.columns.map((column) => {
//                 if (column.filters) {
//                   return {
//                     ...column,
//                     filteredValue: filters[column.dataIndex] || [],
//                   };
//                 }
//                 return column;
//               });
//               this.setState({ columns: updatedColumns });
//             }}
//           />
//         </div>
//       </div>
//     );
//   }
// }

// export default RoomTableData;
