import React from "react";
import Navbar from "../../components/_navbar/Navbar";
import Location from "./components/Location";
import Loader from "../../components/Loader";
import { useDispatch } from "react-redux";
import Category from "./components/Category";
import { useHistory, useParams } from "react-router-dom";
import { useGetSearchResultsQuery } from "../../services/itemsApi";
import ItemCard from "../../components/ItemCard";

const SearchProduct = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  let { query } = useParams();

  const {
    data: items,
    error,
    isLoading,
    isFetching,
    isSuccess,
  } = useGetSearchResultsQuery(query);

  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, scrollBehaviour: "smooth" });
    // open location modal after page load by 3seconds
    //    setTimeout( () => document.querySelector('button.location-btn').click() , 2000)
  }, []);

  const handleNavigateToRentalPage = (slug) => {
    history.push(`/rental/${slug}`);
  };

  return (
    <>
      <Navbar />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="search-page">
          {/* <div className=" mt-2 mt-sm-1 px-2 pb-2 border-bottom">
            <button
              className="btn py-1 px-3 me-2 location-btn"
              data-bs-toggle="modal"
              data-bs-target="#locationModal"
            >
              Location
            </button>
            <button
              className="btn py-1 px-3 me-2"
              data-bs-toggle="modal"
              data-bs-target="#categoryModal"
            >
              Category
            </button>
          </div> */}
          {/* <Location  id = 'locationModal' /> */}
          <Category id="categoryModal" />
          <div className="search-result row w-100 p-0 m-0 mx-auto mt-md-2 mb-4">
            {items.length < 1 ? (
              <div className="w-100 d-flex justify-content-center">
                <img
                  src="/no-items-found.webp"
                  alt="no-item-found"
                  className="h-75"
                />
              </div>
            ) : (
              items.map((item) => {
                return (
                  <ItemCard key={item.id} item={item}/>
                );
              })
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SearchProduct;
