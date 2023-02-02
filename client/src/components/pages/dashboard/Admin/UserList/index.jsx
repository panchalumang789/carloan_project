import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import customerService from "services/customerServices";
import LoadingPage from "components/pages/journey/extra/LoadingPage";
import useDebound from "useDebounce";
import {
  inputClasses,
  selectClasses,
} from "components/pages/journey/extra/Widget";

const UserList = () => {
  const [Users, setUsers] = useState([]);
  const [Loading, setLoading] = useState(true);
  let pageLimit = 5;
  const [limit, setlimit] = useState(5);
  const [page, setpage] = useState(1);
  const [search, setSearch] = useState("");
  const [Error, setError] = useState("");
  const [length, setlength] = useState();
  const searchName = useDebound(search, 700);
  useEffect(() => {
    let loadingtime;
    const userService = new customerService();
    (async () => {
      const { output, error } = await userService.getUser({
        limit: limit,
        offset: page,
        name: searchName,
        headerData: localStorage.getItem("token"),
      });
      console.log(output);
      if (error) {
        setError(error.data.message);
      } else {
        setLoading(true);
        loadingtime = setTimeout(() => {
          setLoading(false);
        }, 1000);
        document.getElementById("mainDiv").scrollTo(0, 0);
        setUsers(output.users);
        setlength(output.length);
      }
    })();
    return () => clearTimeout(loadingtime);
  }, [limit, page, searchName]);

  return (
    <div
      id="mainDiv"
      className="px-4 pt-4 pb-0 md:pb:0 lg:p-0 gap-y-3 flex flex-col h-[calc(100%-190px)] md:h-[calc(100%-190px)] lg:flex-row w-full gap-x-6 overflow-y-auto lg:overflow-y-hidden"
    >
      <div className="w-full h-full">
        <div className="h-16 md:h-10 flex m-1 justify-end gap-x-5">
          <div className="flex gap-2">
            <input
              type="text"
              value={search}
              className={
                inputClasses + " outline outline-1 outline-primary-color-1"
              }
              onChange={(e) => {
                setSearch(e.target.value);
                setlimit(5);
                setpage(1);
              }}
              placeholder="Search.."
            />
          </div>
        </div>
        <div
          id="userlist"
          className="flex flex-col mt-4 h-auto lg:h-[calc(100%-60px)] lg:overflow-auto"
        >
          {Loading ? (
            <div className="h-full w-full flex justify-center items-center mx-auto">
              <LoadingPage />
            </div>
          ) : (
            <>
              {Error !== "" ? (
                <div className="text-xl p-4 font-medium text-primary-color-1 dark:text-primary-color-7">
                  {Error}
                </div>
              ) : (
                <div>
                  <div>
                    <table className="w-full overflow-auto">
                      <thead className="uppercase text-lg">
                        <tr>
                          <th>User_id</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Contact-No</th>
                          <th>State</th>
                          <th>License-Number</th>
                          <th>License-Type</th>
                          <th>Registration Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Users.map((user, index) => {
                          return (
                            <tr
                              // onClick={() => gotoLoan(user.id)}
                              className="text-center hover:bg-primary-color-10"
                              key={index}
                            >
                              <td>
                                <Link
                                  key={index}
                                  to={`loans/${user.id}`}
                                  className="font-medium p-5"
                                >
                                  {user.id}
                                </Link>
                              </td>
                              <td>
                                {user.prefix} {user.firstName} {user.lastName}
                              </td>
                              <td>{user.email}</td>
                              <td>{user.contactNo}</td>
                              <td>{user.state}</td>
                              <td>{user.licenceNumber}</td>
                              <td>{user.licenceType}</td>
                              <td>
                                {
                                  new Date(user.createdAt)
                                    .toISOString()
                                    .split("T")[0]
                                }
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex justify-between py-4 px-8 md:px-20 font-semibold text-lg">
                    <div className="flex flex-col md:flex-row items-center gap-2">
                      Pages
                      <div>
                        {Array.from(
                          { length: Math.ceil(length / limit) },
                          (_, index) => (
                            <button
                              key={index}
                              className=" text-primary-color-1 dark:text-primary-color-5 aria-pressed:text-primary-color-4 aria-pressed:text-2xl dark:aria-pressed:text-primary-color-7 aria-pressed:scale-105 px-2 cursor-pointer"
                              aria-pressed={page === index + 1}
                              onClick={() => setpage(index + 1)}
                            >
                              {index + 1}
                            </button>
                          )
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-2 items-center">
                      <span className="text-base font-medium">Limit</span>
                      <select
                        className={
                          selectClasses +
                          " w-20 py-1 outline-2 outline outline-primary-color-1 dark:outline-primary-color-5"
                        }
                        defaultValue={limit}
                        onClick={(e) => {
                          setlimit(e.target.value);
                          setpage(1);
                        }}
                        name="pagelimit"
                        id="limit"
                      >
                        <option value="5">5</option>
                        {Array.from(
                          { length: Math.ceil(length) },
                          (_, index) => {
                            if (index + 1 >= pageLimit + 5) {
                              pageLimit += 5;
                              return (
                                <option key={index} value={index + 1}>
                                  {index + 1}
                                </option>
                              );
                            }
                            return false;
                          }
                        )}
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserList;
