import React, { useState, useEffect, useRef } from "react";
import {formatCurrency} from "../helper"
import { useHistory } from "react-router-dom";
import Share from "./Share";
import {
  useEditItemMutation,
  useDeleteItemMutation,
} from "../services/itemsApi";

const ItemBox = ({ item }) => {
  const buttonRef = useRef();
  const history = useHistory();
  const [dropdown, setDropdown] = useState(false);
  const [pauseItem, { isLoading: pausing, isSuccess: paused }] =
    useEditItemMutation();

  const [deleteItem, { isLoading: deleting, isSuccess: deleted }] =
    useDeleteItemMutation();

  const handleNavigateToRentalPage = (slug) => {
    history.push(`/rental/${slug}`);
  };

  useEffect(() => {
    deleted && buttonRef.current.click();
    deleted && history.push("/profile");
  }, [deleted]);

  return (
    <div
      className="tw-relative tw-h-[280px]  tw-w-[290px] md:tw-w-[250px]  tw-p-2 !tw-border tw-border-black tw-shadow-md tw-rounded-md tw-flex tw-flex-col tw-space-y-1 tw-justify-center"
      key={item.id}
    >
      <div className="tw-absolute tw-top-2 tw-right-1">
        <div
          onClick={() => setDropdown(!dropdown)}
          className=" tw-border tw-border-black tw-rounded-full tw-p-0.5 tw-cursor-pointer tw-bg-white tw-shadow-md tw-flex tw-items-center tw-justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="tw-h-4 tw-w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            />
          </svg>
        </div>
      </div>
      {dropdown ? (
        <div className="tw-absolute tw-w-16 tw-rounded-sm tw-top-5 tw-right-2 tw-bg-white tw-shadow-lg tw-flex tw-flex-col  tw-p-0.5 ">
          <div
            onClick={() => history.push(`/edit-item/${item.slug}`)}
            className="tw-w-full hover:tw-bg-green-600 tw-pl-1 !tw-h-4 tw-flex tw-justify-start tw-cursor-pointer hover:tw-text-white"
          >
            <p>Edit</p>
          </div>{" "}
          <button
            className="tw-bg-white !tw-outline-none !tw-border-none tw-w-full hover:tw-bg-green-600 tw-pl-1 !tw-h-4 tw-flex tw-justify-start tw-cursor-pointer hover:tw-text-white"
            data-bs-toggle="modal"
            data-bs-target={`#share${item.id}`}
          >
            Share
          </button>
          <div
            onClick={() =>
              pauseItem({
                id: item.id,
                body: {
                  is_available: !item.is_available,
                },
              })
            }
            className="tw-w-full hover:tw-bg-green-600 tw-pl-1 !tw-h-4 tw-flex tw-justify-start tw-cursor-pointer hover:tw-text-white"
          >
            {pausing ? (
              <div
                className="spinner-border tw-w-4 tw-h-4 tw-bg-gray-700"
                role="status"
              >
                <span className="sr-only tw-hidden">Loading...</span>
              </div>
            ) : (
              <p>{item.is_available ? "Pause" : "Unpause"}</p>
            )}
          </div>
          <button
            className="tw-bg-white !tw-outline-none !tw-border-none tw-w-full hover:tw-bg-red-600 tw-pl-1 !tw-h-4 tw-flex tw-justify-start tw-cursor-pointer hover:tw-text-white"
            data-bs-toggle="modal"
            data-bs-target={`#delete${item.id}`}
          >
            Delete
          </button>
        </div>
      ) : null}
      <div onClick={() => handleNavigateToRentalPage(item.slug)}>
        <img
          src={`${item.imagesCdnUrl}nth/${0}/`}
          className="tw-w-full object-cover tw-h-[150px] tw-rounded-md tw-cursor-pointer"
          alt={item.title}
        />
        <h6 className="tw-text-xl"> {item.title} </h6>
        <p className="ps-1">{formatCurrency(item.daily_price)} / day </p>
      </div>
      <div className="modal  fade" id={`share${item.id}`}>
        <div className="modal-dialog modal-md modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down">
          <div className="modal-content">
            <Share slug={item.slug} />
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id={`delete${item.id}`}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              Are you sure you want to delete this item?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                data-bs-target={`#delete${item.id}`}
                ref={buttonRef}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => deleteItem(item.id)}
              >
                {deleting ? "Loading..." : "Delete Item"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemBox;
