import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Notifications from "../../components/Inbox/Notifications";
import Navbar from "../../components/_navbar/Navbar";
import { useGetInboxMessagesQuery } from "../../services/messagesApi";

const Inbox = () => {
  const { data, error, isLoading, isFetching, isSuccess } =
    useGetInboxMessagesQuery({pollingInterval: 3000, refetchOnMountOrArgChange: true,refetchOnFocus : true, refetchOnReconnect : true });

  React.useEffect(() =>
    window.scrollTo({ top: 0, left: 0, scrollBehaviour: "smooth" })
  );

  return (
    <Fragment>
      <Navbar />
      <div className="inbox">
        <h1 className="border-bottom border-top py-2 ps-2 bi bi-envelope-check">
          {" "}
          Inbox{" "}
        </h1>
        <div className="d-flex justify-content-center mt-4 mb-5">
          {isLoading ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-grow text-success" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <>
              {data?.length > 0 ? (
                <Notifications  messages = {data}/>
              ) : (
                <div className="wrapper py-3">
                  <img
                    src={require("../../assets/empty-inbox.PNG")}
                    alt="empty inbox"
                    className="d-block mx-auto"
                  />
                  <div className="no-inbox text-center mb-3">
                    <h5 className="text-center mb-1"> No messages yet </h5>
                    <p className="text-center">
                      This is where you’ll find messages and notifications. As
                      well as arrange pick-ups and drop-offs. Ready to get
                      started?
                    </p>
                    <Link
                      to={"/list-an-item"}
                      className="btn btn-success py-1 px-3"
                    >
                      List an item
                    </Link>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Inbox;
