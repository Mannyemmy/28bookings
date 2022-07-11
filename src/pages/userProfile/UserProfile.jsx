import React from "react";
import { Link , useParams} from "react-router-dom";
import RentalAndReviews from "./components/RentalAndReviews";
import Navbar from "../../components/_navbar/Navbar";
import { useGetUserQuery } from "../../services/usersApi";
import { url } from "../../helper";
import RentalLoader from "../rental/components/RentalLoader";
import TextLoader from "../../components/TextLoader"

const Profile = () => {
  React.useEffect(() =>
    window.scrollTo({ top: 0, left: 0, scrollBehaviour: "smooth" })
  );

  let {id} = useParams();
  
  const { data: user, isLoading, isSuccess } = useGetUserQuery(id);

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
                  className="border tw-mb-2"
                />
                <Link
                  to={`/chat?userId=${user.id}`}
                 
                >
                  <span  className="text-center tw-text-white  tw-rounded-md tw-bg-green-500 tw-py-1 tw-px-2 tw-my-2 ">
                    Message {user.first_name}
                  </span>
                  
                </Link>
                {/* <AccountSettings /> */}
                {/* <MyStarts user={user} /> */}
                <p> Typically replies within a few hours </p>
              </div>
              <div className="r-wrapper ms-md-4 ms-xl-5 mt-md-5">
                <h5>
                  {" "}
                  {user.first_name} {user.last_name}
                </h5>

                {user.profile[0].bio === "" ? (
                  <p>
                    No bio found
                  </p>
                ) : (
                  <p>{user.profile[0].bio}</p>
                )}
              </div>
            </div>
            <RentalAndReviews data={user.items} isLoading={isLoading} isSuccess={isSuccess} />
          </div>
        )
      )}
    </>
  );
};

export default Profile;
