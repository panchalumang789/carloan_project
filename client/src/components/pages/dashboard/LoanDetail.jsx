import React from "react";
import { useEffect } from "react";
import customerService from "services/customerServices";
import LoanDetailUser from "./User/LoanDetail/index";
import LoanDetailAdmin from "./Admin/LoanDetail/index";
import { useState } from "react";

const LoanList = () => {
  const [role, setRole] = useState("");
  const userService = new customerService();
  useEffect(() => {
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

  return role === "Admin" ? <LoanDetailAdmin /> : <LoanDetailUser />;
};
export default LoanList;
