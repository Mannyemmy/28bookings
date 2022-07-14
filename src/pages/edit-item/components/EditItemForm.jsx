import { Widget } from "@uploadcare/react-widget";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import Select from "react-select";
import api from "../../../Api";
import {
  useGetCategoriesQuery,
  useGetEditCategoriesQuery,
} from "../../../services/categoriesApi";
import {
  useGetItemBySlugQuery,
  useEditItemMutation,
} from "../../../services/itemsApi";
import "./item.css";
import TextEditor from "./TextEditor";
import { useForm } from "react-hook-form";

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
  const { slug } = useParams();
  const user = useSelector((state) => state.auth.user);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const { data, isSuccess: isData } = useGetCategoriesQuery(1);
  const { data: categories } = useGetEditCategoriesQuery();

  const [groupedCategories, setGroupedCategories] = useState([]);

  const {
    data: info,
    isLoading,
    isFetching,
    isSuccess,
  } = useGetItemBySlugQuery(slug);

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
    item_category: null,
    city: "",
    zipcode: "",
    rating: 1,
    quantity: 1,
    imagesCdnUrl: null,
    imagesCount: null,
    user: user.id,
    min_rental_days: 1,
  });

  const [editItem, { isLoading: isEditing, isSuccess: done }] =
    useEditItemMutation();

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

  const onChangeText = (text) => {
    setCreateItemForm({
      ...createItemForm,
      description: text,
    });
  };

  const onSubmit = async (data) => {
    var body = {
      title: data.title,
      description: createItemForm.description,
      brand: data.brand,
      value: parseInt(data.value),
      daily_price: parseInt(data.daily_price),
      monthly_price: parseInt(data.monthly_price),
      weekly_price: parseInt(data.weekly_price),
      item_category: createItemForm.item_category,
      city: data.city,
      zipcode: data.zipcode,
      imagesCdnUrl: createItemForm.imagesCdnUrl,
      imagesCount: createItemForm.imagesCount,
      min_rental_days: parseInt(data.min_rental_days),
    };
    editItem({ id: info.item.id, body: body });
  };

  useEffect(() => {
    isSuccess &&
      setCreateItemForm({
        ...createItemForm,
        item_category: info.item.item_category,
        description: info.item.description,
        imagesCdnUrl: info.item.imagesCdnUrl,
        imagesCount: info.item.imagesCount,
      });
  }, [isSuccess]);

  useEffect(() => {
    done && history.push(`/my-items`)
  },[done])

  if (!info) {
    return (
      <div className="tw-w-full tw-h-[80vh] tw-flex tw-justify-center tw-items-center">
        <h1>Loading..</h1>
      </div>
    );
  }

  if (localStorage.getItem("id") != info?.item.user) {
    return null;
  }

  return (
    <>
      {isLoading ? (
        <div className="tw-w-full tw-h-[80vh] tw-flex tw-justify-center tw-items-center">
          <h1>Loading..</h1>
        </div>
      ) : (
        info && (
          <form
            className="d-block mx-auto create-item-form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h5 className="mb-0"> Change Product Images </h5>
            <p className="mb-1 text-secondary upload-warning">
              Please upload at least a product image that clearly shows your
              product item.
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
                  multipleMax={20}
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
                defaultValue={info.item.title}
                className="form-control py-2"
                maxLength={40}
                placeholder="not more than 40 characters.."
                {...register("title")}
              />

              <label htmlFor="category">
                Category <span className="text-danger"> * </span>
              </label>
              {categories && (
                <Select
                  name="item_category"
                  options={groupedCategories}
                  defaultValue={{
                    label: categories.find(
                      (x) => x.id === info.item.item_category
                    ).name,
                    value: info.item.item_category,
                  }}
                  formatGroupLabel={formatGroupLabel}
                  className
                  classNamePrefix="custom"
                  onChange={handleCategoryChange}
                  // onChange={console.log(createItemForm.item_category)}
                />
              )}

              <label htmlFor="description">
                Description <span className="text-danger"> * </span>
              </label>
              <div className="description-box">
                <TextEditor
                  description={info.item.description}
                  onChangeText={onChangeText}
                />
              </div>

              <label htmlFor="zipcode">
                Zipcode <span className="text-danger"> * </span>
              </label>
              <input
                type="text"
                name="zipcode"
                id="zipcode"
                className="form-control"
                defaultValue={info.item.zipcode}
                {...register("zipcode")}
              />
              <label htmlFor="location">
                Location <span className="text-danger"> * </span>
              </label>
              <input
                type="text"
                name="city"
                id="city"
                className="form-control"
                defaultValue={info.item.city}
                {...register("city")}
              />
              <label htmlFor="brand">Brand</label>
              <input
                type="text"
                name="brand"
                id="brand"
                className="form-control"
                defaultValue={info.item.brand}
                {...register("brand")}
              />

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
                  defaultValue={info.item.daily_price}
                  {...register("daily_price")}
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
                  required
                  placeholder="add price/week"
                  defaultValue={info.item.weekly_price}
                  {...register("weekly_price")}
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
                  defaultValue={info.item.monthly_price}
                  {...register("monthly_price")}
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
                  defaultValue={info.item.value}
                  {...register("value")}
                />
              </div>
              <div className="minimum-rentals-wrapper d-flex align-items-center mt-2">
                <label htmlFor="minimum-rentals">
                  Minimum Rental Days <span className="text-danger"> * </span>
                </label>
                <input
                  type="number"
                  min={1}
                  name="min_rental_days"
                  id="min_rental_days"
                  className="form-control py-md-1  w-25 ms-2"
                  placeholder="Minimum days required for renting"
                  onChange={handleInputChange}
                  defaultValue={info.item.min_rental_days}
                  {...register("min_rental_days")}
                />
              </div>
            </div>
            <div className="border-top mt-3">
              {/* <p className="error-messege text-danger mt-2">
       
          {createItemForm.errorMessage}
        </p> */}
              <div className="d-flex add-item-wrapper justify-content-end mb-4 pt-2">
                <div>
                  <button className="btn btn-success px-3 me-2" type="submit">
                   {
                     isEditing ? "Loading..." : " Edit Item"
                   }
                  </button>
                  <Link to="/list-an-item" className="btn ">
                    {" "}
                    Cancel{" "}
                  </Link>
                </div>
              </div>
            </div>
          </form>
        )
      )}
    </>
  );
};

export default CreateItemForm;
