import React, { useState } from "react";
import "./inbox.css";
import { formatDistanceToNow, parseISO, parseJSON } from "date-fns";
import { useHistory } from "react-router-dom";
import { useUpdateIsReadMutation } from "../../services/messagesApi";
import { useLocation } from "react-router-dom";

const Notifications = ({ messages }) => {
  const [orders, setOrders] = useState(true);
  const history = useHistory();
  const check_status = (status) => {
    switch (status) {
      case "Rejected":
        return "bg-danger";
        break;
      case "Approved":
        return "bg-success";
        break;
      case "Completed":
        return "bg-success";
        break;
      case "Cancelled":
        return "bg-danger";
        break;
      default:
        return "bg-primary";
    }
  };
  const [
    updateIsRead, // This is the mutation trigger
    { isLoading: isUpdating }, // This is the destructured mutation result
  ] = useUpdateIsReadMutation();

  function handleClick(message) {
    if (message.is_read === false) {
      updateIsRead({
        id: message.id,
      });
    }
    if (
      message.notification.status !== "Rejected" &&
      message.notification.status !== "Cancelled" &&
      message.notification.status !== "Completed"
    ) {
      history.push({ pathname: `/message/${message.id}`, state: message });
    }
  }
  return (
    <div className="inbox">
      {/* <div className="tw-flex tw-space-x-2 tw-justify-center tw-items-center">
         <button type="button" className={`btn ${orders ? "btn-success" : "btn-secondary"} btn-lg`}  onClick={()=>setOrders(true)}>
        ORDERS
      </button>
      <button type="button" className={`btn ${!orders ? "btn-success" : "btn-secondary"} btn-lg`} onClick={()=>setOrders(false)}>
        BORROWED
      </button>
      </div> */}

      <div className="inbox-list">
        <h1 className="!tw-text-sm !tw-ml-1 !md:tw-text-2xl">My Orders</h1>
        {messages.map((message) => (
          <div
            id="message-item"
            className={`${message.is_read ? "" : "unread"}`}
            key={message.id}
            onClick={() => handleClick(message)}
          >
            <header>
              <div className="sender-info">
                <span className="subject">{message.rental.item.title}</span>

                {/* <span className="from">{message.notification.subject}</span> */}
              </div>
              <span
                className={`badge rounded-pill ${check_status(
                  message.notification.status
                )}  message-badge`}
              >
                {message.notification.status}
              </span>
              <span className="time !tw-text-xs tw-hidden md:tw-inline-block tw-mx-1">
                {formatDistanceToNow(parseJSON(message.rental.updated_at))} ago
              </span>
            </header>
            <main>
              <p>
                {`₦${message.rental.cost} for ${message.rental.duration} days`}
              </p>
              <span className="time !tw-text-xs md:tw-hidden tw-inline-block">
                {formatDistanceToNow(parseJSON(message.rental.updated_at))} ago
              </span>
            </main>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
