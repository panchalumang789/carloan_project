import React from "react";
import { useEffect } from "react";
import customerService from "services/customerServices";
import LoanListUser from "./User/LoanList/index";
import LoanListAdmin from "./Admin/LoanList/index";
import { useState } from "react";

const LoanList = () => {
  const [role, setRole] = useState("");
  useEffect(() => {
    const userService = new customerService();
    if (localStorage.getItem("token")) {
      (async () => {
        const findUser = await userService.verifyToken({
          headerData: localStorage.getItem("token"),
        });
        setRole(findUser.role);
      })();
    }
    return () => {};
  }, []);

  if (!role) return <div className="fixed inset-0 bg-primary-color-5"></div>;

  return role === "Admin" || role === "Agent" ? (
    <LoanListAdmin  />
  ) : (
    <LoanListUser />
  );
};
export default LoanList;
