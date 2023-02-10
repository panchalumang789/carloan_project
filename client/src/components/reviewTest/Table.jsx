import React, { useEffect, useState } from "react";
import Model from "./Model";

const Table = (props) => {
  const [empData, setEmpData] = useState([]);
  const [modelVisible, setModelVisible] = useState("hidden");
  const [user, setUser] = useState("");

  useEffect(() => {
    setEmpData(props.tableData);
    setModelVisible("hidden");
  }, [props]);

  return (
    <>
      <Model display={modelVisible} user={user} />
      <table className="border w-full border-black">
        <thead className="w-full">
          <tr className="w-full border border-black">
            <th className="uppercase w-1/3 border border-black px-4 py-2">
              NAME
            </th>
            <th className="uppercase w-1/3 border border-black px-4 py-2">
              DESIGNATION
            </th>
            <th className="uppercase w-1/3 border border-black px-4 py-2">
              REPORTING HEAD
            </th>
          </tr>
        </thead>
        <tbody>
          {empData.map((data, index) => {
            return (
              <tr key={index} className="border border-black px-4 py-2">
                <td className="border border-black px-4 py-2">
                  <button
                    onClick={(e) => {
                      setModelVisible("visible");
                      setUser(data);
                    }}
                  >
                    {data.name}
                  </button>
                </td>
                <td className="border border-black px-4 py-2">
                  {data.designation}
                </td>
                <td className="border border-black px-4 py-2">
                  {data.reporting_head}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Table;
