import React from 'react'
import Navbar from '../../components/_navbar/Navbar'
import { Link } from 'react-router-dom'
import DateModal from './components/Dates'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import './carousel.scss'
import ProductDescription from './components/ProductDescription'
import OtherItems from './components/OtherItems'
import Reviews from './components/Reviews'
import MoreItems from './components/MoreItems'
import ExploreOtherOptions from './components/ExploreOtherOptions'
import WhyRentWithUs from './components/WhyRentWithUs'
 

const Rental = () => {

  React.useEffect( () => window.scrollTo({ top:0 , left:0 , scrollBehaviour : 'smooth' }))

  const images = [
    require("../../assets/asset13.jpeg") ,
    require("../../assets/asset12.png") ,     
    require("../../assets/asset14.png") ,
    require("../../assets/asset17.jpeg"),
    require("../../assets/asset16.png")       
  ]

  const pricing = [
      {
         duration : 'Daily',
         price : ' ₦1500.00/day'
      } ,
      {
        duration : ' 7 Days +',
        price : ' ₦1500.00/day'
     } ,
     {
      duration : '30 Days +',
      price : ' ₦800.00/day'
      } 
  
   ]

  return (
    <>
       <Navbar />
       <div className='rental-page'>
              <div className="row w-100 p-0 m-0 mx-auto mt-2 mt-md-3">
                   <div className="col-12 col-md-7 px-0 px-md-2 carousel-container">
                       <Carousel dynamicHeight = { false }
                                 showArrows = { false }                     
                                 showIndicators = { false }
                        >
                           {
                             images.map( (img,id) => {
                                 return(
                                       <div className='slider' key={id}>
                                         <img  src={ img } />
                                       </div>
                                 )
                             } )
                           }
                       </Carousel> 
                   </div>
                   <div className="col-12 col-md-5 price-wrapper mt-3 mt-md-1">
                          <h5>
                              Projector Screen - Epson 50-inch Screen
                          </h5>
                          <div className="d-flex justify-content-between mt-3 align-items-center px-md-2">
                               <div className="d-flex align-items-center">
                                   <span className='svg-image d-inline-block me-1'></span>
                                   <span> Antonio in London  </span>
                               </div>
                               <p className='m-0 p-0 '>  5.0  <i className="fas fa-star"></i> (3189) </p>
                          </div>
                          <div className="row w-100 p-0 m-0 mx-auto justify-content-between pricing-col">
                            {
                              pricing.map( (item,id) => {
                                  return(
                                        <div className='border col-3 mt-3 py-1' key={id}>
                                            <p className='text-center m-0 p-0'> {  item.duration } </p>
                                            <span className='text-center'>  {  item.price } </span>
                                        </div>
                                  )
                              } )
                            }
                          </div>
                          <button data-bs-toggle='modal' 
                                  data-bs-target='#dateModal'
                                  className='btn btn-success mt-4 d-block mx-auto mb-3'
                          >
                                Check price and avaibility 
                          </button>
                   </div>
                   <DateModal id='dateModal'  />
              </div>
              <ProductDescription />
              <div className="px-1 px-md-3">
                   <div className="item-owned mt-2">
                        <h5> Item owned by Antonio </h5>
                        <div className="d-flex ms-2 mx-2 mx-md-0">
                            <img src={  require('../../assets/anthony.jpg') } alt="user profile" />
                            <div className='ms-4'>
                                 <p>
                                       5.0 <i className="fas fa-star"></i>  (3189)  
                                       <button className='btn btn-success bi bi-star ms-3'>
                                            &nbsp;super lender
                                         </button> 
                                  </p>
                                  <p className='small mb-1'>  Check out my profile to see all the items you can hire:</p>
                                  <div className="divider">
                                      .................................................................................
                                  </div>
                                  <div className="divider">
                                      .................................................................................
                                  </div>
                                  <span> Typically replies within a few minutes </span>
                                  <div className="btn-wrapper mt-2">
                                      <Link to='/rental' className='btn me-2 py-1'> Messege Antonio  </Link>
                                      <Link to='/rental' className='btn py-1'> See Antonio's profile  </Link>
                                  </div>
                            </div>
                        </div>
                    </div>
              </div>
              <OtherItems />
              <Reviews />
              <MoreItems />
              <ExploreOtherOptions />
              <WhyRentWithUs />
       </div>
    </>
  )
}

export default Rental