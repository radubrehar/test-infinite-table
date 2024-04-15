import { useState } from "react";
import { InfiniteTable, DataSource } from "@infinite-table/infinite-react";
import "@infinite-table/infinite-react/index.css";

function PriceCellRenderer(params) {
  // console.log(params);
  return (
    <div style={{ width: params.rowIndex % 100 }}>
      <span>
        <input defaultValue={params.value}></input>!!!
      </span>
    </div>
  );
}
const domProps = {
  style: {
    height: 500,
  },
};
const GridExample = () => {
  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState([
    { make: "Tesla", model: "Model Y", price: 64950, electric: true, id: "x" },
    { make: "Ford", model: "F-Series", price: 33850, electric: false, id: "y" },
    {
      make: "Toyota",
      model: "Corolla",
      price: 29600,
      electric: false,
      id: "z",
    },
    // generate another 1000 rows
    ...Array.from({ length: 1000 }, (_, i) => ({
      make: `Make ${i}`,
      model: `Model ${i}`,
      id: `id-${i}`,
      price: Math.floor(Math.random() * 100000),
      electric: Math.random() > 0.5,
    })),
  ]);

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState({
    id: { field: "id" },
    make: { field: "make" },
    model: { field: "model" },
    price: { field: "price" },
    electric: {
      field: "electric",
      renderValue: ({ value }) => (
        <input type="checkbox" checked={value} readOnly />
      ),
    },
  });

  return (
    // wrapping container with theme & size
    <div
      className="ag-theme-quartz" // applying the grid theme
      style={{ height: 500, width: "100vw" }} // the grid will fill the size of the parent container
    >
      <DataSource idProperty="id" data={rowData}>
        <InfiniteTable columns={colDefs} domProps={domProps} rowHeight={18} />
      </DataSource>
    </div>
  );
};

export default GridExample;
