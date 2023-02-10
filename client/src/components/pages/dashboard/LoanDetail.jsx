import React from "react";
import { useEffect } from "react";
import customerService from "services/customerServices";
import LoanDetailUser from "./User/LoanDetail/index";
import LoanDetailAdmin from "./Admin/LoanDetail/index";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const LoanList = () => {
  const location = useLocation();
  const { state } = location;
  const [role, setRole] = useState("");
  useEffect(() => {
    const userService = new customerService();
    if (localStorage.getItem("token")) {
      (async () => {
        const findUser = await userService.verifyRole({
          headerData: localStorage.getItem("token"),
        });
        setRole(findUser.role);
      })();
    }
    return () => {};
  }, []);

  if (!role) return <div className="fixed inset-0 bg-primary-color-5"></div>;

  return role === "Admin" || role === "Agent" ? (
    <LoanDetailAdmin role={state} />
  ) : (
    <LoanDetailUser />
  );
};
export default LoanList;
