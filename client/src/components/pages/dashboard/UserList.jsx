import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import customerService from "services/customerServices";
import LoadingPage from "components/pages/journey/extra/LoadingPage";
import { selectClasses } from "components/pages/journey/extra/Widget";

const UserList = () => {
  const [Users, setUsers] = useState([]);
  const [Loading, setLoading] = useState(true);
  let pageLimit = 5;
  const [limit, setlimit] = useState(5);
  const [page, setpage] = useState(1);
  const [length, setlength] = useState();
  useEffect(() => {
    let loadingtime;
    const userService = new customerService();
    (async () => {
      const { output, error } = await userService.getUser({
        limit: limit,
        offset: page,
        headerData: localStorage.getItem("token"),
      });
      if (error) {
        console.log(error);
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
  }, [limit, page]);

  return (
    <div
      id="mainDiv"
      className="px-4 pt-4 pb-0 md:pb:0 lg:p-0 gap-y-3 border-2 border-primary-color-1 dark:border-primary-color-7 rounded-md flex flex-col h-[calc(100%-210px)] md:h-[calc(100%-190px)] lg:flex-row w-full gap-x-6 overflow-y-auto"
    >
      {Loading ? (
        <div className="h-full w-full flex justify-center items-center mx-auto">
          <LoadingPage />
        </div>
      ) : (
        <div className="flex flex-col w-full h-full">
          {Users.map((user, index) => {
            return (
              <div
                key={index}
                className="w-full transition-all duration-500 text-primary-color-1 border-b-2 dark:text-primary-color-7 px-2 md:px-6 py-2 md:py-4 border-primary-color-1 dark:border-primary-color-7"
              >
                <div className="flex flex-col md:flex-row justify-between">
                  <p className="font-medium">
                    User id :<span className="font-semibold">{user.id}</span>
                  </p>
                  <p className="font-medium">
                    Contact-No :
                    <span className="font-semibold"> {user.contactNo}</span>
                  </p>
                </div>
                <div className="pt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-user-display items-center mx-4">
                  <div className="order-1">
                    <span className="flex gap-1">
                      Name :
                      <p className="font-medium uppercase">
                        {user.prefix} {user.firstName} {user.lastName}
                      </p>
                    </span>
                    <span className="flex gap-1">
                      Email :<p className="font-medium">{user.email}</p>
                    </span>
                    <span className="flex gap-1">
                      State :<p className="font-medium">{user.state}</p>
                    </span>
                  </div>
                  <div className="order-2 md:order-3 lg:order-2">
                    <span className="flex gap-1">
                      Licensenumber :
                      <p className="font-medium">{user.licenceNumber}</p>
                    </span>
                    <span className="flex gap-1">
                      License Issue State :
                      <p className="font-medium">{user.licenceIssueState}</p>
                    </span>
                    <span className="flex gap-1">
                      License-Type :
                      <p className="font-medium">{user.licenceType}</p>
                    </span>
                  </div>
                  <Link
                    to={`loans/${user.id}`}
                    className="group order-3 md:order-2 lg:order-3 ml-auto font-medium flex items-center justify-start gap-x-2 mt-2 mb:mt-0 mb-1 mb:mb-0 w-36 h-fit text-center px-3 py-2 border-2 border-primary-color-1 dark:bg-primary-color-9 dark:hover:bg-primary-color-8 rounded-md dark:border-primary-color-5 hover:bg-white/40"
                  >
                    View loans
                    <em className="group-hover:ml-2 transition-all duration-200 text-xl fa fa-arrow-right" />
                  </Link>
                </div>
              </div>
            );
          })}
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
                {Array.from({ length: Math.ceil(length) }, (_, index) => {
                  if (index + 1 >= pageLimit + 5) {
                    pageLimit += 5;
                    return (
                      <option key={index} value={index + 1}>
                        {index + 1}
                      </option>
                    );
                  }
                  return false;
                })}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
