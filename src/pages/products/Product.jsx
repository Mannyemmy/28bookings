import React from 'react'
import Navbar from '../../components/_navbar/Navbar' 
import AccessEverything from './components/AcessEverything'
import BrowseItems from './components/BrowseItems'
import Categories from './components/Categories'
import ExploreOtherOptions from './components/ExploreOtherOptions'
import Header from './components/Header'
import HowItWorks from './components/HowItWorks'

const Product = () => {

 React.useEffect( () => window.scrollTo({ top:0 , left:0 , scrollBehaviour : 'smooth' }))

  return (
    <>
        <Navbar />
        <div className='product-page'>
           <Header />          
           <div className='row w-100 m-0 p-0 mx-auto mt-4 save-more'>
               <div className='col-12 col-sm-6 col-md-4'>
                    <img src={  require('../../assets/IMG-20220328-WA0010.jpg') } alt="quality tested" />                  
                    <h5 className='mb-1'> Rent in 3 clicks </h5>
                    <p> Select your product & pay to confirm viola! </p>
               </div>
               <div className='col-12 col-sm-6 col-md-4'>
               <img src={  require('../../assets/IMG-20220328-WA0009.jpg')} alt="Rent" />
                    <h5 className='mb-1'> To ensure they work as good as new </h5>
                    <p> Buy less. Rent for a fraction of the cost. </p>
               </div>
               <div className='col-12 col-sm-6 col-md-4'>
                    <img src={  require('../../assets/IMG-20220328-WA0011.jpg') } alt="customer support" />
                    <h5 className='mb-1'> Dedicated customer support </h5>
                    <p> Incase you are stuck. we are just a call away </p>
               </div>
           </div>
         <BrowseItems />
         <HowItWorks />
         <Categories />
          <AccessEverything />
         <ExploreOtherOptions /> 
       </div>
    </>
  )
}

export default Product