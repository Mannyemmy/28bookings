import React, { useState } from "react";
import { useFavouriteItemMutation } from "../services/itemsApi";
import Slider from "react-slick";
import { useHistory } from "react-router-dom";

const ItemCard = ({ item , favouritePage}) => {

let result = item.favourites.find(el => el.user_id == JSON.parse(localStorage.getItem("id")));;  



  const [liked, setLiked] = useState(result?.status);
  const history = useHistory();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: true,
    arrows: true,
  };

  const handleNavigateToRentalPage = (slug) => {
    history.push(`/rental/${slug}`);
  };

  const [favourite, { isLoading, isSuccess }] = useFavouriteItemMutation();

  const likeItem = ()=> {
      setLiked(!liked)
      favourite({
          user_id: JSON.parse(localStorage.getItem("id")),
          item_id: item.id,
      })
  }

  if(favouritePage){
      return (
      
        <div className="tw-relative">
          <div className="tw-absolute tw-right-6 tw-top-2 md:tw-right-2  tw-z-20 tw-cursor-pointer" onClick={likeItem}>
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
          </div>
          <Slider {...settings}>
            {[...Array(item.imagesCount)].map((_, index) => {
              return (
                <div className="" key={index}  onClick={() => handleNavigateToRentalPage(item.slug)}>
                  <img
                    src={`${item.imagesCdnUrl}nth/${index}/`}
                    alt={item.title}
                    className="tw-w-full tw-h-60 md:tw-h-32 tw-object-contain md:tw-object-cover tw-object-center tw-cursor-pointer tw-rounded-lg"
                  />
                </div>
              );
            })}
  
     
          </Slider>
  
          <p className="d-flex justify-content-between px-1 mt-2 mb-1">
            <span>
              {" "}
              {item.created_by.first_name} {item.created_by.last_name}
            </span>
            <span className="tw-text-green-400 font-semibold">
              {item.city.toUpperCase()}
            </span>
            {/* <span> <i className="fas fa-star"></i> { item.stars }</span> */}
          </p>
          <h6 className="mb-0 px-1"> {item.title} </h6>
          <p className="price p-0 pt-1 mb-1 px-1">₦{item.daily_price}/day</p>
        </div>
     
      )
  }

  return (
    <div

      className="col-12 col-md-3 p-0 m-0 mt-3 mt-md-2"
    >
      <div className="d-block mx-auto tw-relative">
        <div className="tw-absolute tw-right-6 tw-top-2 md:tw-right-2  tw-z-20 tw-cursor-pointer" onClick={likeItem}>
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
        </div>
        <Slider {...settings}>
          {[...Array(item.imagesCount)].map((_, index) => {
            return (
              <div className="" key={index}  onClick={() => handleNavigateToRentalPage(item.slug)}>
                <img
                  src={`${item.imagesCdnUrl}nth/${index}/`}
                  alt={item.title}
                  className="w-100  tw-cursor-pointer tw-rounded-lg"
                />
              </div>
            );
          })}

          {/*                       
      <img
        src={`${item.imagesCdnUrl}nth/${0}/`}
        alt={item.title}
        className="w-100 !tw-rounded-md"
      /> */}
        </Slider>

        <p className="d-flex justify-content-between px-1 mt-2 mb-1">
          <span>
            {" "}
            {item.created_by.first_name} {item.created_by.last_name}
          </span>
          <span className="tw-text-green-400 font-semibold">
            {item.city.toUpperCase()}
          </span>
          {/* <span> <i className="fas fa-star"></i> { item.stars }</span> */}
        </p>
        <h6 className="mb-0 px-1"> {item.title} </h6>
        <p className="price p-0 pt-1 mb-1 px-1">₦{item.daily_price}/day</p>
      </div>
    </div>
  );
};

export default ItemCard;
