import React,{useState, useEffect} from "react";
import Navbar from "../../components/_navbar/Navbar";
import { useForm } from "react-hook-form";
import { useForgotPasswordMutation } from "../../services/usersApi";

const Index = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

    const [message, setMessage] = useState(null);

  const [forgotPassword, { isSuccess, isLoading  , error}] =
    useForgotPasswordMutation();

  // handle form submit
  const onSubmit = async (data) => {
    const email = data.email;

    await forgotPassword({ email: email });
  };


  useEffect(() => {
    isSuccess && setMessage("check your email for the reset link")
  }, [isSuccess])
  


  return (
    <>
      <Navbar />
      <div className="tw-max-w-5xl tw-mx-auto">
        <div className="tw-w-full tw-rounded-md tw-p-5">
          <h1 className="text-center">Reset your password</h1>
          <p className="text-center">
            Please enter your email address and a link allowing you to reset
            your password will be emailed to you.
          </p>
          <div className="row g-0 m-2">
            <form
              className="col-12 col-md-6 offset-md-3"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email address"
                {...register("email")}
              />
              <button type="submit" className="btn btn-success w-100 mt-2">
                {isLoading ? (
                  <div class="spinner-border spinner-border-sm text-success" role="status">
                    <span class="sr-only tw-hidden">Loading...</span>
                  </div>
                ) : (
                  "submit"
                )}
              </button>
              <p class="text-success mt-1">{message}</p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
