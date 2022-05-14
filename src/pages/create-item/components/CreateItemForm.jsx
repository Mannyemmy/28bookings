import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Widget } from "@uploadcare/react-widget";
import Select from 'react-select';
import "./item.css";
import { useGetCategoriesQuery } from "../../../services/categoriesApi";
import categoriesSlice from "../../../features/categories/categoriesSlice";


const groupStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};
const groupBadgeStyles = {
  backgroundColor: '#EBECF0',
  borderRadius: '2em',
  color: '#172B4D',
  display: 'inline-block',
  fontSize: 12,
  fontWeight: 'normal',
  lineHeight: '1',
  minWidth: 1,
  padding: '0.16666666666667em 0.5em',
  textAlign: 'center',
};

const formatGroupLabel = (data) => (
  <div style={groupStyles}>
    <span>{data.label}</span>
    <span style={groupBadgeStyles}>{data.options.length}</span>
  </div>
);



const CreateItemForm = () => {

  const { data, error, isLoading, isFetching, isSuccess } =
    useGetCategoriesQuery(1);

  const [groupedCategories, setGroupedCategories ] = useState([])

  useEffect(() => {
    setGroupedCategories(data?.map((category)=>{
     return {
       label: category.name,
       options: category.children.map(children => {
         return {
           label: children.name,
           value: children.id
         }
       })
     };
   }))
  }, [data])
  

  const [selectedCategory, setSelectedCategory] = useState({
    id : '',
    path : ""
  })

  const widgetApi = useRef();

  const [createItemForm, setCreateItemForm] = useState({
    productImage: "",
    listenTitle: "",
    description: "",
    rentalPrice: "",
    itemValue: "",
    minimumRentalValue: "",
    errorMessege: "",
  });

  const handleInputChange = (event) => {
    event.preventDefault();
    if (event.target.type === "file") {
      setCreateItemForm({
        ...createItemForm,
        [event.target.name]: event.target.files[0],
      });
    }
    setCreateItemForm({
      ...createItemForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //send input data to the server using javascript form data api.
    const formData = new FormData(
      document.querySelector("form.create-item-form")
    );
    // send form data using fetch api..
  };

  return (
    <form className="d-block mx-auto create-item-form">
      <h5 className="mb-0"> Add Product Images </h5>
      <p className="mb-1 text-secondary upload-warning">
        Please upload at least a product image that clearly shows your product
        item.
      </p>
      <div className="input-wrapper">
        <label
          onClick={() => widgetApi.current.openDialog()}
          htmlFor="product-image"
          className="product-image d-flex justify-content-center border"
          style={{ cursor: "pointer" }}
        >
          <span className="bi bi-camera align-self-center"></span>
        </label>
        <div>
          <Widget
            multipleMax={5}
            multipleMaxStrict
            multiple="true"
            imagesOnly="true"
            type="hidden"
            tabs="file camera gdrive dropbox instagram"
            publicKey="66ee1a8e2dd4500b9f1d"
            id="product-image"
            ref={widgetApi}
          />
        </div>

        <label htmlFor="listing-title">
          Listing title <span className="text-danger"> * </span>
        </label>
        <input
          type="text"
          name="listenTitle"
          id="listen-title"
          className="form-control py-2"
          maxLength={40}
          placeholder="not more than 40 characters.."
          value={createItemForm.listenTitle}
          onChange={handleInputChange}
        />

        <label htmlFor="category">
          Category <span className="text-danger"> * </span>
        </label>
        <Select options={groupedCategories}  formatGroupLabel={formatGroupLabel} className classNamePrefix="custom"/>

       

       

        <label htmlFor="description">
          Description <span className="text-danger"> * </span>
        </label>
        <textarea
          name="description"
          id="description"
          className="form-control"
          placeholder="add a short description of your item.."
          value={createItemForm.description}
          onChange={handleInputChange}
        />
        <div className="rental-price-wrapper d-flex align-items-center mt-2">
          <label htmlFor="rental-price">
            Rental price ($) per / day <span className="text-danger"> * </span>
          </label>
          <input
            type="number"
            min={0}
            name="rentalPrice"
            id="listen-price"
            className="form-control py-md-1  w-25 ms-2"
            maxLength={40}
            placeholder="add price/day"
            value={createItemForm.rentalPrice}
            onChange={handleInputChange}
          />
        </div>
        <div className="rental-price-wrapper d-flex align-items-center mt-2">
          <label htmlFor="rental-price">
            Rental price ($) per / week <span className="text-danger"> * </span>
          </label>
          <input
            type="number"
            min={0}
            name="rentalPrice"
            id="listen-price"
            className="form-control py-md-1  w-25 ms-2"
            maxLength={40}
            placeholder="add price/week"
            value={createItemForm.rentalPrice}
            onChange={handleInputChange}
          />
        </div>
        <div className="rental-price-wrapper d-flex align-items-center mt-2">
          <label htmlFor="rental-price">
            Rental price ($) per / month <span className="text-danger"> * </span>
          </label>
          <input
            type="number"
            min={0}
            name="rentalPrice"
            id="listen-price"
            className="form-control py-md-1  w-25 ms-2"
            maxLength={40}
            placeholder="add price/month"
            value={createItemForm.rentalPrice}
            onChange={handleInputChange}
          />
        </div>
        <div className="item-value-wrapper d-flex align-items-center mt-2">
          <label htmlFor="item-value">
            Item Value<span className="text-danger"> * </span>
          </label>
          <input
            type="number"
            min={0}
            name="itemValue"
            id="rental-value"
            className="form-control py-md-1  w-25 ms-2"
            maxLength={40}
            placeholder="item value.."
            value={createItemForm.itemValue}
            onChange={handleInputChange}
          />
        </div>
        <div className="minimum-rentals-wrapper d-flex align-items-center mt-2">
          <label htmlFor="minimum-rentals">
            Minimum Rental Value <span className="text-danger"> * </span>
          </label>
          <input
            type="number"
            min={0}
            name="minimumRentalValue"
            id="minimum-rentals"
            className="form-control py-md-1  w-25 ms-2"
            maxLength={40}
            placeholder="add value.."
            value={createItemForm.minimumRentalValue}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="border-top mt-3">
        <p className="error-messege text-danger mt-2">
          {" "}
          {createItemForm.errorMessege}{" "}
        </p>
        <div className="d-flex add-item-wrapper justify-content-end mb-4 pt-2">
          <div>
            <button
              className="btn btn-success px-3 me-2"
              onClick={handleSubmit}
            >
              Add New Item
            </button>
            <Link to="/list-an-item" className="btn ">
              {" "}
              Cancel{" "}
            </Link>
          </div>
        </div>
      </div>
     
    </form>
  );
};

export default CreateItemForm;
