import React from "react";
import { Link } from "react-router-dom";
import { useGetUserItemsQuery } from "../../../services/itemsApi";
import MoreItems from "./Items";

const RentalAndReviews = () => {
  const { data, error, isLoading, isFetching, isSuccess } =
    useGetUserItemsQuery();

  return (
    <div className="rentals-and-reviews mt-3">
      <ul className="nav nav-pills d-flex justify-content-center">
        <li className="nav-item">
          <a
            className="nav-link active py-1"
            data-bs-toggle="pill"
            href="#rental-shops"
          >
            {" "}
            Rental Shop{" "}
          </a>
        </li>
        {/* <li className='nav-item'>
            <a className='nav-link py-1' data-bs-toggle='pill' href='#reviews'> Reviews </a>
        </li>     */}
      </ul>

      <div className="tab-content mt-2 d-flex justify-content-center mb-4 mb-sm-3">
        <div className="tab-pane active" id="rental-shops">
          {isLoading ? (<h1>Loading...</h1>) : (
            <>
              {data && data.length > 0 ? (
                <MoreItems items={data} />
              ) : (
                <>
                  <img
                    src={require("../../../assets/coins.PNG")}
                    alt="coins"
                    className="d-block mx-auto mt-2"
                  />
                  <h5 className="text-center mb-1"> Your store is empty </h5>
                  <p className="text-center mb-1">
                    {" "}
                    Add a listing to start sharing and earning money.{" "}
                  </p>
                  <Link
                    to={"/list-an-item"}
                    className="btn btn-success py-1 mx-auto mt-2"
                  >
                    List an Item
                  </Link>
                </>
              )}
            </>
          )}
        </div>
        <div className="tab-pane  fade" id="reviews">
          <p className="py-3 text-secondary text-center">
            {" "}
            no reviews quite yet.{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RentalAndReviews;
