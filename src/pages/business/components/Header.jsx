import React from 'react'
import Form from './Form'

const Header = () => {
  
  return (
    <>
       <div className='header-container text-white pt-3'>              
             <div className="flex-wrapper d-flex px-2 px-md-4 h-100 justify-content-md-between">
                 <div className="text-wrapper mt-2 mt-md-5">
                       <h5>  Get the latest Tech for your business at a fraction of the cost  </h5>
                       <p className='mt-3'>  
                              Preserve capital, boost productivity and supercharge your
                               business growth with 28bookings flexible rental plans. 
                        </p>                         
                 </div>
                 <div className='form-wrapper text-dark bg-white'>  
                     <Form />
                 </div>
             </div>
        </div>         
    </>
  )
}

export default Header