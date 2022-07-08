import React, { useState } from "react";
import Navbar from "../../components/_navbar/Navbar";
import { useGetUserItemsQuery } from "../../services/itemsApi";
import { useHistory } from "react-router-dom";

const MyItems = () => {
  const [dropdown, setDropdown] = useState(false);
  const history = useHistory();

  const {
    data: items,
    error,
    isLoading,
    isFetching,
    isSuccess,
  } = useGetUserItemsQuery();

  const handleNavigateToRentalPage = (slug) => {
    history.push(`/rental/${slug}`);
  };

  return (
    <>
      <Navbar />
      <div className="!tw-max-w-5xl !tw-mx-auto  tw-p-1 md:tw-p-5">
        {isLoading ? (
            <div className="tw-h-screen tw-w-full tw-flex tw-items-center tw-justify-center">
                   <h1>Loading....</h1>
            </div>
       
        ) : (
          <div className="!tw-grid !tw-grid-cols-2 md:!tw-grid-cols-4 !tw-gap-2">
            {items &&
              items.map((item) => {
                return (
                  <div
                   
                    className="tw-relative tw-h-[280px] tw-w-[250px]  tw-p-2 !tw-border tw-border-black tw-shadow-md tw-rounded-md tw-flex tw-flex-col tw-space-y-1 tw-justify-center"
                    key={item.id}
                  >
                    <div className="tw-absolute tw-top-2 tw-right-1">
                      <div
                        onClick={() => setDropdown(!dropdown)}
                        className=" tw-border tw-border-black tw-rounded-full tw-p-0.5 tw-cursor-pointer tw-bg-white tw-shadow-md tw-flex tw-items-center tw-justify-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="tw-h-4 tw-w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    {dropdown ? (
                      <div className="tw-absolute tw-w-16 tw-rounded-sm tw-top-5 tw-right-2 tw-bg-white tw-shadow-lg tw-flex tw-flex-col  tw-p-0.5 ">
                        <div className="tw-w-full hover:tw-bg-green-600 tw-pl-1 !tw-h-4 tw-flex tw-justify-start tw-cursor-pointer hover:tw-text-white">
                            <p>Edit</p>
                        </div>
                        <div className="tw-w-full hover:tw-bg-green-600 tw-pl-1 !tw-h-4 tw-flex tw-justify-start tw-cursor-pointer hover:tw-text-white">
                            <p>Share</p>
                        </div>
                        <div className="tw-w-full hover:tw-bg-green-600 tw-pl-1 !tw-h-4 tw-flex tw-justify-start tw-cursor-pointer hover:tw-text-white">
                            <p>Pause</p>
                        </div>
                        <div className="tw-w-full hover:tw-bg-red-600 tw-pl-1 !tw-h-4 tw-flex tw-justify-start tw-cursor-pointer hover:tw-text-white">
                            <p>Delete</p>
                        </div>
                      
           
                      </div>
                    ) : null}
                    <div  onClick={() => handleNavigateToRentalPage(item.slug)}>
                       <img
                      src={`${item.imagesCdnUrl}nth/${0}/`}
                      className="tw-w-full object-cover tw-h-[150px] tw-rounded-md tw-cursor-pointer"
                      alt={item.title}
                    />
                    <h6 className="tw-text-xl"> {item.title} </h6>
                    <p className="ps-1">₦{item.daily_price} / day </p>
                    </div>

                 
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </>
  );
};

export default MyItems;
