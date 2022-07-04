import React, { useState } from "react";
import Navbar from "../../components/_navbar/Navbar";
import { useGetUserQuery } from "../../services/usersApi";
import { useLocation, useHistory } from "react-router-dom";
import { format, parseISO, parseJSON } from "date-fns";
import SweetAlert from "react-bootstrap-sweetalert";
import {
  useRejectBookingMutation,
  useAcceptBookingMutation,
  useDropOffConfirmMutation
} from "../../services/messagesApi";

const Message = () => {
  const location = useLocation();
  let history = useHistory();
  const message = location.state || {};
  const [alert, setAlert] = useState(null);

  const [
    rejectBooking, // This is the mutation trigger
    { isLoading: isUpdating, isSuccess: mutateSuccess }, // This is the destructured mutation result
  ] = useRejectBookingMutation();

  const [
    acceptBooking, // This is the mutation trigger
    { isLoading: isReturnedAccepted, isSuccess: isReturnSuccess }, // This is the destructured mutation result
  ] = useAcceptBookingMutation();

  const {
    data: lendee,
    error,
    isLoading,
    isFetching,
    isSuccess,
  } = useGetUserQuery(message.notification.sender_id);

  const rejectOrder = () => {
    rejectBooking({
      rental_id: message.rental_id,
      notification_id: message.notification_id,
      status: "REJECTED",
    });

    setAlert(
      <SweetAlert
        style={{ width: "16em", fontSize: "1em !important" }}
        success
        title="Reservation rejected successfully!"
        onConfirm={() => history.push("/my-orders")}
        onCancel={() => history.push("/my-orders")}
      />
    );
  };

  const handleReject = () => {
    setAlert(
      <SweetAlert
        style={{ width: "20em", fontSize: "0.3em !important " }}
        warning
        showCancel
        title="Are you sure you want to reject?"
        onConfirm={() => rejectOrder()}
        onCancel={() => setAlert(null)}
      />
    );
  };

  const approved = () => {
    acceptBooking({
      rental_id: message.rental_id,
      notification_id: message.notification_id,
      status: "APPROVED",
    });

    setAlert(
      <SweetAlert
        style={{ width: "16em", fontSize: "1em !important" }}
        success
        title="Booking status sent successfully!"
        onConfirm={history.push("/my-orders")}
        onCancel={history.push("/my-orders")}
      >
        Once payment has been made you will be notified to drop off item
      </SweetAlert>
    );
  }
  const handleAccept = () => {
    setAlert(
      <SweetAlert
        style={{ width: "20em", fontSize: "0.3em !important " }}
        info
        showCancel
        confirmBtnText="Yes"
        title="Comfirm Reservation?"
        onConfirm={() => approved()}
        onCancel={() => setAlert(null)}
      />
    );

   

   
  };

  const [
    dropOffConfirm, // This is the mutation trigger
    { isLoading: isAcceptedUpdating, isSuccess: acceptSuccess }, // This is the destructured mutation result
  ] = useDropOffConfirmMutation();

  const handlePickedUp = () => {
    dropOffConfirm({
      rental_id: message.rental_id,
      notification_id: message.notification_id,
      status: "COMPLETED",
    });
    setAlert(
      <SweetAlert
        style={{ width: "16em", fontSize: "1em !important" }}
        success
        title="transaction completed successfully!"
        onConfirm={() => history.push("/")}
        onCancel={() => history.push("/")}
      />
    );
  };

  const handleItemReturnAccept = () => {
    setAlert(
      <SweetAlert
        style={{ width: "20em", fontSize: "0.3em !important " }}
        info
        showCancel
        confirmBtnText="Yes"
        title="Has the item been returned?"
        onConfirm={() => handlePickedUp()}
        onCancel={() => setAlert(null)}
      />
    );
  };

  if (message.notification.status === "Picked_up" &&
  message.rental.rental_confirmed === true) {
    return (
      <>
        <Navbar />
        <div className="tw-min-h-[90vh] tw-max-w-5xl tw-mx-auto tw-px-8 tw-py-2 ">
          <div className="tw-flex tw-flex-col tw-items-center tw-justify-center">
            <h1 className="tw-text-center !tw-text-xl !tw-font-semibold">
              CONFIRM ITEM RETURNED
            </h1>
            <img
              src="/delivery.png"
              className="tw-h-28 tw-w-28 tw-object-contain"
              alt="delivery"
            />
          </div>
          <div className="tw-grid tw-grid-cols-1  tw-my-2 tw-gap-2 md:tw-mx-auto md:tw-w-80">
            {/* <button
                type="button"
                className="btn btn-danger btn-block"
                // onClick={hande}
                // add code to complaint form page
              >
                Reject
              </button> */}
            <button
              type="button"
              className="btn btn-success btn-block"
              onClick={handleItemReturnAccept}
            >
              Item Received
            </button>
          </div>
        </div>
        {alert}
      </>
    );
  }

  if (message.rental.rental_confirmed ) {
    return (
      <>
        <Navbar />
        <div className="tw-min-h-[90vh] tw-max-w-5xl tw-mx-auto tw-px-8 tw-py-2 ">
          <div className="tw-flex tw-flex-col tw-items-center tw-justify-center">
            <h1 className="tw-text-center !tw-text-xl !tw-font-semibold">
              PAYMENT CONFIRMED FROM LENDEE
            </h1>
            <p>
              Please proceed to drop-off item to the lendee, carry along a valid
              id card with you and take a picture for disclaimer purposes, drop
              offs should be in a public place
            </p>
            <img
            src="/delivery.png"
            className="tw-h-28 tw-w-28 tw-object-contain"
            alt="delivery"
          />
          </div>
        </div>
      </>
    );
  }

  if (
    message.notification.status === "Approved" &&
    message.rental.rental_confirmed === false
  ) {
    return (
      <>
        <Navbar />
        <div className="tw-min-h-[90vh] tw-max-w-5xl tw-mx-auto tw-px-8 tw-py-2 ">
          <div className="tw-flex tw-flex-col tw-items-center tw-justify-center">
            <h1 className="tw-text-center !tw-text-xl !tw-font-semibold">
              AWAITING PAYMENT FROM LENDEE
            </h1>
            <p>Please proceed to drop-off after payment confimation status</p>
            <img
              src="/svg-icons/awaiting-payment.svg"
              alt=""
              className="tw-text-green-500 tw-h-40 tw-w-40"
            />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="tw-min-h-[90vh] tw-max-w-5xl tw-mx-auto tw-px-8 tw-py-2 ">
        <div className="tw-flex tw-flex-col tw-items-center tw-justify-center">
          <h1 className="tw-text-center !tw-text-xl !tw-font-semibold">
            SCHEDULE PICKUP
          </h1>
          <img
            src="/delivery.png"
            className="tw-h-28 tw-w-28 tw-object-contain"
            alt="delivery"
          />
        </div>
        {isLoading ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-grow text-success" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            <div className="tw-flex tw-flex-col tw-justify-center tw-items-start !tw-space-y-2 tw-mt-1">
              <p className="tw-mb-0 ">
                Ordered By:{" "}
                <span>
                  {lendee.first_name} {lendee.last_name}
                </span>
              </p>
              <p>
                Address: <span>{lendee.location}</span>
              </p>
              <p>
                Phone Number: <span>{lendee.phone}</span>
              </p>
              <p>
                Item Name :{" "}
                <span className="tw-font-bold tw-text-xl">
                  {message.rental.item.title}
                </span>
              </p>
              <p className="tw-font-bold">Description :</p>
              <div
                dangerouslySetInnerHTML={{
                  __html: message.rental.item.description,
                }}
              />
              <p>
                Rental Duration: <span>{message.rental.duration} days</span>{" "}
                <span className="tw-font-semibold">{`  From ${format(
                  parseJSON(message.rental.from_date),
                  "io MMMM,yyyy"
                )} To ${format(
                  parseJSON(message.rental.to_date),
                  "io MMMM,yyyy"
                )}`}</span>
              </p>
            </div>
            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-my-2 tw-gap-2 md:tw-mx-auto md:tw-w-80">
              <button
                type="button"
                className="btn btn-danger btn-block"
                onClick={handleReject}
              >
                Reject
              </button>
              <button
                type="button"
                className="btn btn-success btn-block"
                onClick={handleAccept}
              >
                Schedule
              </button>
            </div>
          </>
        )}
      </div>
      <div className="!tw-text-sm">{alert}</div>
    </>
  );
};

export default Message;
