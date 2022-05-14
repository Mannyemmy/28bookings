import React , { Fragment } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/_navbar/Navbar'
 

const HowItWorked = () => {
   
   React.useEffect( () => window.scrollTo({ top:0 , left:0 , scrollBehaviour : 'smooth' }))
   
  return (
    <Fragment>
       <Navbar /> 
        <div className='how-it-worked px-1 px-md-4 mt-md-5'>  
            <div className='how-to d-flex justify-content-md-between'>
                 <div className='mt-md-3'>
                     <h5>  How To Rent On 28bookings  </h5>
                     <p className='text-secondary'>
                     Access items without
                      owning them by renting them from
                       people in your neighbourhood 
                       in a few easy steps.
                     </p>
                 </div>
                 <img src={ require('../../assets/Capture.PNG') } alt='how to' />
            </div>             
        </div>
        <div className='b-rental-wrapper'>
            <svg            
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 1440 320'>
                    <path
                            fill='rgb(2, 175, 109)' 
                            fillOpacity='1'
                            d='M0,128L60,138.7C120,149,240,171,360,192C480,213,600,235,720,229.3C840,224,960,192,1080,165.3C1200,139,1320,117,1380,106.7L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z'>
                    </path>
            </svg>
            <div className='text-white'>
                <h5 className='mb-0 text-center'> Before The Rental  </h5> 
                <ul className='p-0 m-0 ps-3 ps-md-5 ms-md-3'>
                    <li className='d-flex align-items-center mt-3'> 
                       <span className='bi bi-check2-circle'>  </span>
                        <div className='ps-1'> 
                           <h6 className='mb-0'> Find an item nearby </h6>
                           <p> Search for the items you’re looking for and filter by location. </p>
                       </div>
                    </li>
                    <li className='d-flex align-items-center mt-1'> 
                       <span className='bi bi-check2-circle'>  </span>
                        <div className='ps-1'> 
                           <h6 className='mb-0'> Request and verify </h6>
                           <p>  
                              Send a request to the lender for the dates you’d like the items.
                              Your booking is only confirmed when the owner accepts your request.
                            </p>
                       </div>
                    </li>
                    <li className='d-flex align-items-center mt-1'> 
                       <span className='bi bi-check2-circle'>  </span>
                        <div className='ps-1'> 
                           <h6 className='mb-0'>  Arrange handover with the owner </h6>
                           <p>
                               Use chat to arrange convenient times to pick up 
                               the item and ask any questions you might have.
                            </p>
                       </div>
                    </li>
                </ul>               
            </div>
            <div className='mt-4'>
                <h5 className='mb-0 ps-2 ps-md-3 '> During the rental  </h5> 
                <ul className='p-0 m-0 ps-3 ps-md-5 ms-md-3'>
                    <li className='d-flex align-items-center mt-2'> 
                       <span className='bi bi-check2-circle'>  </span>
                        <div className='ps-1'> 
                           <h6 className='mb-0'> Enjoy your rental and return on time </h6>
                           <p> make the most of your time with the item
                                and then return it safely to the owner at the end of the rental. 
                            </p>
                       </div>
                    </li>
                    <li className='d-flex align-items-center '> 
                       <span className='bi bi-check2-circle'>  </span>
                        <div className='ps-1'> 
                           <h6 className='mb-0'> Need more time? </h6>
                           <p>  
                             be sure to check in with the lender and book
                             extra days if the item is available and you want to keep it for longer.
                            </p>
                       </div>
                    </li>                     
                </ul>               
            </div>
            <div className='d-flex justify-content-md-center mt-3 mt-md-5 mb-4'>
                 <img src={  require('../../assets/circle.PNG') } alt='playing your part' />
                 <div className='ps-2'> 
                     <h5 className='mb-1'>  Playing Your Part   </h5>
                     <p className='mb-1'>
                        Renting on  <span>28</span>bookings isn’t just convenient and cost effective. 
                        By buying less and renting more, you’re also contributing to a circular economy, 
                        making better use of resources and helping to protect 
                        this wonderful planet we live on.
                     </p>
                     <Link to={'/products/sewing-machine'}
                        className='btn btn-success rounded-lg py-2 py-md-1'> Browse Items  </Link>
                  </div>
            </div>
                    
       </div>
    </Fragment>
  )
}

export default HowItWorked