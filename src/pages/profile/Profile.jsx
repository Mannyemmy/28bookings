import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AccountSettings from "./components/AccountSettings";
import MyStarts from "./components/MyStarts";
import RentalAndReviews from "./components/RentalAndReviews";
import Navbar from "../../components/_navbar/Navbar";

const Profile = () => {
  


  React.useEffect(() =>
    window.scrollTo({ top: 0, left: 0, scrollBehaviour: "smooth" })
  );
  const  credentials  = useSelector((state) => state.auth.user);

  return (
    <>
      <Navbar />
      <div className="profile">
        <div className="d-flex px-2 px-md-4  px-xl-5 mt-3">
          <div className="profile-info text-dark">
            <img
              src={`${credentials.profile[0].picture}`}
              alt={`${credentials.first_name}'s profile`}
              className="border"
            />
            <Link to={"/edit-profile"} className="text-center text-dark mt-2">
              Edit Profile
            </Link>
            <AccountSettings />
            <MyStarts />
            <p> Typically replies within a few hours </p>
          </div>
          <div className="r-wrapper ms-md-4 ms-xl-5 mt-md-5">
            <h5> {credentials.first_name} {credentials.last_name}</h5> 
            
              {
                credentials.profile[0].bio === "" ? (
                  <p>
                    Add a short description of yourself and your interests by clicking
              <Link to={"/edit-profile"} className="text-primary ms-1">
                here.
              </Link>
                  </p>
                ) : (
                  <p>
                    {credentials.profile[0].bio}
                  </p>
                )
              }
            
            
          </div>
        </div>
        <RentalAndReviews  />
      </div>
    </>
  );
};

export default Profile;
