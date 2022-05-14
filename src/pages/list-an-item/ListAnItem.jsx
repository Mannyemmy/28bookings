import React, { Fragment } from 'react'
import {  Link } from 'react-router-dom'
import HowItWorks from './components/HowItWorks' 
import Navbar from '../../components/_navbar/Navbar'
import Categories from './components/Categories'
import { useSelector } from 'react-redux'

const ListAnItem = () => {
    
    React.useEffect( () => window.scrollTo({ top:0 , left:0 , scrollBehaviour : 'smooth' }))
    const {  isAuth } = useSelector( state => state.login )
  return (
    <Fragment>
        <Navbar />
         <div className='px-1 px-md-4 mt-3 mt-md-5'>
            <div className='list-an-item-header d-flex justify-comtent-md-between'>
                    <div className='mt-md-4'>
                        <h5 className='mb-1'>
                            Start earning on 28bookings
                        </h5>
                        <p className='text-secondary mb-1'>
                            Make money lending your belongings to people in your area.
                        </p>
                          {
                              isAuth ?
                              <Link to='/create-item' className='btn btn-success py-1 rouded-lg px-4'> Create Item </Link>
                              :
                              <Link to='/list-an-item' className='btn btn-success py-1 rouded-lg px-4'> List an item </Link>
                          }
                    </div>
                    <img 
                       src={ require('../../assets/list-an-item.PNG') }
                        alt='list an item' 
                    />
            </div>
        </div>
         <div className='waves-container mt-5'>              
          <svg 
           xmlns='http://www.w3.org/2000/svg' 
           viewBox='0 0 1440 320'>
               <path 
                 fill='rgb(2, 175, 109)' fillOpacity='1' 
                 d='M0,288L120,250.7C240,213,480,139,720,138.7C960,139,1200,213,1320,250.7L1440,288L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z'>
                </path>
                justify
           </svg>
           <div className='w-100 p-0 m-0 text-white'>
                 <h5 className='text-center pt-2'>
                   We’ve got you covered
                 </h5>
                 <p className='text-center'>
                      We take safety seriously, Every borrower in our
                       marketplace gets verified by our team and should
                        things go wrong, our item guarantee has your back.
                 </p>
             </div>
        </div>
        <div className='getting-started'>
            <h5 className='text-center pt-2'>
                Getting started!
                </h5>
                <ul className='p-0 m-0 ps-1  ps-md-3 ps-md-5 ms-md-3'>
                <li className='d-flex align-items-center mt-2'> 
                    <span className='bi bi-check2-circle'>  </span>
                    <div className='ps-1'>                         
                        <p className='mb-1'> 
                           Think of all the great things you have to rent out in your 
                           home from tools to toys everything inbetween.
                        </p>
                    </div>
                </li>
                <li className='d-flex align-items-center '> 
                    <span className='bi bi-check2-circle'>  </span>
                    <div className='ps-1'>                          
                        <p className='mb-1'>  
                          Take some photos and set a price
                        </p>
                    </div>
                </li>   
                <li className='d-flex align-items-center '> 
                    <span className='bi bi-check2-circle'>  </span>
                    <div className='ps-1'>                          
                        <p className='mb-1'>  
                           Add a bio to your profile
                        </p>
                    </div>
                </li>   
                <li className='d-flex align-items-center '> 
                    <span className='bi bi-check2-circle'>  </span>
                    <div className='ps-1'>                          
                        <p className='mb-1'>  
                           Respond promptly to messages and requests and start completing rentals
                        </p>
                    </div>
                </li>                     
            </ul>     
       </div>
       <HowItWorks />
       <Categories />
    </Fragment>
  )
}

export default ListAnItem