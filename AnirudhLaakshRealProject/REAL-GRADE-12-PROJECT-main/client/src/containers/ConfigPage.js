import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/InventorySchemaEditor.css";
import axios from "axios";

const ConfigPage = (props) => {
  const [users, setUsers] = useState([]);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newAccessLevel, setNewAccessLevel] = useState("Admin");
  const [newColumnName, setNewColumnName] = useState("");
  const [newColumnType, setNewColumnType] = useState("string");
  const [newSubColumnName, setNewSubColumnName] = useState("");
  const [newSubColumnType, setNewSubColumnType] = useState("number");
  const navigate = useNavigate();

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

  const addUser = () => {
    if (newUsername && newPassword) {
      const newUser = {
        username: newUsername,
        password: newPassword,
        accessLevel: newAccessLevel,
      };
      setUsers([...users, newUser]);
      setNewUsername("");
      setNewPassword("");
      setNewAccessLevel("Admin");
    }
  };

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

  const generateBoth = () => {
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
    handleSubmit(schema, users);
  };

  const handleSubmit = (schema, users) => {
    console.log(schema, users);
    props.client
      .post("/config", { schema, users })
      .then((response) => {
        console.log(response);
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="inventory-schema-editor">
      <strong>
        NOTE THAT THIS WILL CLEAR ALL YOUR DATA. PROCEED WITH CARE.
      </strong>
      <br />
      <br />
      <fieldset>
        <legend>Schema</legend>
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
      </fieldset>
      <br />
      <br />
      <fieldset>
        <legend>Users</legend>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Password</th>
              <th>Access Level</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.username}</td>
                <td>{user.password}</td>
                <td>{user.accessLevel}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="column-input">
          <input
            type="text"
            placeholder="Username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <select
            value={newAccessLevel}
            onChange={(e) => setNewAccessLevel(e.target.value)}
          >
            <option value="Admin">Admin</option>
            <option value="Level 1">Level 1</option>
            <option value="Level 2">Level 2</option>
            <option value="Level 3">Level 3</option>
          </select>
          <button onClick={addUser}>Add User</button>
        </div>
      </fieldset>
      <br />
      <br />
      <br />
      <button onClick={generateBoth}>Generate Config</button>
    </div>
  );
};

export default ConfigPage;
