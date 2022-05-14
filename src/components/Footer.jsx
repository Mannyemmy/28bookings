import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='w-100 mt-0 pt-2 pt-md-4'>
         <div className='row p-0 m-0 mx-auto w-100'>
               <div className='social-media col-12 col-md-4'>
                      <img src={ require('../assets/logo.png') } alt='logo' />
                     <p className='mb-0'> Say bye to buy, now rent on 28bookings. </p>
                     <div className='social-media-icons-wrapper mt-2'>
                         <Link to='/' className='fab fa-instagram'> </Link>
                         <Link  to='/' className='fab fa-twitter'> </Link>
                         <Link to='/' className='fab fa-facebook'> </Link>
                         <Link to='/' className='fab fa-linkedin'> </Link>
                    </div>
                </div>
                <div className='about-us col-12 col-md-4'>
                    <h5 className='mb-1 mt-md-2'> Know More </h5>
                     <ul className='p-0 m-0'> 
                         <li className='p-0 m-0'>  
                           <Link to='/' className='d-block'> About Us </Link> 
                         </li>
                         <li className='p-0 m-0 mt-1'>  
                           <Link to='/' className='d-block'> Contact Us </Link> 
                         </li>
                         <li className='p-0 m-0 mt-1'>  
                           <Link to='/' className='d-block'> Terms & Conditions </Link> 
                         </li>
                         <li className='p-0 m-0 mt-1'>  
                           <Link to='/' className='d-block'> FAQs </Link> 
                         </li>
                     </ul>
                </div>
                <div className='get-intouch col-12  col-md-4'>
                    <h5 className='mb-1 mt-md-2'> Get In Touch </h5>
                    <a href='tel:447859539878' className='d-block w-auto'>
                        <span className='bi bi-telephone'></span> +447859539878 </a> 
                    <a href='mailto:support@28booking.com' className='d-block'> 
                       <span className='bi bi-envelope'></span> support@28booking.com
                    </a>
                    <p className='mb-0 mt-1'>
                        <span className='fas fa-map-marker-alt'></span> Lagos , Nigeria
                    </p>
                </div>
         </div>
         <p className='mb-0 py-2 py-md-1 border-top bg-white mt-2 text-center'> 
              Copyright 2022 &copy; www.28bookings.com All rights reserved | Terms & conditions
          </p>
    </footer>
  )
}

export default Footer