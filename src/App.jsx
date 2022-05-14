 import React from 'react'
 import {  BrowserRouter as Router , Route , Switch  } from 'react-router-dom'  
 import './styles/index.scss'
 import Footer from './components/Footer'
 import HowItWorked from './pages/how-it-works/HowItWorked'
 import ListAnItem from './pages/list-an-item/ListAnItem'
 import Inbox from './pages/inbox/Inbox'
 import Favorite from './pages/favorites/Favorite'
 import Rentals from './pages/rentals/Rentals'
 import Profile from './pages/profile/Profile'
 import EditProfile from './pages/edit-profile/EditProfile'
 import CreateItem from './pages/create-item/CreateItem'
 import Home from './pages/_home/Home'
 import Business from './pages/business/Business'
 import Rental from './pages/rental/Rental'
 import Product from './pages/products/Product'
 import SearchProduct from './pages/search-product/SearchProduct'
 
 const App = () => {
    
   return (
      <Router>                            
           <Switch>
                <Route path={'/'} component={ Home } exact />
                <Route path={'/how-it-worked'} component={ HowItWorked } />
                <Route path={'/list-an-item'} component = { ListAnItem  } />
                <Route path={'/inbox'} component={ Inbox } />
                <Route path={'/favorites'} component={ Favorite } />
                <Route path={ '/rentals'} component = { Rentals  } />
                <Route path={'/profile'} component={ Profile } />
                <Route path={ '/edit-profile' } component = { EditProfile } />
                <Route path={ '/create-item' } component = { CreateItem } />
                <Route path={'/enterprise'} component={ Business } />
                <Route path={ '/rental/:query' } children={ <Rental /> } />
                <Route path={'/products/:query'} children={ <Product /> } />
                <Route path={'/search/:query'} children = { <SearchProduct /> } />
           </Switch>
           <Footer />
      </Router>
   )
 }
 
 export default App