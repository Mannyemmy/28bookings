import React, { useState } from "react";
import Navbar from "../../components/_navbar/Navbar";
import { useGetUserItemsQuery } from "../../services/itemsApi";
import { Link, useHistory } from "react-router-dom";
import ItemBox from "../../components/ItemBox";

import TextLoader from "../../components/TextLoader";

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

  return (
    <>
      <Navbar />
      <div className="!tw-max-w-5xl !tw-mx-auto  tw-p-1 md:tw-p-5">
        {isLoading ? (
          <TextLoader />
        ) : (
          <>
            {items.length > 0 ? (
              <div className="!tw-grid !tw-grid-cols-2 md:!tw-grid-cols-4 !tw-gap-2">
                {items &&
                  items.map((item) => <ItemBox item={item} key={item.id} />)}
              </div>
            ) : (
              <div className="tw-max-w-full tw-h-1/2 tw-flex-col tw-flex tw-items-center tw-justify-center ">
                <img
                  src={require("../../assets/coins.PNG")}
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
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default MyItems;
