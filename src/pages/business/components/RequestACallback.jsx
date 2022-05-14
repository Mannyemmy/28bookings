import React from 'react'

const RequestACallback = () => {

  return (
    <div className='request-a-callback'>
       <div className="h-100 w-100 pt-4 pb-4 text-white px-1 px-md-0" >
              <h5 className='text-center mt-3'> Want to understand how we can help your business?  </h5>
              <p className='text-center px-2'>
                  Share your contact details and our product specialists
                   will get in touch with you within 24 hours
              </p>
              <button  onClick={ () => {
                           window.scrollTo({ top : 0 , behavior : 'smooth' })
                           document.querySelector('.request-form-name-input').focus()
                        }} 
               className='btn btn-light py-1 mx-auto d-block mb-2'>
                    Request a Callback 
              </button>
       </div>
    </div>
  )
}

export default RequestACallback