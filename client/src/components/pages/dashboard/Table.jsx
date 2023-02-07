import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Table = (props) => {
  const [tableData, setTableData] = useState([]);
  const [tableKeys, setTableKeys] = useState([]);
  useEffect(() => {
    setTableData(props.tableData);
    setTableKeys(props.tableKeys);
    return () => {};
  }, [props]);
  return (
    <table className="w-full overflow-auto bg-white dark:bg-primary-color-9 border border-collapse">
      <thead className="uppercase text-lg">
        <tr className="border border-primary-color-1 dark:border-primary-color-5">
          {tableKeys.map((key, index) => {
            if (key === "id") {
              return (
                <th
                  key={index}
                  className="border border-primary-color-1 dark:border-primary-color-5 px-5 py-2"
                >
                  {key}
                </th>
              );
            }
            return (
              <th
                key={index}
                className="border border-primary-color-1 dark:border-primary-color-5 px-5 py-2"
              >
                {key}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {tableData.map((data, index) => {
          return (
            <tr
              className="text-center hover:bg-primary-color-10 dark:hover:bg-primary-color-8 border-primary-color-1 dark:border-primary-color-5"
              key={index}
            >
              {tableKeys.map((key, index) => {
                if (key === "id") {
                  return (
                    <td
                      key={index}
                      className="border border-primary-color-1 dark:border-primary-color-5 relative"
                    >
                      <Link
                        state={props.role}
                        to={`loan/${data.id}`}
                        className="font-medium text-primary-color-6 grid place-content-center dark:text-primary-color-7 text-lg absolute top-0 left-0 w-full h-full hover:text-xl"
                      >
                        {data.id}
                      </Link>
                    </td>
                  );
                } else {
                  return (
                    <td
                      key={index}
                      className="border border-primary-color-1 dark:border-primary-color-5"
                    >
                      {data[key]}
                    </td>
                  );
                }
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
