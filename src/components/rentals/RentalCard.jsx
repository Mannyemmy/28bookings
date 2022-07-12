import React from "react";
import { format, parseISO, parseJSON, formatDistanceToNow } from "date-fns";
import {} from "date-fns";
import Moment from "moment";
import {formatCurrency} from "../../helper"

const RentalCard = ({ message, onClick, orders }) => {
 
  const check_status = (status ) => {
    switch (status) {
      case "rejected":
        return "bg-danger";
        break;
      case "approved":
        return "bg-success";
        break;
      case "picked up":
        return "bg-success";
        break;
      case "completed":
        return "bg-success";
        break;
      case "cancelled":
        return "bg-danger";
        break;
      default:
        return "bg-primary";
    }
  };

  const check_status_text = (status,confirmed) => {
    if(confirmed) {
      switch (status) {
        case "rejected":
          return "order rejected";
          break;
        case "approved":
          return "Handover item to lendee";
          break;
        case "picked up":
          return "Item picked up by lendee";
          break;
        case "completed":
          return "Transaction completed ";
          break;
        case "cancelled":
          return "Order canceled";
          break;
        default:
          return "Awaiting approval from lender";
      }
    }else{
        switch (status) {
      case "rejected":
        return "order rejected";
        break;
      case "approved":
        return "Awaiting payment from lendee";
        break;
      case "completed":
        return "Transaction completed ";
        break;
      case "cancelled":
        return "Order canceled";
        break;
      default:
        return "Awaiting approval from lender";
    }
    }
  };

  const check_rental_status_text = (status, confirmed) => {
    if(confirmed) {
      switch (status) {
        case "rejected":
          return "order rejected";
          break;
        case "approved":
          return "Awaiting hand-over from lender";
          break;
        case "completed":
          return "Transaction completed ";
          break;
        case "picked up":
            return "Return item on due date";
            break;
        case "cancelled":
          return "Order canceled";
          break;
        default:
          return "Awaiting approval from lender";
      }
    }else{
        switch (status) {
      case "rejected":
        return "order rejected";
        break;
      case "approved":
        return "Order Approved, click to pay";
        break;
      case "completed":
        return "Transaction completed successfully";
        break;
      case "cancelled":
        return "Order canceled";
        break;
      default:
        return "Awaiting approval from lender";
    }
    }
  
  };

  if (orders) {
    return (
      <div onClick={onClick} className="tw-cursor-pointer">
        <img
          src={`${message.rental.item.imagesCdnUrl}nth/${0}/`}
          alt={message.rental.item.title}
          className="tw-w-full tw-h-auto md:tw-h-40 tw-object-cover tw-cursor-pointer tw-object-center tw-rounded-lg tw-shadow-md"
        />
        <div className="tw-relative tw-px-2 md:-tw-mt-16 -tw-mt-8  ">
          <div className="tw-bg-white tw-p-2 tw-rounded-lg tw-shadow-lg">
            <div className="tw-flex tw-items-baseline">
              <span
                className={`badge rounded-pill ${check_status(
                  message.rental.rental_status
                )}  message-badge`}
              >
                 {message.rental.rental_confirmed ? (
                <>
               {
                message.rental.rental_status === "approved" ? "awaiting handover" : ""
               } 
               {
                message.rental.rental_status === "picked up" ? "picked up" : ""
               } 
               {
                message.rental.rental_status === "completed" ? "completed" : ""
               } 
                </>
              ) : message.rental.rental_status}
              </span>
              <div className="tw-ml-0.5 tw-text-gray-600  !tw-text-[8px] tw-font-semibold tw-tracking-wider">
             {`  From ${Moment(
                      message.from_date
                    ).format("MMMM Do YYYY")} To ${Moment(
                      message.to_date
                    ).format("MMMM Do YYYY")}`}
              </div>
            </div>

            <span className="tw-mt-1 !tw-text-[16px] tw-font-semibold  tw-leading-tight tw-truncate !mb-1">
              {message.rental.item.title}
            </span>
            <span className="time tw-ml-1 tw-whitespace-nowrap">
              {formatDistanceToNow(parseJSON(message.updated_at))} ago
            </span>
            <div className=" !tw-text-[12px]">
              <div>{`${formatCurrency(message.rental.cost)} for ${message.rental.duration} days`}</div>
            </div>
            <div className=" !tw-text-[12px] ">
              <div><span className="tw-text-red-500 !tw-text-[12px] tw-font-medium">note:</span> {check_status_text(message.rental.rental_status, message.rental.rental_confirmed)}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div onClick={onClick} className="tw-cursor-pointer">
      <img
        src={`${message.item.imagesCdnUrl}nth/${0}/`}
        alt={message.item.title}
        className="tw-w-full tw-h-auto md:tw-h-40 tw-object-contain md:tw-object-cover tw-cursor-pointer tw-object-center tw-rounded-lg tw-shadow-md"
      />
      <div className="tw-relative tw-px-2 md:-tw-mt-16 -tw-mt-8 ">
        <div className="tw-bg-white tw-p-2 tw-rounded-lg tw-shadow-lg">
          <div className="tw-flex tw-items-baseline">
            {/* <span className="tw-bg-teal-200 tw-text-teal-800 !tw-text-[10px] tw-px-0.5 tw-inline-block tw-rounded-full  tw-uppercase tw-font-semibold tw-tracking-wide">
              New
            </span> */}
            <span
              className={`badge rounded-pill ${check_status(
                message.rental_status
              )}  message-badge`}
            >
              
              {message.rental_confirmed ? (
                <>
               {
                message.rental_status === "approved" ? "awaiting pickup" : ""
               } 
               {
                message.rental_status === "picked up" ? "picked up" : ""
               } 
               {
                message.rental_status === "completed" ? "completed" : ""
               } 
                </>
              ) : message.rental_status}
            </span>
            <div className="tw-ml-0.5 tw-text-gray-600  !tw-text-[8px] tw-font-semibold tw-tracking-wider">
            {`  From ${Moment(
                      message.from_date
                    ).format("MMMM Do YYYY")} To ${Moment(
                      message.to_date
                    ).format("MMMM Do YYYY")}`}
            </div>
          </div>

          <span className="tw-mt-1 !tw-text-[16px] tw-font-semibold  tw-leading-tight tw-truncate !mb-1">
            {message.item.title}
          </span>
          <span className="time tw-ml-0.5 tw-whitespace-nowrap">
            {formatDistanceToNow(parseJSON(message.updated_at))} ago
          </span>
          <div className=" !tw-text-[12px]">
            <div>{`${formatCurrency(message.cost)} for ${message.duration} days`}</div>
          </div>
          <div className=" !tw-text-[12px] ">
              <div><span className="tw-text-red-500 !tw-text-[12px] tw-font-medium">note:</span> {check_rental_status_text(message.rental_status, message.rental_confirmed)}</div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default RentalCard;
