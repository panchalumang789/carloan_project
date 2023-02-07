import React, { useEffect, useState } from "react";
import empData from "./data.json";
import Table from "./Table";

export default function CodingTest() {
  const [employeeData, setEmployeeData] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [tableData, setTableData] = useState([]);

  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    let des = [];
    empData.emp_data.sort((a, b) =>
      a.name > b.name ? 1 : a.name < b.name ? -1 : 0
    );
    setEmployeeData(empData.emp_data);
    setTableData(empData.emp_data);

    empData.emp_data.map((data) => {
      if (des.indexOf(data.designation) === -1) {
        return des.push(data.designation);
      } else return false;
    });
    setDesignations(des);

    return () => {};
  }, []);

  const searchByName = () => {
    let temp = [];
    if (search !== "") {
      employeeData.filter((data) => {
        if (data.name.toLowerCase().includes(search.toLowerCase())) {
          return temp.push(data);
        } else return false;
      });
    }
    return temp;
  };

  const searchByDesignation = (data) => {
    let temp = [];

    if (designation !== "") {
      if (data.length <= 0) {
        employeeData.filter((data) => {
          if (data.designation.includes(designation)) {
            return temp.push(data);
          } else return false;
        });
      } else {
        data.filter((data) => {
          if (data.designation.includes(designation)) {
            return temp.push(data);
          } else return false;
        });
      }
    } else {
      if (data.length <= 0) {
        temp.push(...employeeData);
      } else temp.push(...data);
    }
    console.log("tempData", temp);

    return temp;
  };

  const filterByName = (data) => {
    let temp = [];
    if (name === "asc" || name === "") {
      data.sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0));
      temp.push(...data);
    } else {
      data.sort((a, b) => (a.name < b.name ? 1 : a.name > b.name ? -1 : 0));
      temp.push(...data);
    }
    return temp;
  };

  const searchData = () => {
    let nameData = searchByName();
    let designationData = searchByDesignation(nameData);
    let filterData = filterByName(designationData);

    setTableData(filterData);
  };

  return (
    <div className="bg-[#e3f6f5] h-screen w-screen flex justify-center">
      <div className="fixed flex flex-col top-32 max-w-screen-2xl gap-y-5">
        <div className="flex justify-end gap-x-4">
          <select
            className="px-3 py-2 border border-black"
            onChange={(e) => setName(e.target.value)}
            defaultValue="asc"
          >
            <option value="asc">Ascending</option>
            <option value="dsc">Descending</option>
          </select>
          <select
            className="px-3 py-2 border border-black"
            defaultValue={""}
            onChange={(e) => setDesignation(e.target.value)}
          >
            <option value="">Select Designation</option>;
            {designations.map((des, index) => {
              return (
                <option key={index} value={des}>
                  {des}
                </option>
              );
            })}
          </select>
          <input
            type="text"
            className="px-3 py-2"
            placeholder="search.."
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="px-3 py-2 border border-black"
            onClick={searchData}
          >
            Search
          </button>
        </div>
        <div className="h-auto overflow-auto">
          <Table tableData={tableData} />
        </div>
      </div>
    </div>
  );
}
