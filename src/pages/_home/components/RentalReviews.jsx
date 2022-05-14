import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const RentalReviews = () => {
    
 const { reviews } = useSelector( state => state.reviews )

  return (
    <div className='rental-review'>               
       <div className="rental-container px-1 text-white py-4">
             <h5 className='text-center '>  Rental Reviews </h5>
             <div className="row w-100 p-0 m-0 mx-auto justify-content-md-center">
                  {  reviews.map(  (review , id ) => {
                       return(
                           <div key={id} className='col-12 col-md-5  text-dark'>
                                <div className='bg-white py-3 mb-0 mb-md-3 px-2 px-md-4 mt-3'>
                                    <p className=' mb-2'>
                                     <strong> " </strong> { review.quote } <strong> " </strong>
                                   </p>
                                   <div className="d-flex  mt-0 pt-0">
                                       <img src={ review.pic } alt={ review.name }/>
                                        <div className='ps-1'>
                                             <p className='mb-0 pb-0'>  
                                                  <span> {  review.name } , </span>
                                                  <span className='text-secondary'>  { review.town } </span> 
                                              </p>
                                               <div className='stars'>
                                                <span className="fas fa-star"></span>
                                                <span className="fas fa-star"></span>
                                                <span className="fas fa-star"></span>
                                                <span className="fas fa-star"></span>
                                                <span className="fas fa-star"></span>
                                               </div>
                                        </div>
                                   </div>
                                </div>
                           </div>
                       )
                  }) }
             </div>
             <div className="d-flex justify-content-center mt-3 mt-md-2">
               <Link to='/products/sewing-machine' className='btn btn-light py-1 '>  Browse Items </Link>
            </div>
       </div>       
    </div>
  )
}

export default RentalReviews