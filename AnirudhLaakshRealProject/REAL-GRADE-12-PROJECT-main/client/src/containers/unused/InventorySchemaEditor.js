import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/InventorySchemaEditor.css";

function InventorySchemaEditor() {
  const [columns, setColumns] = useState([
    { name: "ID", type: "number" },
    { name: "Public/NonPublic", type: "string" },
    {
      name: "Qty",
      type: "number",
      subColumns: [
        { name: "Public", type: "number" },
        { name: "Private", type: "number" },
      ],
    },
    { name: "Industry", type: "string" },
  ]);

  const [newColumnName, setNewColumnName] = useState("");
  const [newColumnType, setNewColumnType] = useState("string");
  const [newSubColumnName, setNewSubColumnName] = useState("");
  const [newSubColumnType, setNewSubColumnType] = useState("number");
  const navigate = useNavigate();

  const addColumn = () => {
    if (newColumnName) {
      const newColumn = { name: newColumnName, type: newColumnType };
      setColumns([...columns, newColumn]);
      setNewColumnName("");
      setNewColumnType("string");
    }
  };

  const addSubColumn = (index) => {
    if (newSubColumnName) {
      const updatedColumns = [...columns];
      updatedColumns[index].subColumns = updatedColumns[index].subColumns || [];
      updatedColumns[index].subColumns.push({
        name: newSubColumnName,
        type: newSubColumnType,
      });
      setColumns(updatedColumns);
      setNewSubColumnName("");
      setNewSubColumnType("string");
    }
  };

  const generateSchema = () => {
    const schema = columns.map((column) => {
      const { name, type, subColumns } = column;
      return {
        name,
        type,
        subColumns: subColumns
          ? subColumns.map((subColumn) => ({
              name: subColumn.name,
              type: subColumn.type,
            }))
          : [],
      };
    });
    handleSubmit(schema);
    navigate("/usercreationtester");
  };

  const handleSubmit = (schema) => {
    console.log(schema);
  };

  return (
    <div className="inventory-schema-editor">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Sub-Columns</th>
          </tr>
        </thead>
        <tbody>
          {columns.map((column, index) => (
            <tr key={index}>
              <td>{column.name}</td>
              <td>{column.type}</td>
              <td>
                {index > 3 ? (
                  <>
                    {column.subColumns
                      ? column.subColumns.map((subColumn, subIndex) => (
                          <div key={subIndex} className="sub-column">
                            <span>{subColumn.name}</span>
                            <span>({subColumn.type})</span>
                          </div>
                        ))
                      : "-"}
                    <div className="sub-column-input">
                      <input
                        type="text"
                        placeholder="Sub-Column Name"
                        value={newSubColumnName}
                        onChange={(e) => setNewSubColumnName(e.target.value)}
                      />
                      <select
                        value={newSubColumnType}
                        onChange={(e) => setNewSubColumnType(e.target.value)}
                      >
                        <option value="string">String</option>
                        <option value="number">Number</option>
                        <option value="date">Date</option>
                      </select>
                      <button onClick={() => addSubColumn(index)}>
                        Add Sub-Column
                      </button>
                    </div>
                  </>
                ) : (
                  "-"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="column-input">
        <input
          type="text"
          placeholder="Column Name"
          value={newColumnName}
          onChange={(e) => setNewColumnName(e.target.value)}
        />
        <select
          value={newColumnType}
          onChange={(e) => setNewColumnType(e.target.value)}
        >
          <option value="string">String</option>
          <option value="number">Number</option>
          <option value="date">Date</option>
        </select>
        <button onClick={addColumn}>Add Column</button>
      </div>
      <button onClick={generateSchema}>Generate Schema</button>
    </div>
  );
}

export default InventorySchemaEditor;
