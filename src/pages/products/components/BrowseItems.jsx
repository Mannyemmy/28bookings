import React from "react";
import { useHistory } from "react-router-dom";
import { useGetItemsByCategoryQuery } from "../../../services/categoriesApi";

import ItemCard from "../../../components/ItemCard";
import Slider from "react-slick";

const BrowseItems = ({ id, title, slug }) => {


  

  const {
    data: items,
    error,
    isLoading,
    isFetching,
    isSuccess,
  } = useGetItemsByCategoryQuery(id);

  const history = useHistory();

  const handleNavigateToRentalPage = (slug) => {
    history.push(`/rental/${slug}`);
  };

  return (
    <>
      {isLoading ? (
        ""
      ) : (
        <div className="browse-items px-1 px-md-3 mt-4">
          <h5> Browse {title} in your Area </h5>
          <div className="row w-100 p-0 m-0 mx-auto">
            {items.length < 1 ? (
              <div className="w-100 d-flex justify-content-center">
                <img
                  src="/no-items-found.webp"
                  alt="no-item-found"
                  className="h-75"
                />
              </div>
            ) : (
              <>
                {items.map((item) => {
                  return (
                   <ItemCard key={item.id} item={item}/>
                  );
                })}
              </>
            )}
          </div>
          <button
            className="btn btn-success mt-3 d-block mx-auto"
            onClick={() => history.push(`/category/${slug}`)}
          >
            {title} for rent in Your Area
          </button>
        </div>
      )}
    </>
  );
};

export default BrowseItems;
