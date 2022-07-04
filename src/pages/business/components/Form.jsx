import React, { useState } from "react";
import { useCreateContactMutation } from "../../../services/AdminApi";
import SweetAlert from "react-bootstrap-sweetalert";

const Form = () => {
  const [
    createContact, // This is the mutation trigger
    { isLoading, isSuccess: isGetUsersSuccess }, // This is the destructured mutation result
  ] = useCreateContactMutation();

  const [alert, setAlert] = useState(null);

  const [contactForm, setContactForm] = useState({
    name: "",
    company_name: "",
    company_email: "",
    contact_number: "",
    city: "",
    content: "",
  });
  const handleInputChange = (event) => {
    event.preventDefault();
    setContactForm({
      ...contactForm,
      [event.target.name]: event.target.value,
    });
  };

  const hideAlert = () => {
    setAlert(null);
  };

  const hndleSubmit = (event) => {
    event.preventDefault();

    createContact(contactForm);

    setAlert(
      <SweetAlert
        success
        title="Success!"
        onConfirm={hideAlert}
        style={{ width: "16em", fontSize: "1em !important" }}
      >
        You will be contacted shortly
      </SweetAlert>
    );
  };

  return (
    <>
      <form className="d-block mx-auto needs-validation" onSubmit={hndleSubmit}>
        <h5 className="text-center mt-3 mb-1"> Get In Touch </h5>
        <p className="text-center mb-1"> Get a response within 24 hours </p>
        <div>
          <input
            type="text"
            className="form-control py-2 mt-3 request-form-name-input"
            id="name"
            name="name"
            placeholder="name"
            required
            onChange={handleInputChange}
            value={contactForm.name}
          />
          <div className="valid-feedback">Valid.</div>
          <div className="invalid-feedback">Please fill out this field.</div>
        </div>

        <input
          type="text"
          className="form-control py-2 mt-3"
          id="company-name"
          name="company_name"
          placeholder="company name"
          onChange={handleInputChange}
          value={contactForm.company_name}
          required
        />
        <input
          type="email"
          className="form-control py-2 mt-3"
          id="company-email"
          name="company_email"
          placeholder="company email"
          onChange={handleInputChange}
          value={contactForm.company_email}
          required
        />
        <input
          type="text"
          className="form-control py-2 mt-3"
          id="contact-number"
          name="contact_number"
          placeholder="contact number"
          onChange={handleInputChange}
          value={contactForm.contact_number}
          required
        />
        <input
          type="text"
          className="form-control py-2 mt-3"
          id="city"
          name="city"
          placeholder="city"
          onChange={handleInputChange}
          value={contactForm.city}
          required
        />
        <textarea
          type="text"
          className="form-control py-2 mt-3"
          id="content"
          name="content"
          required
          onChange={handleInputChange}
          value={contactForm.content}
          placeholder="products you are looking to rent e.g ( windows , mackbook ) etc.."
        />
        <button className="btn btn-success mt-2 d-block mx-auto" type="submit">
          {isLoading ? "Loading..." : "Request A Callback"}
        </button>
      </form>
      {alert}
    </>
  );
};

export default Form;
