import React, { useContext, createContext, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import "./styles/index.scss";
import "./styles/tailwind.css";
import Footer from "./components/Footer";
import HowItWorked from "./pages/how-it-works/HowItWorked";
import ListAnItem from "./pages/list-an-item/ListAnItem";
import Orders from "./pages/orders/Orders";
import Favorite from "./pages/favorites/Favorite";
import Rentals from "./pages/rentals/Rentals";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/edit-profile/EditProfile";
import CreateItem from "./pages/create-item/CreateItem";
import Home from "./pages/_home/Home";
import Business from "./pages/business/Business";
import Rental from "./pages/rental/Rental";
import Product from "./pages/products/Product";
import SearchProduct from "./pages/search-product/SearchProduct";
import Message from "./pages/orders/Message";
import RentalMessage from "./pages/rentals/RentalMessage";
import Chat from "./pages/chat/Chat";
import Inbox from "./pages/inbox/Inbox";

const App = () => {
  let location = useLocation();
  console.log(location);

  return (
    <>
      <Switch>
        <Route path={"/"} component={Home} exact />
        <Route path={"/how-it-worked"} component={HowItWorked} />
        <Route path={"/inbox"} component={Inbox} />
        <Route path={"/chat"} children={<Chat />} />
        <Route path={"/list-an-item"} component={ListAnItem} />
        <Route path={"/my-orders"} component={Orders} />
        <Route path={"/favorites"} component={Favorite} />
        <Route path={"/rentals"} component={Rentals} />
        <Route path={"/profile"} component={Profile} />
        <Route path={"/edit-profile"} component={EditProfile} />
        <Route path={"/create-item"} component={CreateItem} />
        <Route path={"/enterprise"} component={Business} />
        <Route path={"/rental/:slug"} children={<Rental />} />
        <Route path={"/category/:slug"} children={<Product />} />
        <Route path={"/search/:query"} children={<SearchProduct />} />
        <Route path={"/message/:id"} children={<Message />} />
        <Route path={"/rental-inbox/:id"} children={<RentalMessage />} />
      </Switch>

      {location.pathname !== "/chat" && location.pathname !== "/inbox" ? (
        <Footer />
      ) : null}
    </>
  );
};

export default App;
