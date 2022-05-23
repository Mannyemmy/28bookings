import React from "react";
import Navbar from "../../components/_navbar/Navbar";
import Location from "./components/Location";
import Loader from "../../components/Loader";
import { useDispatch } from "react-redux";
import Category from "./components/Category";
import { useHistory, useParams } from "react-router-dom";
import { useGetSearchResultsQuery } from "../../services/itemsApi";

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
          <div className=" mt-2 mt-sm-1 px-2 pb-2 border-bottom">
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
          </div>
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
                  <div
                    key={item.id}
                    className="col-12 col-md-3 p-0 m-0 mt-3 mt-md-2"
                  >
                    <div
                      onClick={() => handleNavigateToRentalPage(item.slug)}
                      className="d-block mx-auto"
                    >
                      <img
                        src={`${item.imagesCdnUrl}nth/${0}/`}
                        alt={item.title}
                        className="w-100"
                      />
                      <p className="d-flex justify-content-between px-1 mt-1 mb-1">
                        <span> {item.created_by.first_name} </span>
                        <span>
                          {" "}
                          {/* <i className="fas fa-star"></i> {item.stars} */}
                        </span>
                      </p>
                      <h6 className="mb-0"> {item.title} </h6>
                      <p className="price p-0 pt-1 mb-1">
                        ₦{item.daily_price}/day
                      </p>
                    </div>
                  </div>
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
