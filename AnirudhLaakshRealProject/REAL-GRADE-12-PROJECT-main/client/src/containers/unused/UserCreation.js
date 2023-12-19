import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/InventorySchemaEditor.css";

function UserCreation() {
  const [users, setUsers] = useState([]);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newAccessLevel, setNewAccessLevel] = useState("Admin");
  const navigate = useNavigate();

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

  const generateUserData = () => {
    handleSubmit(users);
    //navigate("/usercreationtester");
  };

  const handleSubmit = (users) => {
    console.log(users);
  };

  return (
    <div className="inventory-schema-editor">
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
      <div className="user-input">
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
      <button onClick={generateUserData}>Generate User Data</button>
    </div>
  );
}

export default UserCreation;
