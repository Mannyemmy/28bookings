import React, { useRef, useEffect } from "react";
import { formatCurrency } from "../../../helper";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useRequestWithdrawMutation } from "../../../services/usersApi";

const Withdraw = ({ user }) => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm();

  const closeRef = useRef();

  const [withdraw, { isLoading, isSuccess }] = useRequestWithdrawMutation();

  const onSubmit = async (data) => {
    if (data.amount > user.user_balance) {
      setError(
        "amount",
        { type: "custom", message: "Insufficient funds" },
        { shouldFocus: true }
      );
      return;
    }

    withdraw(data);
  };

  

  useEffect(() => {
    isSuccess && closeRef.current.click()
    isSuccess && alert("request will be processed in the next 24hrs")
  },[isSuccess])

  return (
    <>
      <button
        className="btn my-starts py-0 my-0 tw-whitespace-nowrap"
        data-bs-toggle="modal"
        data-bs-target="#withdraw"
      >
        Request Withdrawal
      </button>
      <div className="modal  fade" id="withdraw">
        <div className="modal-dialog modal-md modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down">
          <div className="modal-content">
            <div className="modal-header py-3 py-md-2">
              <h4 className="modal-title">
                {" "}
                Balance : {formatCurrency(user.user_balance)}{" "}
              </h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                ref={closeRef}
              ></button>
            </div>
            <div className="modal-body">
              {user.bank == "" && user.account_number == "" ? (
                <Link to={"/edit-profile"} className="!tw-text-sm ms-1">
                  Add Bank Details
                </Link>
              ) : (
                <form
                  className="w-100 m-0 p-0 edit-form"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="">
                    <label htmlFor="amount">
                      <span className="!tw-text-[14px]">
                        {" "}
                        Enter withdrawal amount{" "}
                      </span>
                    </label>
                    <div className="tw-flex tw-flex-col tw-space-y-1">
                      <input
                        id="amount"
                        type="number"
                        name="amount"
                        className="form-control "
                        step="1000"
                        required
                        {...register("amount")}
                        // onChange = {  handleEditFormChange }
                      />
                      {errors.amount && (
                        <span className="!tw-text-red-500 !tw-text-[10px]">
                          {errors.amount.message}
                        </span>
                      )}
                    </div>

                    <label htmlFor="account_number" className="mt-1">
                      <span className="tw-text-sm tw-text-[14px]">
                        Account Number
                      </span>
                    </label>
                    <input
                      id="account_number"
                      type="text"
                      name="account_number"
                      readOnly
                      className="form-control py-1"
                      value={user.account_number}
                      required
                      {...register("account_number")}
                      // onChange = {  handleEditFormChange }
                    />
                    <label htmlFor="bank" className="mt-1">
                      <span className="tw-text-sm tw-text-[14px]">Bank</span>
                    </label>
                    <input
                      id="bank"
                      type="text"
                      name="bank"
                      readOnly
                      className="form-control py-1"
                      value={user.bank}
                      required
                      {...register("bank")}
                      // onChange = {  handleEditFormChange }
                    />
                  </div>
                  <p className="status"></p>
                  <div className="d-flex update-data justify-content-end mb-4 border-top pt-2">
                    <div>
                      <button
                        className="btn btn-success px-3 me-2"
                        type="submit"
                      >
                        {isLoading ? "Loading..." : "Submit"}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Withdraw;
