import React, { useState } from "react";
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
import { useGetItemBySlugQuery } from "../../services/itemsApi";
import RentalLoader from "./components/RentalLoader";
import { createRental } from "../../services/rentalServices";
import SweetAlert from "react-bootstrap-sweetalert";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Rental = () => {
  const history = useHistory()
  let { slug } = useParams();
  const { data, error, isLoading, isFetching, isSuccess } =
    useGetItemBySlugQuery(slug);
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
  const handleInbox = ()=>{
    history.push('/rentals')
  }
  const childToParent = async (dateData) => {
    console.log(dateData)
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
    if (response.data === 'success') {
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

  return (
    <>
      <Navbar />
      {isFetching ? (
        <div style={{ width: "100%", marginTop: "10px" }}>
          <RentalLoader viewBox="0 0 700 360" />
        </div>
      ) : (
        <div className="rental-page">
          <div className="row w-100 p-0 m-0 mx-auto mt-2 mt-md-3">
            <div className="col-12 col-md-7 px-0 px-md-2 carousel-container">
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
              <button
                data-bs-toggle="modal"
                data-bs-target="#dateModal"
                className="btn btn-success mt-4 d-block mx-auto mb-3"
              >
                Check price and avaibility
              </button>
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
          <div className="px-1 px-md-3">
            <div className="item-owned mt-2">
              <h5> Item owned by {data.user.first_name} </h5>
              <div className="d-flex ms-2 mx-2 mx-md-0">
                <img
                  src={require("../../assets/anthony.jpg")}
                  alt="user profile"
                />
                <div className="ms-4">
                  <p>
                    5.0 <i className="fas fa-star"></i> (3189)
                    <button className="btn btn-success bi bi-star ms-3">
                      &nbsp;super lender
                    </button>
                  </p>
                  {data.user.bio}
                  <span> Typically replies within a few minutes </span>
                  <div className="btn-wrapper mt-2">
                    <Link
                      to={`/chat?userId=${data?.item.user}`}
                      className="btn me-2 py-1"
                    >
                      {" "}
                      Message {data.user.first_name}{" "}
                    </Link>
                    <Link
                      to={`/profile/${data?.item.user}`}
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
          <OtherItems user_items={data?.user_items} user_id={data?.user.id} />
          <Reviews />
          <MoreItems />
        
          <WhyRentWithUs />
        </div>
      )}
    </>
  );
};

export default Rental;
