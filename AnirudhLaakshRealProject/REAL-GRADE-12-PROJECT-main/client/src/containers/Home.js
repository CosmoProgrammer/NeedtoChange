import React, { useEffect, useState } from "react";
import Table from "./DynamicTable";
import { useNavigate } from "react-router-dom";

const HomePage = ({ client }) => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  /*const [schema, setSchema] = useState({});

  useEffect(() => {
    client
      .get(`getdata`)
      .then((response) => {
        setTableData(response.data);
        setSchema(response.schema);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);*/

  const schema = [
    { name: "ID", type: "number", subColumns: [] },
    { name: "Public/NonPublic", type: "string", subColumns: [] },
    {
      name: "Qty",
      type: "number",
      subColumns: [
        { name: "Public", type: "number" },
        { name: "Private", type: "number" },
      ],
    },
    { name: "Industry", type: "string", subColumns: [] },
    {
      name: "Types",
      type: "string",
      subColumns: [
        { name: "Taste", type: "string" },
        { name: "Colour", type: "string" },
        { name: "Smell", type: "string" },
      ],
    },
    { name: "Edit", type: "button", subColumns: [] },
  ];

  const data = [
    [1, "Public", [5, 10], "Cooking", ["Sweet", "Green", "Pungent"]],
    [2, "Public", [6, 20], "Baking", ["Sour", "Blue", "Pleasant"]],
    [3, "NonPublic", [5, 5], "Cooking", ["Spicy", "Green", "None"]],
  ];

  const onEdit = (id) => {
    navigate(`/editrow/${id}`);
  };

  return <Table schema={schema} data={tableData} onEdit={onEdit} />;
};

export default HomePage;
