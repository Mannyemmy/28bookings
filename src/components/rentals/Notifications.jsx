import React, { useState } from "react";
import "../Inbox/inbox.css";
import { formatDistanceToNow, parseISO, parseJSON } from "date-fns";
import { useHistory } from "react-router-dom";
import { useUpdateIsReadMutation } from "../../services/messagesApi";
import { useLocation } from "react-router-dom";

const Notifications = ({ messages }) => {
  
  const [orders, setOrders] = useState(true);
  const history = useHistory();
  const check_status = (status) => {
    switch (status) {
      case "rejected":
        return "bg-danger";
        break;
      case "approved":
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
  const [
    updateIsRead, // This is the mutation trigger
    { isLoading: isUpdating }, // This is the destructured mutation result
  ] = useUpdateIsReadMutation();

  function handleClick(message) {
    // if (message.is_read === false) {
    //   updateIsRead({
    //     id: message.id,
    //   });
    // }
    if (
      message.rental_status !== "rejected" &&
      message.rental_status !== "cancelled" &&
      message.rental_status !== "completed" 
    ) {
      history.push({ pathname: `/rental-inbox/${message.id}`, state: message });
    }
  }
  return (
    <div className="inbox">

      <div className="inbox-list">
        <h1>My Rentals</h1>
        {messages.map((message) => (
          <div
            id="message-item"
            className="unread"
            // className={`${message.userNotification[0].is_read ? "" : "unread"}`}
            key={message.id}
            onClick={() => handleClick(message)}
          >
            <header>
              <div className="sender-info">
                <span className="subject">{message.item.title}</span>

                {/* <span className="from">{message.notification.subject}</span> */}
              </div>
              <span
                className={`badge rounded-pill ${check_status(
                  message.rental_status
                )}  message-badge`}
              >
                { message.rental_status}
              </span>
              <span className="time">
                {formatDistanceToNow(parseJSON(message.updated_at))} ago
              </span>
            </header>
            <main>
              <p>
                {`₦${message.cost} for ${message.duration} days`}
              </p>
            </main>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
