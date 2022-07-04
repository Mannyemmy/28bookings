import React, { useState, useEffect } from "react";
import { usePaystackPayment } from "react-paystack";
import { useLocation, useHistory } from "react-router-dom";
import { format, parseISO, parseJSON } from "date-fns";
import { useGetUserQuery } from "../../services/usersApi";
import SweetAlert from "react-bootstrap-sweetalert";
import {
  useRejectBookingMutation,
  usePaymentSuccessMutation,
  useDropOffConfirmMutation,
} from "../../services/messagesApi";

import Navbar from "../../components/_navbar/Navbar";

const RentalMessage = () => {
  const location = useLocation();
  let history = useHistory();
  const message = location.state || {};
  const [alert, setAlert] = useState(null);

  const {
    data: lendee,
    error,
    isLoading,
    isFetching,
    isSuccess,
  } = useGetUserQuery(message.lendee_id);

  const [
    rejectBooking, // This is the mutation trigger
    { isLoading: isUpdating, isSuccess: mutateSuccess }, // This is the destructured mutation result
  ] = useRejectBookingMutation({
    pollingInterval: 5000,
    refetchOnMountOrArgChange: true,
  });

  const [
    paymentSuccess, // This is the mutation trigger
    { isLoading: isPaymentUpdating }, // This is the destructured mutation result
  ] = usePaymentSuccessMutation();

  const [config, setConfig] = useState({
    reference: new Date().getTime().toString(),
    email: lendee?.email,
    amount: message.cost * 100,
    publicKey: "pk_test_9da36d88c1d36b3beaab17754e6a92d2ad64ccaf",
    channels: ["card", "ussd", "qr", "mobile_money", "bank_transfer"],
  });

  useEffect(() => {
    setConfig({
      ...config,
      email: lendee?.email,
    });
  }, [isSuccess]);

  const initializePayment = usePaystackPayment(config);

  // you can call this function anything
  const onSuccess = (reference) => {
    console.log({'reference' : reference.reference.toString(), 'user_id' : lendee.id, 'amount' : parseInt(message.cost)} );
    paymentSuccess({ rental_id: message.id,'reference' : reference.reference.toString(), 'user_id' : lendee.id, 'amount' : parseInt(message.cost) });
    history.push("/rentals");

    // Implementation for whatever you want to do with reference and after success call.
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    alert("Payment cancelled");
  };
  const cancelReservation = () => {
    rejectBooking({
      rental_id: message.id,
      notification_id: message.userNotification[0].notification_id,
      status: "CANCELLED",
    });

    setAlert(
      <SweetAlert
        style={{ width: "16em", fontSize: "1em !important" }}
        success
        title="Reservation cancelled successfully!"
        onConfirm={() => history.push("/rentals")}
        onCancel={() => history.push("/rentals")}
      />
    );
  };
  const cancelBooking = () => {
    setAlert(
      <SweetAlert
        style={{ width: "20em", fontSize: "0.3em !important " }}
        warning
        showCancel
        title="Are you sure you want to cancel?"
        onConfirm={() => cancelReservation()}
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
      rental_id: message.id,
      notification_id: message.userNotification[0].notification_id,
      status: "PICKED_UP",
    });
    setAlert(
      <SweetAlert
        style={{ width: "16em", fontSize: "1em !important" }}
        success
        title="Item recieved successfully!"
        onConfirm={() => history.push("/rentals")}
        onCancel={() => history.push("/rentals")}
      />
    );
  };

  const handleAccept = () => {
    setAlert(
      <SweetAlert
        style={{ width: "20em", fontSize: "0.3em !important " }}
        info
        showCancel
        confirmBtnText="Yes"
        title="Have you recieved the item?"
        onConfirm={() => handlePickedUp()}
        onCancel={() => setAlert(null)}
      />
    );
  };

  if (message.rental_confirmed) {
    return (
      <>
        <Navbar />
        <div className="tw-min-h-[90vh] tw-max-w-5xl tw-mx-auto tw-px-8 tw-py-2 ">
          <div className="tw-flex tw-flex-col tw-items-center tw-justify-center">
            <h1 className="tw-text-center !tw-text-xl !tw-font-semibold">
              CONFIRM ITEM PICKUP
            </h1>
            <p>
              Please proceed to drop-off location as discussed with the lender,
              carry along a valid id card with you and take a picture for
              disclaimer purposes, drop offs' should be in a public place.
            </p>
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
              onClick={handleAccept}
            >
              Received
            </button>
          </div>
        </div>
        {alert}
      </>
    );
  }

  if (
    message.rental_status === "approved" &&
    message.rental_confirmed === false
  ) {
    return (
      <>
        <Navbar />
        <div className="tw-min-h-[90vh] tw-max-w-5xl tw-mx-auto tw-px-8 tw-py-2 ">
          {isLoading ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-grow text-success" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="tw-flex tw-flex-col tw-items-center tw-justify-center">
              <h1 className="tw-text-center !tw-text-xl !tw-font-semibold">
                RESERVATION APPROVED
              </h1>
              <p className="tw-text-xl tw-font-semibold">
                Please proceed to make payment with your card
              </p>
              <div className="d-flex justify-content-center container">
                <div className="card px-3 bg-white">
                  <div className="about-product text-center">
                    <img
                      className="tw-w-28 tw-h-28 tw-object-contain"
                      src={`${message?.item.imagesCdnUrl}nth/${0}/`}
                      alt=""
                    />
                    <div>
                      <h4>{message.item.title}</h4>
                      <h6 className="mt-0 text-black-50">
                        duration : {message.duration} days
                      </h6>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between total font-weight-bold mt-1">
                    <span>Total</span>
                    <span>₦{message.cost}.00</span>
                  </div>
                  <div className="d-grid gap-2 col-12 mx-auto my-1">
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={() => {
                        initializePayment(onSuccess, onClose);
                      }}
                    >
                      Pay Now
                    </button>
                    <button
                      className="btn btn-danger"
                      type="button"
                      onClick={cancelBooking}
                    >
                      Cancel Reservation
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {alert}
      </>
    );
  }

  if (message.rental_status === "pending") {
    return (
      <>
        <Navbar />
        <div className="tw-min-h-[90vh] tw-max-w-5xl tw-mx-auto tw-px-8 tw-py-2 ">
          <div className="tw-flex tw-flex-col tw-items-center tw-justify-center">
            <h1 className="tw-text-center !tw-text-xl !tw-font-semibold">
              AWAITING RESPONSE FROM LENDER
            </h1>
            <p>
              Please initiate chat to hasten the process and discuss pick-up
              location
            </p>
            <img
              src="/svg-icons/awaiting-response.svg"
              alt=""
              className="tw-text-green-500 tw-h-28 tw-w-28"
            />
          </div>
          <div className="d-grid gap-2 col-6 tw-mt-2 mx-auto">
            <button className="btn btn-info tw-text-white" type="button">
              Chat with lender
            </button>
            <button
              className="btn btn-danger"
              type="button"
              onClick={cancelBooking}
            >
              Cancel Reservation
            </button>
          </div>
        </div>
        {alert}
      </>
    );
  }

  // return (
  //   <div>
  //     <Navbar />

  //     {/* <button
  //       onClick={() => {
  //         initializePayment(onSuccess, onClose);
  //       }}
  //     >
  //       Pay Now
  //     </button> */}

  //     {alert}
  //   </div>
  // );
};

export default RentalMessage;
