import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import loanService from "services/loanService";
import {
  errorToast,
  inputClasses,
  selectClasses,
  successToast,
} from "components/pages/journey/extra/Widget";
import { ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import LoadingPage from "components/pages/journey/extra/LoadingPage";
window.Swal = Swal;

const LoanDetails = (props) => {
  const updateService = new loanService();
  const [loanDetails, setLoanData] = useState({});
  const [Editing, setEditing] = useState(false);
  const [Submitting, setSubmitting] = useState(false);
  const [ApplyDate, setApplyDate] = useState("");
  const [Loading, setLoading] = useState(false);
  const [Agents, setAgents] = useState([]);
  const {
    register,
    getValues,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  useEffect(() => {
    (async () => {
      const { output, error } = await updateService.getAgent({
        headerData: localStorage.getItem("token"),
      });
      if (!output) {
        errorToast(error.message);
      } else {
        setAgents(output);
      }
    })();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setLoanData(props.LoanDetails);
    setValue("userId", props.LoanDetails.userId);
    setValue("carId", props.LoanDetails.carId);
    setValue("status", props.LoanDetails.status);
    setValue("approx_price", props.LoanDetails.approx_price);
    setValue("deposit", props.LoanDetails.deposit);
    setValue("term", props.LoanDetails.term);
    setValue("balloon", props.LoanDetails.balloon);
    setValue("user_status", props.LoanDetails.user_status);
    setValue("user_income", props.LoanDetails.user_income);
    // eslint-disable-next-line
  }, [props, setValue]);

  useEffect(() => {
    let change = false;
    const preData = watch();
    Object.keys(preData).forEach((i) => {
      if (preData[i] !== loanDetails[i]) {
        change = true;
      }
    });
    if (change) {
      setSubmitting(true);
    } else {
      setSubmitting(false);
    }
    // eslint-disable-next-line
  }, [watch()]);

  useEffect(() => {
    setValue("agentId", loanDetails.agentId);
    if (loanDetails.createdAt) {
      setApplyDate(loanDetails.createdAt.split("T")[0]);
    }
  }, [Agents, setValue, loanDetails.createdAt, loanDetails.agentId]);

  const updateLoan = async (data) => {
    const { output, error } = await updateService.updateLoan({
      loanId: props.LoanDetails.id,
      bodyData: data,
      headerData: localStorage.getItem("token"),
    });
    if (!output) {
      errorToast(error.message);
      errorToast(error.data.message);
    } else {
      successToast(output.message);
      props.UpdateLoan();
      setEditing(false);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const submitLoan = async (data) => {
    setLoading(true);
    if (data.status === "Approved") {
      Swal.fire({
        title: "Do you want to change loan status?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonColor: "#EB5757",
        confirmButtonColor: "#41aa76",
      }).then((result) => {
        if (result.isConfirmed) {
          (async () => {
            const { output, error } = await updateService.sendMail({
              loanId: props.LoanDetails.id,
            });
            if (!output) {
              errorToast(error.data.message);
            } else {
              if (output.mailstatus) {
                successToast(output.mailstatus);
              }
            }
            updateLoan(data);
          })();
        } else {
          setLoading(false);
        }
      });
    } else {
      updateLoan(data);
    }
  };

  return (
    <div className="w-full border-2 rounded-md flex flex-col gap-y-3 md:h-full md:overflow-y-auto border-primary-color-1 dark:border-primary-color-10 p-4">
      {Loading ? (
        <div className="h-full w-full flex justify-center items-center mx-auto relative">
          <LoadingPage />
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(submitLoan)}
          className="flex flex-col gap-5"
        >
          <ToastContainer />
          <div className="grid md:grid-cols-2 gap-5 px-2">
            <input type="hidden" {...register("userId")} />
            <input type="hidden" {...register("carId")} />
            <div className="font-medium text-xl flex gap-x-2 items-center">
              <span className="font-normal w-1/3 md:w-1/4">Loan id:</span>
              <div className="flex flex-col w-1/2 md:w-3/5">
                <input
                  className={
                    inputClasses +
                    " disabled:bg-primary-color-9/10 disabled:hover:cursor-not-allowed"
                  }
                  type="number"
                  disabled
                  value={loanDetails.id || ""}
                />
              </div>
            </div>
            <div className="font-medium text-xl flex gap-x-2 items-center">
              <span className="font-normal w-1/3 md:w-1/4">Status:</span>
              <div className="flex flex-col w-1/2 md:w-3/5">
                <select
                  id="status"
                  disabled={!Editing}
                  className={
                    selectClasses +
                    " dark:border-2 dark:border-primary-color-7 dark:bg-primary-color-9 disabled:bg-primary-color-9/10 disabled:hover:cursor-not-allowed"
                  }
                  {...register("status")}
                >
                  <option value="In progress">In progress</option>
                  <option value="In review">In review</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>
            <div className="font-medium text-xl flex gap-x-2 items-center">
              <span className="font-normal w-1/3 md:w-1/4">Approx Amount:</span>
              <div className="flex flex-col w-1/2 md:w-3/5">
                <div className="relative input-group-prepend">
                  <span
                    className="ml-4 my-2 absolute text-lg"
                    id="basic-addon1"
                  >
                    &#x20B9;
                  </span>
                </div>
                <input
                  className={
                    inputClasses +
                    " disabled:bg-primary-color-9/10 disabled:hover:cursor-not-allowed pl-10"
                  }
                  type="number"
                  disabled={!Editing}
                  {...register("approx_price", {
                    valueAsNumber: true,
                    required: "Please enter approx amount!",
                    min: {
                      value: 0,
                      message: "Approx amount should be greater than 0!",
                    },
                    max: {
                      value: 1000000000,
                      message:
                        "Approx amount should be less than 1,00,00,00,000!",
                    },
                  })}
                />
                {errors.approx_price && (
                  <span className="text-red-500 pt-1 px-1 text-sm">
                    {errors.approx_price?.message}
                  </span>
                )}
              </div>
            </div>
            <div className="font-medium text-xl flex gap-x-2 items-center">
              <span className="font-normal w-1/3 md:w-1/4">Deposit:</span>
              <div className="flex flex-col w-1/2 md:w-3/5">
                <div className="relative input-group-prepend">
                  <span
                    className="ml-4 my-2 absolute text-lg"
                    id="basic-addon2"
                  >
                    &#x20B9;
                  </span>
                </div>
                <input
                  className={
                    inputClasses +
                    " disabled:bg-primary-color-9/10 disabled:hover:cursor-not-allowed pl-10"
                  }
                  type="number"
                  disabled={!Editing}
                  {...register("deposit", {
                    required: "Please enter deposit amount!",
                    valueAsNumber: true,
                    min: {
                      value: 0,
                      message: "Deposit should be greater than 0!",
                    },
                    validate: () =>
                      Number(getValues("deposit")) <
                      Number(getValues("approx_price")),
                    max: {
                      value: 1000000000,
                      message: "Deposit should be less than 1,00,00,00,000!",
                    },
                  })}
                />
                {errors.deposit && (
                  <span className="text-red-500 pt-1 px-1 text-sm">
                    {errors.deposit?.message}
                  </span>
                )}
                {errors.deposit?.type === "validate" && (
                  <span className="text-red-500 pt-1 px-1 text-sm">
                    Deposit should be less than Approx Amount
                  </span>
                )}
              </div>
            </div>
            <div className="font-medium text-xl flex gap-x-2 items-center">
              <span className="font-normal w-1/3 md:w-1/4">Term:</span>
              <div className="flex flex-col w-1/2 md:w-3/5">
                <select
                  id="term"
                  className={
                    selectClasses +
                    " disabled:bg-primary-color-9/10 disabled:hover:cursor-not-allowed"
                  }
                  disabled={!Editing}
                  {...register("term", {
                    required: "Please select loan term!",
                    valueAsNumber: true,
                  })}
                >
                  <option disabled value="">
                    Select loan term
                  </option>
                  <option value="1">1 year</option>
                  <option value="2">2 years</option>
                  <option value="3">3 years</option>
                  <option value="4">4 years</option>
                  <option value="5">5 years</option>
                  <option value="6">6 years</option>
                  <option value="7">7 years</option>
                  <option value="8">8 years</option>
                  <option value="9">9 years</option>
                  <option value="10">10 years</option>
                </select>
                {errors.term && (
                  <span className="text-red-500 pt-1 px-1 text-sm">
                    {errors.term?.message}
                  </span>
                )}
              </div>
            </div>
            <div className="font-medium text-xl flex gap-x-2 items-center">
              <span className="font-normal w-1/3 md:w-1/4">Balloon:</span>
              <div className="flex flex-col w-1/2 md:w-3/5">
                <div className="relative ml-auto input-group-prepend">
                  <span
                    className="-ml-8 my-1.5 absolute text-lg"
                    id="basic-addon3"
                  >
                    &#x25;
                  </span>
                </div>
                <input
                  className={
                    inputClasses +
                    " disabled:bg-primary-color-9/10 disabled:hover:cursor-not-allowed"
                  }
                  type="number"
                  disabled={!Editing}
                  {...register("balloon", {
                    valueAsNumber: true,
                    min: {
                      value: 0,
                      message: "Balloon should be greater than 0!",
                    },
                    max: {
                      value: 35,
                      message: "Balloon should be less than 35!",
                    },
                  })}
                />
                {errors.balloon && (
                  <span className="text-red-500 pt-1 px-1 text-sm">
                    {errors.balloon?.message}
                  </span>
                )}
              </div>
            </div>
            <div className="font-medium text-xl flex gap-x-2 items-center">
              <span className="font-normal w-1/3 md:w-1/4">User status:</span>
              <div className="flex flex-col w-1/2 md:w-3/5">
                <select
                  className={
                    selectClasses +
                    " disabled:bg-primary-color-9/10 disabled:hover:cursor-not-allowed"
                  }
                  disabled={!Editing}
                  {...register("user_status", {
                    required: "Please select your work status!",
                  })}
                >
                  <option value="" disabled>
                    Select work status
                  </option>
                  <option value="Employee">I am an Employed</option>
                  <option value="Unemployed">I am an Unemployed</option>
                </select>
                {errors.user_status && (
                  <span className="text-red-500 pt-1 px-1 text-sm">
                    {errors.user_status?.message}
                  </span>
                )}
              </div>
            </div>
            <div className="font-medium text-xl flex gap-x-2 items-center">
              <span className="font-normal w-1/3 md:w-1/4">User income:</span>
              <div className="flex flex-col w-1/2 md:w-3/5">
                <div className="relative input-group-prepend">
                  <span
                    className="ml-4 my-2 absolute text-lg"
                    id="basic-addon4"
                  >
                    &#x20B9;
                  </span>
                </div>
                <input
                  type="number"
                  className={
                    inputClasses +
                    " disabled:bg-primary-color-9/10 disabled:hover:cursor-not-allowed pl-10"
                  }
                  disabled={!Editing}
                  {...register("user_income", {
                    valueAsNumber: true,
                    required: "Please enter your income!",
                    min: {
                      value: 0,
                      message: "Income should be greater than 0!",
                    },
                    max: {
                      value: 1000000000,
                      message: "Income should be less than 1,00,00,00,000!",
                    },
                  })}
                />
                {errors.user_income && (
                  <span className="text-red-500 pt-1 px-1 text-sm">
                    {errors.user_income?.message}
                  </span>
                )}
              </div>
            </div>
            <div className="font-medium text-xl flex gap-x-2 items-center">
              <span className="font-normal w-1/3 md:w-1/4">Apply date:</span>
              <div className="flex flex-col w-1/2 md:w-3/5">
                <input
                  type="date"
                  value={ApplyDate}
                  className={
                    inputClasses +
                    " disabled:bg-primary-color-9/10 disabled:hover:cursor-not-allowed"
                  }
                  disabled
                />
              </div>
            </div>
            <div className="font-medium text-xl flex gap-x-2 items-center">
              <span className="font-normal w-1/3 md:w-1/4">Agent :</span>
              <div className="flex flex-col w-1/2 md:w-3/5">
                <select
                  id="agent"
                  className={
                    selectClasses +
                    " disabled:bg-primary-color-9/10 disabled:hover:cursor-not-allowed"
                  }
                  disabled={!Editing}
                  {...register("agentId", {
                    required: "Please select agent!",
                    valueAsNumber: true,
                  })}
                >
                  <option value="" disabled>
                    Select agent
                  </option>
                  {Agents.map((agent, index) => {
                    return (
                      <option key={index} value={agent.id}>
                        {agent.firstName} {agent.lastName}
                      </option>
                    );
                  })}
                </select>
                {errors.agentId && (
                  <span className="text-red-500 pt-1 px-1 text-sm">
                    {errors.agentId?.message}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="w-full flex justify-end px-36 gap-4">
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="group font-medium flex items-center justify-center gap-x-2 w-16 hover:font-semibold text-center p-2 border border-primary-color-1 bg-primary-color-7 hover:bg-white dark:bg-primary-color-9 dark:hover:bg-primary-color-8 rounded-md dark:border-2 dark:border-primary-color-3"
            >
              Edit
            </button>
            <button
              type="submit"
              disabled={!Submitting}
              className="group font-medium flex items-center justify-start gap-x-2 w-28 text-center p-2 border border-primary-color-1 dark:bg-primary-color-9 bg-primary-color-7 hover:bg-white dark:hover:bg-primary-color-8 rounded-md dark:border-2 dark:border-primary-color-3 disabled:bg-primary-color-9/10 disabled:hover:cursor-not-allowed"
            >
              SUBMIT
              <em className="group-hover:ml-2 transition-all duration-200 text-xl fa fa-arrow-right" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default LoanDetails;
