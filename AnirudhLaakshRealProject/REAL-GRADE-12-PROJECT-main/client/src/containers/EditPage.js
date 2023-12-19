import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditRow = ({ client }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [rowData, setRowData] = useState(null);

  useEffect(() => {
    client
      .get(`getrow/${id}`)
      .then((response) => {
        setRowData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    client
      .post(`postrow/${id}`, rowData)
      .then((response) => {
        console.log("Row updated: ", response.data);
        navigate("/home");
      })
      .catch((error) => {
        console.error("Error updating row: ", error);
      });
  };

  if (!rowData) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <table>
        <tbody>
          {Object.keys(rowData).map((key) => {
            if (Array.isArray(rowData[key])) {
              return rowData[key].map((subValue, index) => (
                <tr key={`${key}-${index}`}>
                  <td>{key}</td>
                  <td>
                    {Array.isArray(subValue) ? (
                      subValue.map((subSubValue, subIndex) =>
                        index === 0 ? (
                          <>{subSubValue}&#9;&#9;&#9;&#9;</>
                        ) : (
                          <input
                            type="text"
                            value={subSubValue}
                            onChange={(e) => {
                              const newValue = [...rowData[key]];
                              newValue[index][subIndex] = e.target.value;
                              setRowData({
                                ...rowData,
                                [key]: newValue,
                              });
                            }}
                          />
                        )
                      )
                    ) : index === 0 ? (
                      <p>{subValue}</p>
                    ) : (
                      <input
                        type="text"
                        value={subValue}
                        onChange={(e) => {
                          const newValue = [...rowData[key]];
                          newValue[index] = e.target.value;
                          setRowData({
                            ...rowData,
                            [key]: newValue,
                          });
                        }}
                      />
                    )}
                  </td>
                </tr>
              ));
            } else {
              return (
                <tr key={key}>
                  <td>{key}</td>
                  <td>
                    <input
                      type="text"
                      value={rowData[key]}
                      onChange={(e) =>
                        setRowData({
                          ...rowData,
                          [key]: e.target.value,
                        })
                      }
                    />
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
      <button type="submit">Submit</button>
    </form>
  );
};

export default EditRow;
