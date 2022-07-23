import React, { useState, useEffect } from "react";
import Navbar from "../../components/_navbar/Navbar";
import { Link } from "react-router-dom";
import DateModal from "./components/Dates";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./carousel.scss";
import ProductDescription from "./components/ProductDescription";
import OtherItems from "./components/OtherItems";
import Reviews from "./components/Reviews";
import MoreItems from "./components/MoreItems";
import ExploreOtherOptions from "./components/ExploreOtherOptions";
import WhyRentWithUs from "./components/WhyRentWithUs";
import { useParams } from "react-router-dom";
import {
  useGetItemBySlugQuery,
  useFavouriteItemMutation,
} from "../../services/itemsApi";
import { useGetUserQuery, usersApi } from "../../services/usersApi";
import RentalLoader from "./components/RentalLoader";
import { createRental } from "../../services/rentalServices";
import SweetAlert from "react-bootstrap-sweetalert";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { url } from "../../helper";
import TextLoader from "../../components/TextLoader";

const Rental = () => {
  const history = useHistory();
  const [showLogin, setShowLogin] =useState(false);
  let { slug } = useParams();
  const stateUserId = useSelector((state) => state.auth.id);
  const loggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [user_id, setUserId] = useState(
    localStorage.getItem("id") || stateUserId
  );
  const { data, error, isLoading, isFetching, isSuccess } =
    useGetItemBySlugQuery(slug);

  const [trigger, { data: owner, isSuccess: isGot }] =
    usersApi.endpoints.getUser.useLazyQuery();

  useEffect(() => {
    isSuccess && trigger(data?.user.id);
  }, [isSuccess]);

  const user = useSelector((state) => state.auth.user);
  const [alert, setAlert] = useState(null);
  React.useEffect(() =>
    window.scrollTo({ top: 0, left: 0, scrollBehaviour: "smooth" })
  );

  const pricing = [
    {
      duration: "Daily",
      price: `₦${data?.item.daily_price}/day`,
    },
    {
      duration: " 7 Days +",
      price: `₦${data?.item.weekly_price}/week`,
    },
    {
      duration: "30 Days +",
      price: `₦${data?.item.monthly_price}/month`,
    },
  ];
  const handleInbox = () => {
    history.push("/rentals");
  };
  const childToParent = async (dateData) => {
    console.log(dateData);
    try {
      const response = await createRental({
        duration: dateData.duration,
        from_date: dateData.startDate,
        to_date: dateData.endDate,
        cost: dateData.amount,
        body: "i would like to lend your item",
        subject: "lend request",
        user_id: data.user.id,
        lendee_id: user.id,
        item_id: data.item.id,
      });
      if (response.data === "success") {
        setAlert(
          <SweetAlert
            style={{ width: "16em", fontSize: "1em !important" }}
            success
            title="Booking status sent successfully!"
            onConfirm={handleInbox}
            onCancel={handleInbox}
          >
            Please wait for owners response in your inbox
          </SweetAlert>
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

 

  // const [result, setResult] = useState([]);

  // useEffect(() => {
  //   isSuccess &&
  //     setResult(
  //       // data?.item?.favourites.find(
  //       //   (el) => el.user_id == JSON.parse(localStorage.getItem("id"))
  //       // )
  //     );
  // }, [isSuccess]);

  // const [liked, setLiked] = useState(true);

  // const [favourite] = useFavouriteItemMutation();

  // const likeItem = () => {
  //   setLiked(!liked);
  //   favourite({
  //     user_id: JSON.parse(localStorage.getItem("id")),
  //     item_id: data?.item.id,
  //   });
  // };

  return (
    <>
      <Navbar showLogin={showLogin}/>
      {isFetching ? (
        <TextLoader />
      ) : (
        <div className="rental-page">
          <div className="row w-100 p-0 m-0 mx-auto mt-2 mt-md-3">
            <div className="col-12 col-md-7 px-0 px-md-2 carousel-container ">
              {/* <div
                className="tw-absolute tw-right-6 tw-top-2 md:tw-right-2  tw-z-20 tw-cursor-pointer"
                onClick={likeItem}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`tw-h-4 tw-w-4 ${liked ? "tw-text-pink-700" : ""}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
              </div> */}
              <Carousel
                dynamicHeight={false}
                showArrows={false}
                showIndicators={false}
              >
                {[...Array(data?.item.imagesCount)].map((_, index) => {
                  return (
                    <div className="slider" key={index}>
                      <img
                        src={`${data?.item.imagesCdnUrl}nth/${index}/`}
                        alt=""
                      />
                    </div>
                  );
                })}
              </Carousel>
            </div>
            <div className="col-12 col-md-5 price-wrapper mt-3 mt-md-1">
              <h5>{data?.item.title}</h5>
              <div className="d-flex justify-content-between mt-3 align-items-center px-md-2">
                <div className="d-flex align-items-center">
                  <span className="svg-image d-inline-block me-1"></span>
                  <span>
                    {" "}
                    {`${data.user.first_name} in ${data?.item.city}`}{" "}
                  </span>
                </div>
                <p className="m-0 p-0 ">
                  {" "}
                  5.0 <i className="fas fa-star"></i> (3189){" "}
                </p>
              </div>
              <div className="row w-100 p-0 m-0 mx-auto justify-content-between pricing-col">
                {pricing.map((item, id) => {
                  return (
                    <div className="border col-3 mt-3 py-1" key={id}>
                      <p className="text-center m-0 p-0"> {item.duration} </p>
                      <span className="text-center"> {item.price} </span>
                    </div>
                  );
                })}
              </div>
              <>
                {loggedIn ? (
                  <>
                    {user_id == data.user.id ? (
                      <Link to={`/edit-item/${data.item.slug}`}>
                        <button className="btn btn-success mt-4 d-block mx-auto mb-3">
                          Edit Item
                        </button>
                      </Link>
                    ) : (
                      <>
                        {data.item.is_available ? (
                          <button
                            data-bs-toggle="modal"
                            data-bs-target="#dateModal"
                            className="btn btn-success mt-4 d-block mx-auto mb-3"
                          >
                            Check price and avaibility
                          </button>
                        ) : (
                          <button className="btn btn-success mt-4 d-block mx-auto mb-3">
                            Item is currently unavailable
                          </button>
                        )}
                      </>
                    )}
                  </>
                ) : (
                  <button
                    className="btn btn-success mt-4 d-block mx-auto mb-3"
                    onClick={() => document.getElementById("login-btn").click()}
                  >
                    Login to check price and avaibility
                  </button>
                )}
              </>
            </div>
            <DateModal
              id="dateModal"
              item={data.item}
              childToParent={childToParent}
            />
            {alert}
          </div>
          <ProductDescription
            description={data.item.description}
            path={data.category_path}
          />
          {isGot
            ? owner.id != user_id && (
                <>
                  <div className="px-1 px-md-3">
                    <div className="item-owned mt-2">
                      <h5> Item owned by {owner.first_name} </h5>
                      <div className="d-flex ms-2 mx-2 mx-md-0">
                        <img
                          src={`${url}${owner.profile[0].picture}`}
                          alt={owner.first_name}
                        />
                        <div className="ms-4">
                          {/* <p>
                    5.0 <i className="fas fa-star"></i> (3189)
                    <button className="btn btn-success bi bi-star ms-3">
                      &nbsp;super lender
                    </button>
                  </p> */}
                          <p className="!tw-text-sm font-medium">
                            {owner.profile[0].bio}
                          </p>
                          <span className="tw-text-xs">
                            {" "}
                            Typically replies within a few minutes{" "}
                          </span>
                          <div className="btn-wrapper mt-2">
                            <Link
                              to={`/chat?userId=${data?.item.user}`}
                              className="btn me-2 py-1"
                            >
                              {" "}
                              Message {owner.first_name}{" "}
                            </Link>
                            <Link
                              to={`/user/${data?.item.user}`}
                              className="btn py-1"
                            >
                              {" "}
                              See {data.user.first_name} profile{" "}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <OtherItems user_items={data?.user_items} user={data?.user} />
                </>
              )
            : null}

          {/* <Reviews user={data?.user}/> */}
          <MoreItems />

          <WhyRentWithUs />
        </div>
      )}
    </>
  );
};

export default Rental;
