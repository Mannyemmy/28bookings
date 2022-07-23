import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useUpdateProfileMutation, useChangePasswordMutation } from "../../../services/usersApi";
import {signout } from "../../../services/authServices"

import { useHistory } from "react-router-dom";

const EditProfileForm = ({ user }) => {
  let history = useHistory();

  const [message,  setMessage] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [updateProfile, { isLoading, isSuccess }] = useUpdateProfileMutation();
  const [changePassword, { isLoading : changingPassword, isSuccess : changedPassword, error }] = useChangePasswordMutation();

  const [editForm, setEditForm] = useState({
    profileImage: "",
    username: "",
    city: "",
    businessName: "",
    about: "",
    storeAddress: "",
    errorMessege: "",
  });

  const { credentials } = useSelector((state) => state.login);

  // useEffect(
  //     () => {
  //          //set the value of input fields to value of the logged user.
  //           setEditForm({...editForm , username : credentials.name })
  //     } , []
  //  )
  // handle input change
  const handleEditFormChange = (event) => {
    event.preventDefault();
    //check if input type is file
    if (event.target.type === "file") {
      setEditForm({ ...editForm, [event.target.name]: event.target.files[0] });
    }
    setEditForm({ ...editForm, [event.target.name]: event.target.value });
  };

  // handle form submit
  const onSubmit = async (data) => {
    const formData = new FormData();

    data.file[0] && formData.append("file", data.file[0]);

    formData.append("bank", data.bank);
    formData.append("account_number", data.account_number);
    formData.append("location", data.location);
    formData.append("bio", data.bio);

    await updateProfile({ id: user.profile[0].id, body: formData });
  };

  const onPasswordChange = async (data) => {
    var body = {
      old_password: data.old_password,
      new_password: data.new_password,
      confirm_password: data.confirm_password
    } 
    await changePassword(body)
  }

  useEffect(() => {
    isSuccess && history.push("/profile");
  }, [isSuccess]);

  useEffect(() => {
    changedPassword && signout();
  } ,[changedPassword])

  return (
    <>
      <form
        className="w-100 m-0 p-0 edit-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="profile-image" className="btn p-0 m-0 profile-image">
          Change profile picture
        </label>
        <input
          type="file"
          name="profileImage"
          id="profile-image"
          className="image-label"
          accept="image/*"
          {...register("file")}
          // onChange = {  handleEditFormChange }
        />
        <div className="inputs-wrapper mt-3">
          <label htmlFor="name"> Update Account Number </label>
          <input
            id="account_number"
            type="text"
            name="account_number"
            placeholder="your Bank Account"
            className="form-control py-2"
            defaultValue={user.account_number}
            required
            {...register("account_number")}
            // onChange = {  handleEditFormChange }
          />
          <label htmlFor="name"> Update Bank </label>
          <input
            id="bank"
            type="text"
            name="bank"
            placeholder="your Bank"
            className="form-control py-2"
            defaultValue={user.bank}
            required
            {...register("bank")}
            // onChange = {  handleEditFormChange }
          />
          <label htmlFor="city" className="mt-3">
            {" "}
            Your City{" "}
          </label>
          <input
            id="city"
            type="text"
            name="city"
            placeholder="add city.."
            className="form-control py-2"
            defaultValue={user.location}
            required
            {...register("location")}
            // onChange = {  handleEditFormChange }
          />

          <label htmlFor="about" className="mt-3">
            {" "}
            Add few words about your self{" "}
          </label>
          <textarea
            id="bio"
            type="text"
            name="bio"
            className="form-control py-2"
            required
            defaultValue={user.profile[0].bio}
            {...register("bio")}
            // onChange = {  handleEditFormChange }
          />
          {/* <span data-bs-toggle='collapse' data-bs-target='#advanced' className='dropdown-toggle'>
                         Advanced
                    </span>
                    <div id='advanced' className='collapse'>
                       <label htmlFor='location' className='mt-1'> Store Location </label>
                       <p className='p-location mb-1 text-secondary'>
                            Add a specific address for your rental store. 
                           This will be visible to all renters. Only recommended
                            for businesses using a commercial location. 
                        </p>
                        <textarea
                                id='location'
                                type='text'
                                name='storeAddress'                        
                                className='form-control py-2'
                                value={ editForm.storeAddress }  
                                onChange = {  handleEditFormChange }  
                        />
                   </div> */}
        </div>
        <p className="status"></p>
        <div className="d-flex update-data justify-content-end mb-4 border-top pt-2">
          <div>
            <button className="btn btn-success px-3 me-2" type="submit">
              {isLoading ? "Loading..." : "Save"}
            </button>
            <Link to="/profile" className="btn ">
              {" "}
              Cancel{" "}
            </Link>
          </div>
        </div>
      </form>
      <div className="row p-2 g-0">
        <div className="col-12 col-md-6 offset-md-3 ">
          <h1 className="text-center">Change Password</h1>
          <form   onSubmit={handleSubmit(onPasswordChange)}>
            <div class="form-group">
              <label for="old_password" >Old Password</label>
              <input
                type="password"
                class="form-control"
                id="old_password"
                required
                placeholder="current password"
                {...register("old_password")}
              />
            </div>
            <div class="form-group">
              <label for="new_password">New Password</label>
              <input
                type="password"
                class="form-control"
                id="new_password"
                required
                placeholder="enter new password"
                {...register("new_password")}
              />
            </div>
            <div class="form-group">
              <label for="confirm_password">Confirm password</label>
              <input
                type="password"
                class="form-control"
                id="confirm_password"
                required
                placeholder="confirm new password"
                {...register("confirm_password")}
              />
            </div>
            <button type="submit" class="btn btn-primary w-100 my-2">{changingPassword ? "Loading..." : "Submit"} </button>
          </form>
          {error && (<p class="text-danger">{error.data.detail}</p> )}
        </div>
      </div>
    </>
  );
};

export default EditProfileForm;
