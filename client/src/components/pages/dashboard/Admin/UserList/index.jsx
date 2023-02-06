import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import customerService from "services/customerServices";
import LoadingPage from "components/pages/journey/extra/LoadingPage";
import useDebound from "useDebounce";

const UserList = (props) => {
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
      const { output, error } = await userService.getUsers({
        limit: limit,
        offset: page,
        name: searchName,
        headerData: localStorage.getItem("token"),
      });
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
              className="outline outline-1 outline-primary-color-1 bg-white p-2 rounded-md dark:bg-primary-color-9 dark:text-primary-color-7 dark:placeholder:text-primary-color-5 text-primary-color-1 font-medium placeholder:text-primary-color-6 placeholder:opacity-60 dark:placeholder:opacity-90  dark:outline-primary-color-7"
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
                    <table className="w-full overflow-auto bg-white dark:bg-primary-color-9 border border-collapse">
                      <thead className="uppercase text-lg">
                        <tr className="border border-primary-color-1 dark:border-primary-color-5">
                          <th className="border border-primary-color-1 dark:border-primary-color-5">
                            User_id
                          </th>
                          <th className="border border-primary-color-1 dark:border-primary-color-5">
                            Name
                          </th>
                          <th className="border border-primary-color-1 dark:border-primary-color-5">
                            Email
                          </th>
                          <th className="border border-primary-color-1 dark:border-primary-color-5">
                            Contact-No
                          </th>
                          <th className="border border-primary-color-1 dark:border-primary-color-5">
                            State
                          </th>
                          <th className="border border-primary-color-1 dark:border-primary-color-5">
                            License-Number
                          </th>
                          <th className="border border-primary-color-1 dark:border-primary-color-5">
                            License-Type
                          </th>
                          <th className="border border-primary-color-1 dark:border-primary-color-5">
                            Registration Date
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {Users.map((user, index) => {
                          return (
                            <tr
                              // onClick={() => gotoLoan(user.id)}
                              className="text-center hover:bg-primary-color-10 dark:hover:bg-primary-color-8 border-primary-color-1 dark:border-primary-color-5"
                              key={index}
                            >
                              <td className="border border-primary-color-1 dark:border-primary-color-5 relative">
                                <Link
                                  key={index}
                                  to={`loans/${user.id}`}
                                  className="font-medium text-primary-color-6 grid place-content-center dark:text-primary-color-7 text-xl absolute top-0 left-0 w-full h-full hover:text-2xl"
                                >
                                  {user.id}
                                </Link>
                              </td>
                              <td className="border border-primary-color-1 dark:border-primary-color-5">
                                {user.prefix} {user.firstName} {user.lastName}
                              </td>
                              <td className="border border-primary-color-1 dark:border-primary-color-5">
                                {user.email}
                              </td>
                              <td className="border border-primary-color-1 dark:border-primary-color-5">
                                {user.contactNo}
                              </td>
                              <td className="border border-primary-color-1 dark:border-primary-color-5">
                                {user.state}
                              </td>
                              <td className="border border-primary-color-1 dark:border-primary-color-5">
                                {user.licenceNumber}
                              </td>
                              <td className="border border-primary-color-1 dark:border-primary-color-5">
                                {user.licenceType}
                              </td>
                              <td className="border border-primary-color-1 dark:border-primary-color-5">
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
                        className=" w-20 py-1 outline-2 outline outline-primary-color-1 bg-white p-2 rounded-md dark:bg-primary-color-9 dark:text-primary-color-7 text-primary-color-1 font-medium dark:outline-primary-color-7"
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
