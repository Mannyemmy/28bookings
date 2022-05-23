import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Widget } from "@uploadcare/react-widget";
import Select from "react-select";
import "./item.css";
import { useGetCategoriesQuery } from "../../../services/categoriesApi";
import api from "../../../Api";
import categoriesSlice from "../../../features/categories/categoriesSlice";

import TextEditor from "./TextEditor";

const groupStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};
const groupBadgeStyles = {
  backgroundColor: "#EBECF0",
  borderRadius: "2em",
  color: "#172B4D",
  display: "inline-block",
  fontSize: 12,
  fontWeight: "normal",
  lineHeight: "1",
  minWidth: 1,
  padding: "0.16666666666667em 0.5em",
  textAlign: "center",
};

const formatGroupLabel = (data) => (
  <div style={groupStyles}>
    <span>{data.label}</span>
    <span style={groupBadgeStyles}>{data.options.length}</span>
  </div>
);

const CreateItemForm = () => {
  let history = useHistory();
  const user = useSelector( state => state.auth.user)

  const [loading, setLoading] = useState(false);
  const { data, error, isLoading, isFetching, isSuccess } =
    useGetCategoriesQuery(1);

  const [groupedCategories, setGroupedCategories] = useState([]);

  useEffect(() => {
    setGroupedCategories(
      data?.map((category) => {
        return {
          label: category.name,
          options: category.children.map((children) => {
            return {
              label: children.name,
              value: children.id,
            };
          }),
        };
      })
    );
  }, [data]);

  const [selectedCategory, setSelectedCategory] = useState({
    id: "",
    path: "",
  });

  const widgetApi = useRef();

  const [createItemForm, setCreateItemForm] = useState({
    title: "",
    description: "",
    brand: "",
    value: 0,
    daily_price: 0,
    monthly_price: 0,
    weekly_price: 0,
    item_category: 0,
    city: "",
    zipcode: "",
    rating: 1,
    quantity: 1,
    imagesCdnUrl: "",
    imagesCount: 0,
    user: user.id,
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
    console.log(createItemForm);
  };

  const handlePriceChange = (event) => {
    if (event.target.value > 0) {
      setCreateItemForm({
        ...createItemForm,
        [event.target.name]: event.target.value,
        weekly_price: event.target.value * 4,
        monthly_price: event.target.value * 4 * 3,
      });
    }
  };

  const handleCategoryChange = (selectedOption) => {
    setCreateItemForm({
      ...createItemForm,
      item_category: selectedOption.value,
    });
  };

  const handleImageChange = (info) => {
    setCreateItemForm({
      ...createItemForm,
      imagesCdnUrl: info.cdnUrl,
      imagesCount: info.count,
    });
  };

  const onChangeText = (text)=>{
    setCreateItemForm({
      ...createItemForm,
      description : text
    })
    console.log(createItemForm)
  }
 

  const handleSubmit = async (event) => {
    event.preventDefault();
    //send input data to the server using javascript form data api.
    // const formData = new FormData(
    //   document.querySelector("form.create-item-form")
    // );
    // send form data using fetch api..
    try {
      const response = await api.post("/items", createItemForm);
      history.push(`/rental/${response.data.slug}`);
    } catch (error) {
      console.log(error);
    }
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
            onChange={(info) => handleImageChange(info)}
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
          name="title"
          id="title"
          className="form-control py-2"
          maxLength={40}
          placeholder="not more than 40 characters.."
          value={createItemForm.title}
          onChange={handleInputChange}
        />

        <label htmlFor="category">
          Category <span className="text-danger"> * </span>
        </label>
        <Select
          name="item_category"
          options={groupedCategories}
          // value={createItemForm.item_category}
          formatGroupLabel={formatGroupLabel}
          className
          classNamePrefix="custom"
          onChange={handleCategoryChange}
          // onChange={console.log(createItemForm.item_category)}
        />

        <label htmlFor="description">
          Description <span className="text-danger"> * </span>
        </label>
        <div className="description-box">
          <TextEditor onChangeText={onChangeText}/>
        </div>
       
       
        <label htmlFor="zipcode">
          Zipcode <span className="text-danger"> * </span>
        </label>
        <input
          type="text"
          name="zipcode"
          id="zipcode"
          className="form-control"
          value={createItemForm.zipcode}
          onChange={handleInputChange}
        />
        <label htmlFor="location">
          Location <span className="text-danger"> * </span>
        </label>
        <input
          type="text"
          name="city"
          id="city"
          className="form-control"
          value={createItemForm.city}
          onChange={handleInputChange}
        />
        <label htmlFor="brand">Brand</label>
        <input
          type="text"
          name="brand"
          id="brand"
          className="form-control"
          value={createItemForm.brand}
          onChange={handleInputChange}
        />
        {/* <label htmlFor="value">Item Value (&#8358;) <span className="text-danger"> * </span></label>
        <input
          type="number"
          min={1000}
          step={100}
          name="value"
          id="value"
          className="form-control"
          maxLength={40}
          placeholder=""
          value={createItemForm.value}
          onChange={handleInputChange}
        /> */}

        <div className="rental-price-wrapper d-flex align-items-center mt-2">
          <label htmlFor="rental-price">
            Rental price (&#8358;) per / day{" "}
            <span className="text-danger"> * </span>
          </label>
          <input
            type="number"
            min={0}
            name="daily_price"
            id="daily_price"
            className="form-control py-md-1  w-25 ms-2"
            maxLength={40}
            placeholder="add price/day"
            value={createItemForm.daily_price}
            onChange={handlePriceChange}
          />
        </div>
        <div className="rental-price-wrapper d-flex align-items-center mt-2">
          <label htmlFor="rental-price">
            Rental price (&#8358;) per / week{" "}
            <span className="text-danger"> * </span>
          </label>
          <input
            type="number"
            min={0}
            name="weekly_price"
            id="weekly_price"
            className="form-control py-md-1  w-25 ms-2"
            maxLength={40}
            placeholder="add price/week"
            value={createItemForm.weekly_price}
            onChange={handleInputChange}
          />
        </div>
        <div className="rental-price-wrapper d-flex align-items-center mt-2">
          <label htmlFor="rental-price">
            Rental price (&#8358;) per / month{" "}
            <span className="text-danger"> * </span>
          </label>
          <input
            type="number"
            min={0}
            name="monthly_price"
            id="monthly_price"
            className="form-control py-md-1  w-25 ms-2"
            maxLength={40}
            placeholder="add price/month"
            value={createItemForm.monthly_price}
            onChange={handleInputChange}
          />
        </div>
        <div className="item-value-wrapper d-flex align-items-center mt-2">
          <label htmlFor="item-value">
            Item Value (&#8358;)<span className="text-danger"> * </span>
          </label>
          <input
            type="number"
            min={1000}
            step={100}
            name="value"
            id="value"
            className="form-control py-md-1  w-25 ms-2"
            maxLength={40}
            placeholder="item value.."
            value={createItemForm.value}
            onChange={handleInputChange}
          />
        </div>
        <div className="minimum-rentals-wrapper d-flex align-items-center mt-2">
          <label htmlFor="minimum-rentals">
            Minimum Rental Days <span className="text-danger"> * </span>
          </label>
          <input
            type="number"
            min={1}
            disabled
            name="minimumRentalValue"
            id="minimum-rentals"
            className="form-control py-md-1  w-25 ms-2"
            maxLength={40}
            placeholder="add value.."
            value={1}
          />
        </div>
      </div>
      <div className="border-top mt-3">
        <p className="error-messege text-danger mt-2">
          {" "}
          {/* {createItemForm.errorMessege}{" "} */}
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
