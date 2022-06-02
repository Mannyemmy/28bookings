import React, { useState } from "react";
import { register } from "../../../services/authServices";

const SignIn = ({ setShowSignUp }) => {
  const handleSetShowSignup = () => setShowSignUp(true);
  const [isLoading, setIsLoading] = useState(false);

  const [signIn, setSignIn] = useState({
    email: "",
    first_name: "",
    last_name: "",
    phone: "",
    password: "",
    location: "",
    confirmPassword: "",
    errorMessage: "",
    successMessage: "",
    isOk: true,
  });

  React.useLayoutEffect(() => {
    document.body.style.overflowY = "scroll";
    window.scroll(0, 0);
  }, []);

  const handleSignIn = (event) => {
    event.preventDefault();
    setSignIn({ ...signIn, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    /* client side validation */
    // dom selector function
    const $ = (element) => document.querySelector(element);

    const {
      isOk,
      password,
      confirmPassword,
      errorMessage,
      email,
      first_name,
      last_name,
      phone,
      location,
    } = signIn;

    if (password.length < 8 && confirmPassword.length < 8) {
      setSignIn({
        ...signIn,
        isOk: false,
        errorMessage: "Error! password should be atleast 8 characters.",
      });
    }

    if (password !== confirmPassword) {
      setSignIn({
        ...signIn,
        isOk: false,
        errorMessage: "Error! the two password did no match.",
      });
    }

    //check if email address is valid
    if (!email.includes("@") || email.startsWith("@") || email.endsWith("@")) {
      setSignIn({
        ...signIn,
        isOk: false,
        errorMessage: "Please use a valid email address.",
      });
      $(".sign-up-email").focus();
    }

    if (
      !first_name ||
      !last_name ||
      !password ||
      !confirmPassword ||
      !email ||
      !phone ||
      !location
    ) {
      setSignIn({
        ...signIn,
        isOk: false,
        errorMessage: "Please fill all the required fields.",
      });
    }
    /* ------------------------- */
    //send a form data to the server..
    try {
    setIsLoading(true);
      const res = await register(
        first_name,
        last_name,
        email,
        password,
        phone,
        location
      );
      
      if (res.status === 200) {
        setIsLoading(false)
        setSignIn({
          ...signIn,
          isOk: true,
          successMessage: "Registration successful",
        });
        handleSetShowSignup();
      } else {
        setIsLoading(false)
        setSignIn({ ...signIn, isOk: false, errorMessage: res.detail });
      }
    } catch (error) {
      console.log(error);
      setSignIn({
        ...signIn,
        isOk: false,
        errorMessage: error.response.data.detail,
      });
    }
  };

  return (
    <div className="sign-in-container">
      <form style={{ width: "94%" }} className="mt-1 d-block mx-auto">
        <span
          className="btn-close d-close-r-sidebar text-reset d-inline-block p-2"
          data-bs-dismiss="offcanvas"
        ></span>
        <h1> Hey There! </h1>
        <p className="mb-1">
          {" "}
          Looks like you're new here. Enter your details and get started.{" "}
        </p>
        <span className="divider d-block  mb-1"></span>
        <label htmlFor="email">
          {" "}
          Email <sup className="text-danger"> * </sup>{" "}
        </label>
        <input
          type="email"
          name="email"
          value={signIn.email}
          id="email"
          className="form-control py-3 py-md-1 sign-up-email"
          placeholder="jhondoe@example.com"
          onChange={handleSignIn}
          maxLength={200}
        />
        <label htmlFor="first_name">
          First Name <sup className="text-danger"> * </sup>{" "}
        </label>
        <input
          type="text"
          name="first_name"
          value={signIn.first_name}
          id="first_name"
          className="form-control py-3 py-md-1"
          placeholder="your first name.."
          onChange={handleSignIn}
          maxLength={200}
        />
        <label htmlFor="last_name">
          Last Name <sup className="text-danger"> * </sup>{" "}
        </label>
        <input
          type="text"
          name="last_name"
          value={signIn.last_name}
          id="last_name"
          className="form-control py-3 py-md-1"
          placeholder="your last name.."
          onChange={handleSignIn}
          maxLength={200}
        />
        <label htmlFor="phone">
          Phone Number <sup className="text-danger"> * </sup>{" "}
        </label>
        <input
          type="text"
          name="phone"
          value={signIn.phone}
          id="phone"
          className="form-control py-3 py-md-1"
          placeholder="your phone number.."
          onChange={handleSignIn}
          maxLength={200}
        />
        <label htmlFor="address">
          Address <sup className="text-danger"> * </sup>{" "}
        </label>
        <input
          type="text"
          name="location"
          value={signIn.location}
          id="location"
          className="form-control py-3 py-md-1"
          placeholder="your address.."
          onChange={handleSignIn}
          maxLength={200}
        />
        <label htmlFor="password">
          Password<sup className="text-danger"> * </sup>{" "}
        </label>
        <input
          type="password"
          name="password"
          value={signIn.password}
          id="password"
          className="form-control py-3 py-md-1"
          placeholder="password.."
          onChange={handleSignIn}
          maxLength={16}
        />
        <label htmlFor="c-password">
          Confirm password<sup className="text-danger"> * </sup>{" "}
        </label>
        <input
          type="password"
          name="confirmPassword"
          value={signIn.confirmPassword}
          id="c-password"
          className="form-control py-3 py-md-1"
          placeholder="confirm password.."
          onChange={handleSignIn}
          maxLength={16}
        />
        <p className="status text-danger mt-1 m-0"> {signIn.errorMessage} </p>
        <p className="sign-in p-0 mb-2 pt-2 pt-md-0">
          {" "}
          Already have an account ?
          <span className="text-primary ms-1" onClick={handleSetShowSignup}>
            {" "}
            Login{" "}
          </span>
        </p>
        <button
          disabled={isLoading}
          className="btn btn-success d-block w-75 mx-auto"
          onClick={handleSubmit}
        >
          {isLoading ? (
            <i className="spinner spinner-border text-white"></i>
          ) : (
            "Create Account"
          )}
        </button>
      </form>
    </div>
  );
};

export default SignIn;
