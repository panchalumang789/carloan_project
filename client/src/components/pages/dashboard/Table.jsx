import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Table = (props) => {
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    setTableData(props.tableData);
    return () => {};
  }, [props]);
  console.log(Object.keys(tableData));
  return (
    <table className="w-full overflow-auto bg-white dark:bg-primary-color-9 border border-collapse">
      <thead className="uppercase text-lg">
        <tr className="border border-primary-color-1 dark:border-primary-color-5">
          <th className="border border-primary-color-1 dark:border-primary-color-5">
            loan_id
          </th>
          <th className="border border-primary-color-1 dark:border-primary-color-5">
            car_Id
          </th>
          <th className="border border-primary-color-1 dark:border-primary-color-5">
            user_Id
          </th>
          <th className="border border-primary-color-1 dark:border-primary-color-5">
            approx_price
          </th>
          <th className="border border-primary-color-1 dark:border-primary-color-5">
            deposit
          </th>
          <th className="border border-primary-color-1 dark:border-primary-color-5">
            term
          </th>
          <th className="border border-primary-color-1 dark:border-primary-color-5">
            balloon
          </th>
          <th className="border border-primary-color-1 dark:border-primary-color-5">
            user_status
          </th>
          <th className="border border-primary-color-1 dark:border-primary-color-5">
            user_income
          </th>
          <th className="border border-primary-color-1 dark:border-primary-color-5">
            agent_Id
          </th>
          <th className="border border-primary-color-1 dark:border-primary-color-5">
            status
          </th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((data, index) => {
          return (
            <tr
              className="text-center hover:bg-primary-color-10 dark:hover:bg-primary-color-8 border-primary-color-1 dark:border-primary-color-5"
              key={index}
            >
              <td className="border border-primary-color-1 dark:border-primary-color-5">
                <Link
                  state={props.role}
                  key={index}
                  to={`loan/${data.id}`}
                  className="font-medium text-primary-color-6 dark:text-primary-color-7 text-xl p-5"
                >
                  {data.id}
                </Link>
              </td>
              <td className="border border-primary-color-1 dark:border-primary-color-5">
                {data.carId}
              </td>
              <td className="border border-primary-color-1 dark:border-primary-color-5">
                {data.userId}
              </td>
              <td className="border border-primary-color-1 dark:border-primary-color-5">
                {data.approx_price}
              </td>
              <td className="border border-primary-color-1 dark:border-primary-color-5">
                {data.deposit}
              </td>
              <td className="border border-primary-color-1 dark:border-primary-color-5">
                {data.term}
              </td>
              <td className="border border-primary-color-1 dark:border-primary-color-5">
                {data.balloon}
              </td>
              <td className="border border-primary-color-1 dark:border-primary-color-5">
                {data.user_status}
              </td>
              <td className="border border-primary-color-1 dark:border-primary-color-5">
                {data.user_income}
              </td>
              <td className="border border-primary-color-1 dark:border-primary-color-5">
                {data.agentId || "NULL"}
              </td>
              <td className="border border-primary-color-1 dark:border-primary-color-5">
                {data.status}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
