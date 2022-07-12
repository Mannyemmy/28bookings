import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/_navbar/Navbar";
import { useGetRentalInboxMessagesQuery } from "../../services/messagesApi";
import Notifications from "../../components/rentals/Notifications";

const Rentals = () => {
  useEffect(() => {
    return window.scrollTo({ top: 0, left: 0, scrollBehaviour: "smooth" });
  }, []);

  const { data, error, isLoading, isFetching, isSuccess } =
    useGetRentalInboxMessagesQuery(null, {
      pollingInterval: 3000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    });

  return (
    <>
      <Navbar />
      <div className="rentals">
        <h1 className="border-bottom border-top py-2 ps-2 bi bi-bag-check">
          {" "}
          Rentals{" "}
        </h1>

        <div className="d-flex justify-content-center mt-4 mb-5">
          {isLoading ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-grow text-success" role="status">
                <span className="sr-only tw-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <>
              {data?.length > 0 ? (
                <Notifications messages={data} />
              ) : (
                <div className="d-flex justify-content-center">
                  <div className="wrapper py-3">
                    <img
                      src={require("../../assets/no-rental.PNG")}
                      alt="empty inbox"
                      className="d-block mx-auto"
                    />
                    <div className="no-inbox text-center mb-3">
                      <h5 className="text-center mb-1"> No rentals yet </h5>
                      <p className="text-center">
                        This is where you'll see the items you've rented from
                        others
                      </p>
                      <Link
                        to={"/list-an-item"}
                        className="btn btn-success py-1 px-3"
                      >
                        List an item
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Rentals;
