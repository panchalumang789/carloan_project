import { useEffect, useState } from "react";
import empData from "./data.json";

const Model = (props) => {
  const [display, setDisplay] = useState("hidden");
  const [employeeData, setEmployeeData] = useState([]);
  const [modelData, setModelData] = useState([]);

  useEffect(() => {
    setEmployeeData(empData.emp_data);
    return () => {};
    // eslint-disable-next-line
  }, [empData]);

  useEffect(() => {
    setDisplay(props.display);
    return () => {};
  }, [props]);

  useEffect(() => {
    let temp = [];
    employeeData.filter((data) => {
      if (data.reporting_head === props.user.name) {
        return temp.push(data);
      } else return false;
    });
    setModelData(temp);
    // eslint-disable-next-line
  }, [props]);

  const closeModel = () => {
    setDisplay("hidden");
  };

  return (
    <div
      className={
        display +
        " fixed h-auto w-auto top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] bg-white p-4 rounded-md border border-black"
      }
    >
      <div className="max-w-screen-lg w-full flex flex-col gap-3 justify-end">
        <div className="flex justify-between items-center">
          <div>
            <div>
              Name: <span className="font-medium">{props.user.name}</span>
            </div>
            <div>
              Designation:{" "}
              <span className="font-medium">{props.user.designation}</span>
            </div>
            <div>
              Reporting Head:{" "}
              <span className="font-medium">{props.user.reporting_head}</span>
            </div>
          </div>
          <button
            className="border border-black px-3 ml-auto py-2 w-16 h-10"
            onClick={closeModel}
          >
            Close
          </button>
        </div>
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
            {modelData.map((data, index) => {
              return (
                <tr key={index} className="border border-black px-4 py-2">
                  <td className="border border-black px-4 py-2">{data.name}</td>
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
      </div>
    </div>
  );
};

export default Model;
