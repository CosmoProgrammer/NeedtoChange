import React from "react";

const DynamicTable = ({ schema, data, onEdit }) => {
  const buildHeaders = () => {
    return schema.map((column, i) => {
      return (
        <th key={i}>
          {column.name}
          {column.subColumns.length > 0 && (
            <tr>
              {column.subColumns.map((subColumn, j) => (
                <th key={`${i}-${j}`}>{subColumn.name}</th>
              ))}
            </tr>
          )}
        </th>
      );
    });
  };

  const buildBody = () => {
    return data.map((row, i) => {
      return (
        <tr key={i}>
          {schema.map((column, j) => {
            if (column.subColumns.length > 0) {
              return (
                <td key={`${i}-${j}`}>
                  <tr>
                    {column.subColumns.map((subColumn, k) => (
                      <td key={`${i}-${j}-${k}`}>{row[j][k]}</td>
                    ))}
                  </tr>
                </td>
              );
            } else if (column.name === "Edit") {
              return (
                <td key={`${i}-${j}`}>
                  <button onClick={() => onEdit(row[0])}>Edit</button>
                </td>
              );
            } else {
              return <td key={`${i}-${j}`}>{row[j]}</td>;
            }
          })}
        </tr>
      );
    });
  };

  return (
    <table>
      <thead>
        <tr>{buildHeaders()}</tr>
      </thead>
      <tbody>{buildBody()}</tbody>
    </table>
  );
};

export default DynamicTable;
