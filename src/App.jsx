import { useMemo, useState } from "react";
import { InfiniteTable, DataSource } from "@infinite-table/infinite-react";
import "@infinite-table/infinite-react/index.css";

const domProps = {
  style: {
    height: 500,
  },
};
const genColumns = [
  ...Array.from({ length: 100 }, (_, i) => ({
    field: `col-${i}`,
  })),
];

const columns = [
  { field: "id" },
  { field: "make" },
  { field: "model" },
  { field: "price" },

  // generate 100 more columns
  ...genColumns,
];

function addColPropsToObject(obj) {
  return genColumns.reduce((acc, col, i) => {
    acc[`col-${i}`] = `${col.field} - ${obj.id}`;
    return acc;
  }, obj);
}

const rowData = [
  addColPropsToObject({
    make: "Tesla",
    model: "Model Y",
    price: 64950,
    electric: true,
    id: "x",
  }),
  addColPropsToObject({
    make: "Ford",
    model: "F-Series",
    price: 33850,
    electric: false,
    id: "y",
  }),
  addColPropsToObject({
    make: "Toyota",
    model: "Corolla",
    price: 29600,
    electric: false,
    id: "z",
  }),
  // generate another 1000 rows
  ...Array.from({ length: 1000 }, (_, i) =>
    addColPropsToObject({
      make: `Make ${i}`,
      model: `Model ${i}`,
      id: `id-${i}`,
      price: Math.floor(Math.random() * 100000),
      electric: Math.random() > 0.5,
    })
  ),
];

function getColumns() {
  const cols = [...columns];
  const count = localStorage.getItem("columnCount") * 1 || 4;
  cols.length = count;
  return cols;
}

const GridExample = () => {
  const [colDefs, setColDefs] = useState(getColumns);

  const setColumnCount = (value) => {
    localStorage.setItem("columnCount", value);
    setColDefs(getColumns());
  };

  const cols = useMemo(() => {
    return colDefs.reduce((acc, col) => {
      acc[col.field] = col;
      return acc;
    }, {});
  }, [colDefs]);

  return (
    // wrapping container with theme & size
    <div>
      Grid height: <b>500px</b>. Row height: <b>18px</b>. Row count{" "}
      <b>{rowData.length}</b>. Column count{" "}
      <select
        value={localStorage.getItem("columnCount") || 4}
        onChange={(event) => {
          setColumnCount(event.target.value);
        }}
      >
        <option value="4">4</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
      <div
        className="ag-theme-quartz" // applying the grid theme
        style={{ height: 500, width: "100vw" }} // the grid will fill the size of the parent container
      >
        <DataSource idProperty="id" data={rowData}>
          <InfiniteTable
            columnDefaultWidth={200}
            columns={cols}
            domProps={domProps}
            rowHeight={18}
          />
        </DataSource>
      </div>
    </div>
  );
};

export default GridExample;
