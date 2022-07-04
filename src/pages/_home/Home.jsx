import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/_navbar/Navbar";
import Categories from "./components/Categories";
import Header from "./components/Header";
import RentalReviews from "./components/RentalReviews";
import AccessEverything from "./components/AcessEverything";
import { useGetCategoriesQuery , useGetCategoryQuery} from "../../services/categoriesApi";

const Home = () => {
//   const { data, error, isLoading, isFetching, isSuccess } =
//     useGetCategoriesQuery(1);

//     const { data, error, isLoading, isFetching, isSuccess } = useGetCategoryQuery(1)


    

  React.useEffect(() =>
    window.scrollTo({ top: 0, left: 0, scrollBehaviour: "smooth" })
  );

  return (
    <div className="home-page">
      <Navbar />
      <Header />
      <div className="row w-100 m-0 p-0 mx-auto mt-2 mt-md-4 save-more mb-4">
        <div className="col-12 col-sm-6 col-md-4">
          <img
            src={require("../../assets/IMG-20220328-WA0010.jpg")}
            alt="quality tested"
          />
          <h5 className="mb-1"> Rent in 3 clicks </h5>
          <p> Select your product & pay to confirm viola! </p>
        </div>
        <div className="col-12 col-sm-6 col-md-4">
          <img
            src={require("../../assets/IMG-20220328-WA0009.jpg")}
            alt="Rent"
          />
          <h5 className="mb-1"> To ensure they work as good as new </h5>
          <p> Buy less. Rent for a fraction of the cost. </p>
        </div>
        <div className="col-12 col-sm-6 col-md-4">
          <img
            src={require("../../assets/IMG-20220328-WA0011.jpg")}
            alt="customer support"
          />
          <h5 className="mb-1"> Dedicated customer support </h5>
          <p> Incase you are stuck. we are just a call away </p>
        </div>
      </div>
      <Categories />
      <AccessEverything />
      <div className="px-2 px-md-4 d-flex justify-content-center share-your-stuff">
        <img src={require("../../assets/bookings.png")} alt="device" />
        <div className="wrapper align-self-md-center mt-3 mt-md-0">
          <h5> Share your stuff, earn cash </h5>
          <p>
            Pay back your purchases by lending them to people in your area when
            you're not using them.
          </p>
          <p>
            Do it all worry free with verified borrowers and lender protection
            up to £25,000 per item
          </p>
          <Link to={"/list-an-item"} className="btn btn-success py-1">
            {" "}
            Start Earning{" "}
          </Link>
        </div>
      </div>
      <div className="px-1 px-md-4 d-flex justify-content-center get-access mb-4">
        <div className="wrapper align-self-md-center">
          <img
            src={require("../../assets/mockup2.png")}
            alt="device"
            className="d-sm-none"
          />
          <h5> Get access to (almost) anything </h5>
          <p>
            Why buy the things you’ll only use a few times a month? When you can
            rent them for a fraction of the price?
          </p>
          <p>More money for you. Less waste for the planet.</p>
          <Link to={"/search/camera"} className="btn btn-success py-1">
            {" "}
            Start Borrowing{" "}
          </Link>
        </div>
        <img
          src={require("../../assets/mockup2.png")}
          alt="device"
          className="d-none d-md-inline-block"
        />
      </div>
      <RentalReviews />
    </div>
  );
};

export default Home;
