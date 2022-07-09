import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AccountSettings from "./components/AccountSettings";
import MyStarts from "./components/MyStarts";
import RentalAndReviews from "./components/RentalAndReviews";
import Navbar from "../../components/_navbar/Navbar";
import { useGetUserQuery } from "../../services/usersApi";
import { url } from "../../helper";
import RentalLoader from "../rental/components/RentalLoader";
import Withdraw from "./components/Withdraw.jsx"
import TextLoader from "../../components/TextLoader"

const Profile = () => {
  React.useEffect(() =>
    window.scrollTo({ top: 0, left: 0, scrollBehaviour: "smooth" })
  );
  const credentials = useSelector((state) => state.auth.user);
  const { data: user, isLoading, isSuccess } = useGetUserQuery(credentials.id);

  return (
    <>
      <Navbar />
      {isLoading ? (
        <TextLoader />
      ) : (
        user && (
          <div className="profile">
            <div className="d-flex px-2 px-md-4  px-xl-5 mt-3">
              <div className="profile-info text-dark">
                <img
                  src={`${url}${user.profile[0].picture}`}
                  alt={`${user.first_name}'s profile`}
                  className="border"
                />
                <Link
                  to={"/edit-profile"}
                  className="text-center text-dark mt-2"
                >
                  Edit Profile
                </Link>
                {/* <AccountSettings /> */}
                <MyStarts user={user} />
                <Withdraw user={user} />
                <p> Typically replies within a few hours </p>
              </div>
              <div className="r-wrapper ms-md-4 ms-xl-5 mt-md-5">
                <h5>
                  {" "}
                  {user.first_name} {user.last_name}
                </h5>

                {user.profile[0].bio === "" ? (
                  <p>
                    Add a short description of yourself and your interests by
                    clicking
                    <Link to={"/edit-profile"} className="text-primary ms-1">
                      here.
                    </Link>
                  </p>
                ) : (
                  <p>{user.profile[0].bio}</p>
                )}
              </div>
            </div>
            <RentalAndReviews />
          </div>
        )
      )}
    </>
  );
};

export default Profile;
